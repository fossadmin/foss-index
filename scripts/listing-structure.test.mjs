import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

const read = p => fs.readFileSync(new URL('../'+p, import.meta.url), 'utf8');
const files = fs.readdirSync(new URL('../src/content/docs/tools', import.meta.url)).filter(f => f.endsWith('.md'));
const support = JSON.parse(read('src/data/platform-support.json'));
const briefs = JSON.parse(read('src/data/decision-briefs.json'));
const routes = JSON.parse(read('src/data/contribute-routes.json'));
const prompts = JSON.parse(read('src/data/setup-prompts.json'));

// Restricted-asset exception (explicit, per listing): these projects' logo
// terms require permission we do not have, so the listing shows NO icon and
// no monogram - a real icon or nothing, never a substitute.
const NO_ICON = new Set(['tools/joplin']);
const LEAD_INS = new Set(['Try it and keep a way out', 'License and what is bundled']);
const FOLLOW_UPS = new Set(['First steps', 'First use', "Why it's listed", 'Support and contribute']);

test('every listing carries the full section and data contract (templates/new-listing.md)', () => {
 assert.equal(files.length, 117);
 for (const f of files) {
  const slug = f.slice(0, -3), id = 'tools/'+slug;
  const text = read('src/content/docs/tools/'+f);
  const front = text.split('---')[1];

  // Frontmatter: required fields
  for (const key of ['title','description','category','repository','license','icon','screenshot']) {
   if (key === 'icon' && NO_ICON.has(id)) continue;
   assert.match(front, new RegExp('^'+key+':', 'm'), id+' missing frontmatter '+key);
  }
  assert.match(front, /^repository: https:\/\//m, id+' repository must be an https URL');
  for (const sub of ['src','alt','width','height','credit'])
   assert.match(front, new RegExp('^  '+sub+':', 'm'), id+' screenshot missing '+sub);
  assert.ok(/^  own: true$/m.test(front) || /^  sourceUrl:/m.test(front) || /^  terminal: true$/m.test(front), id+' screenshot needs own:true, sourceUrl or terminal:true');

  // Assets on disk
  const iconM = front.match(/^icon: (.+)$/m);
  if (NO_ICON.has(id)) assert.ok(!iconM, id+' is in the no-icon exception but sets an icon');
  else assert.ok(iconM && fs.existsSync(new URL('../public/icons/'+iconM[1].trim(), import.meta.url)), id+' icon file missing: '+(iconM && iconM[1].trim()));
  const shot = front.match(/^  src: (.+)$/m)[1].trim();
  assert.ok(fs.existsSync(new URL('../public/screenshots/'+shot, import.meta.url)), id+' screenshot file missing: '+shot);

  // Data records: every listing has all four
  for (const [name, data] of [['platform-support',support],['decision-briefs',briefs],['contribute-routes',routes],['setup-prompts',prompts]])
   assert.ok(data[id], id+' missing record in '+name+'.json');

  // Body: section presence and order
  const h2 = [...text.matchAll(/^## (.+)$/gm)].map(m => m[1]);
  const h3 = [...text.matchAll(/^### (.+)$/gm)].map(m => m[1]);
  assert.ok(h2.length >= 1, id+' has no sections');
  assert.ok(h2[0] === 'Quick start' || LEAD_INS.has(h2[0]), id+' unexpected first section: '+h2[0]);
  const qs = h2.indexOf('Quick start');
  assert.ok(qs >= 0, id+' missing ## Quick start');
  assert.ok(h3.length >= 1, id+' Quick start needs at least one ### method');

  const isOS = support[id]?.role === 'operating-system';
  if (!isOS) assert.ok(h2.slice(qs+1).some(h => FOLLOW_UPS.has(h)), id+' needs a follow-up section after Quick start (First steps / First use / Why it\'s listed)');
  const doc = h2.indexOf('Documentation');
  if (doc >= 0) assert.equal(doc, h2.length-1, id+' ## Documentation must be the last section');

  // Method tab order: Docker first, NixOS last
  const di = h3.findIndex(h => /docker/i.test(h));
  const ni = h3.map((h,i) => /nixos/i.test(h) ? i : -1).filter(i => i >= 0);
  if (di >= 0 && ni.length) {
   assert.ok(di < ni[ni.length-1], id+' Docker method must come before NixOS');
   assert.equal(ni[ni.length-1], h3.length-1, id+' NixOS method must be the last tab');
  }
 }
});
