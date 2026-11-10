import { readFileSync } from 'node:fs';
import { slugify } from './catalog';

export function imageCredits(tools: any[]) {
  const notices = ['icons', 'screenshots'].map((kind) => {
    const raw = readFileSync(`public/${kind}/NOTICE.md`, 'utf8');
    const chunks = raw.split('\n## ');
    return { kind, intro: chunks[0].replace(/^#[^\n]+\n/, '').trim(), entries: chunks.slice(1).map((chunk) => {
      const nl = chunk.indexOf('\n');
      const head = chunk.slice(0, nl).trim();
      return { kind, head, id: slugify(head), body: chunk.slice(nl + 1).trim() };
    }) };
  });
  const sources = tools.map((tool) => ({ tool, raw: readFileSync(`src/content/docs/${tool.id}.md`, 'utf8') }));
  const groups = new Map<string, any>();
  const general: any[] = [];
  for (const notice of notices) for (const entry of notice.entries) {
    if (entry.head === 'License texts') { general.push(entry); continue; }
    const assets = entry.head.split(', ');
    const owners = sources.filter(({ tool, raw }) => assets.some((asset) => entry.kind === 'icons'
      ? [tool.data.icon, tool.data.iconDark].includes(asset)
      : tool.data.screenshot?.src === asset || raw.includes(`/screenshots/${asset}`)));
    // Keep notices for unused assets too, rather than silently discarding them.
    const names = owners.length ? owners.map(({ tool }) => tool.data.title) : [entry.body.match(/^- Project: (.+)$/m)?.[1] ?? 'Other image assets'];
    for (const name of names) {
      if (!groups.has(name)) groups.set(name, { name, id: `tool-${slugify(name)}`, entries: [] });
      groups.get(name).entries.push(entry);
    }
  }
  return { notices, general, groups: [...groups.values()].sort((a, b) => a.name.localeCompare(b.name)) };
}

export function renderCreditBody(body: string, kind: string, base: string) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const linkify = (s: string) => esc(s)
    .replace(/https?:\/\/[^\s)]+/g, (u) => `<a href="${u}">${u}</a>`)
    .replace(/(?<![="'/:\w-])licenses\/[\w.-]+/g, (u) => `<a href="${base}${kind}/${u}">${u}</a>`);
  return body.split(/\n\n+/).map((para) => {
    const lines = para.split('\n');
    if (lines.every((l) => l.startsWith('- '))) return `<ul>${lines.map((l) => `<li>${linkify(l.slice(2))}</li>`).join('')}</ul>`;
    return `<p>${linkify(para).replace(/\n/g, ' ')}</p>`;
  }).join('\n');
}
