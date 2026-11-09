// Check upstream metadata without changing the published snapshot.
// Review .release-check/report.md and releases.candidate.json before applying.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function checkReleases({ tools, baseline, fetcher }) {
  const candidate = structuredClone(baseline);
  const changes = [], errors = [];
  for (const { repo, license } of tools) {
    try {
      const metadata = await fetcher(`https://api.github.com/repos/${repo}`);
      if (!metadata.ok) throw new Error(`repository HTTP ${metadata.status}`);
      const info = await metadata.json();
      const response = await fetcher(`https://api.github.com/repos/${repo}/releases/latest`);
      if (!response.ok && response.status !== 404) throw new Error(`release HTTP ${response.status}`);
      const release = response.ok ? await response.json() : null;
      const old = baseline[repo] ?? {};
      const curatedLicense = old.license && old.license !== 'Unknown' ? old.license : license;
      const detected = info.license?.spdx_id;
      const detectedLicense = detected && detected !== 'NOASSERTION' ? detected : 'Unknown';
      const version = release?.tag_name ?? null;
      if (release && (typeof version !== 'string' || !version || typeof release.html_url !== 'string' || !release.html_url.startsWith('https://github.com/'))) throw new Error('invalid release response');
      candidate[repo] = { ...old, license: curatedLicense };
      // A missing release never clears previously reviewed release data.
      if (release) Object.assign(candidate[repo], {
        version, date: release.published_at ?? null, url: release.html_url,
        changelog: String(release.body ?? '').slice(0, 600),
      });
      changes.push({ repo, previousVersion: old.version ?? null, upstreamVersion: version,
        versionChanged: !!release && old.version !== version,
        noRelease: !release, license: curatedLicense, detectedLicense,
        licenseReview: detectedLicense === 'Unknown' || detectedLicense !== curatedLicense });
    } catch (error) {
      errors.push({ repo, error: String(error.message) });
      // Do not keep hitting GitHub after throttling/access denial.
      if (/HTTP (403|429)/.test(error.message)) {
        errors.push({ repo: 'remaining repositories', error: 'Not checked after API access/rate-limit failure' });
        break;
      }
    }
  }
  return { candidate, changes, errors };
}

function listedTools() {
  return fs.readdirSync('src/content/docs/tools').sort().filter(f => f.endsWith('.md')).map(file => {
    const text = fs.readFileSync(path.join('src/content/docs/tools', file), 'utf8');
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    const repo = front?.match(/^repository:\s*https:\/\/github\.com\/([^\s]+)\s*$/m)?.[1]?.replace(/\/+$/, '');
    const license = front?.match(/^license:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
    if (!repo || !license) throw new Error(`Missing GitHub repository/license in ${file}`);
    return { repo, license };
  });
}

async function main() {
  const out = '.release-check';
  fs.mkdirSync(out, { recursive: true });
  // Remove stale artifacts before any network or parsing work.
  for (const file of ['releases.candidate.json', 'releases.baseline.json', 'report.json', 'report.md']) fs.rmSync(path.join(out, file), { force: true });
  const baselineText = fs.readFileSync('src/data/releases.json', 'utf8');
  const result = await checkReleases({ tools: listedTools(), baseline: JSON.parse(baselineText),
    fetcher: url => fetch(url, { signal: AbortSignal.timeout(30000), headers: {
      'User-Agent': 'foss-index-release-check',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    } }) });
  const report = { checkedAt: new Date().toISOString(), ...result };
  delete report.candidate;
  fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2) + '\n');
  const rows = result.changes.map(c => `- ${c.repo}: ${c.previousVersion ?? 'none'} -> ${c.upstreamVersion ?? 'no published release (previous data kept)'}; kept license ${c.license}; GitHub detects ${c.detectedLicense}${c.licenseReview ? ' [LICENSE REVIEW]' : ''}`);
  fs.writeFileSync(`${out}/report.md`, `# Release check\n\nChecked ${report.checkedAt}. Nothing published or committed.\n\n${rows.join('\n')}\n\n${result.errors.map(e => `- ERROR ${e.repo}: ${e.error}`).join('\n')}\n\n${result.errors.length ? 'Incomplete check: no candidate written. Fix errors and rerun.' : 'Candidate ready for review, not approval. Licenses were preserved, not replaced by GitHub detection.'}\n\nCheck release notes, repository license files and any changed setup instructions before applying. Repository detection does not establish licensing for a particular version or edition.\n`);
  if (result.errors.length) { console.error('Check incomplete. See .release-check/report.md; published data untouched.'); process.exitCode = 1; return; }
  fs.writeFileSync(`${out}/releases.baseline.json`, baselineText);
  fs.writeFileSync(`${out}/releases.candidate.json`, JSON.stringify(result.candidate, null, 2) + '\n');
  console.log('Review .release-check/report.md and releases.candidate.json. Published data untouched.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main().catch(error => { console.error(error.message); process.exitCode = 1; });
