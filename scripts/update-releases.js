// Refreshes src/data/releases.json with the latest release and license
// for every tool listed under src/content/docs/tools/.
//
// Usage:
//   node scripts/update-releases.js            # unauthenticated (60 req/hr)
//   GITHUB_TOKEN=... node scripts/update-releases.js
//   OLLAMA_HOST=http://localhost:11434 node scripts/update-releases.js
//     # optional: summarize long changelogs with a local LLM (Ollama)

import fs from 'node:fs';
import path from 'node:path';

const TOOLS_DIR = path.resolve('./src/content/docs/tools');
const OUT_FILE = path.resolve('./src/data/releases.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OLLAMA_HOST = process.env.OLLAMA_HOST; // e.g. http://localhost:11434
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b';

const headers = {
  'User-Agent': 'foss-directory-release-fetcher',
  ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
};

// Minimal frontmatter scrape: we only need the repository URL per file.
function listedRepos() {
  const repos = [];
  for (const file of fs.readdirSync(TOOLS_DIR)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const text = fs.readFileSync(path.join(TOOLS_DIR, file), 'utf8');
    const match = text.match(/^---\n([\s\S]*?)\n---/);
    const repo = match?.[1].match(/^repository:\s*(\S+)/m)?.[1];
    if (repo?.includes('github.com/')) {
      repos.push(repo.replace(/\/+$/, '').split('github.com/')[1]);
    }
  }
  return repos;
}

async function summarize(rawNotes) {
  if (!rawNotes) return '';
  if (!OLLAMA_HOST || rawNotes.length < 400) {
    return rawNotes.length > 600 ? rawNotes.slice(0, 600).trimEnd() + '…' : rawNotes;
  }
  try {
    const res = await fetch(`${OLLAMA_HOST}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        temperature: 0.2,
        max_tokens: 150,
        messages: [
          {
            role: 'system',
            content:
              'You are a technical editor. Summarize these release notes into exactly 3 short bullet points: major features, breaking changes, critical fixes. No introduction.',
          },
          { role: 'user', content: rawNotes.slice(0, 8000) },
        ],
      }),
    });
    const data = await res.json();
    return data.choices[0].message.content.trim();
  } catch {
    console.warn('  LLM summary failed, falling back to truncation');
    return rawNotes.slice(0, 600).trimEnd() + '…';
  }
}

async function main() {
  const repos = listedRepos();
  console.log(`Found ${repos.length} listed repos`);
  const releases = {};

  for (const repo of repos) {
    try {
      const repoRes = await fetch(`https://api.github.com/repos/${repo}`, { headers });
      if (!repoRes.ok) throw new Error(`repo: HTTP ${repoRes.status}`);
      const repoData = await repoRes.json();

      const relRes = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
      const relData = relRes.ok ? await relRes.json() : null;

      releases[repo] = {
        version: relData?.tag_name ?? null,
        date: relData?.published_at ?? null,
        url: relData?.html_url ?? `https://github.com/${repo}/releases`,
        changelog: relData ? await summarize(relData.body || '') : null,
        license: repoData.license?.spdx_id && repoData.license.spdx_id !== 'NOASSERTION'
          ? repoData.license.spdx_id
          : 'Unknown',
      };
      console.log(`  ${repo}: ${releases[repo].version ?? 'no releases'} (${releases[repo].license})`);
    } catch (err) {
      console.error(`  ${repo}: ${err.message}`);
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(releases, null, 2) + '\n');
  console.log(`Wrote ${OUT_FILE}`);
}

main();
