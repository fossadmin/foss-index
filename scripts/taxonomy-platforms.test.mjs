import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { originalTags, browseDefinitions, tagsFor, broadCategory, platformSearch } from '../src/lib/taxonomy.mjs';
import { matchTool } from '../src/lib/search.mjs';
const support = JSON.parse(fs.readFileSync(new URL('../src/data/platform-support.json',import.meta.url),'utf8'));
test('all 20 original fine categories retained under unchanged 7 browse groups',()=>{
 assert.equal(originalTags.length,20);assert.equal(new Set(originalTags).size,20);assert.equal(browseDefinitions.length,7);
 for(const tag of originalTags) assert.ok(browseDefinitions.some(g=>g.categories.includes(tag)),tag);
 assert.equal(broadCategory('Communication'),'Privacy & access');
 assert.equal(broadCategory('Operating systems'),'Operating systems');
 assert.throws(()=>broadCategory('Invented category'));
});
test('fine category becomes initial tag and extra reviewed tags stay deduplicated',()=>{
 assert.deepEqual(tagsFor({category:'Notes',tags:['Productivity','Notes']}),['Notes','Productivity']);
 assert.deepEqual(tagsFor({category:'Creative'}),['Creative']);
});
test('platform names and client roles enter normal AND search',()=>{
 const text=('nextcloud '+platformSearch(support['tools/nextcloud'])).toLowerCase();
 assert.equal(matchTool(text,[],'nextcloud iOS').matches,true);
 assert.equal(matchTool(text,[],'android client').matches,true);
 assert.equal(matchTool(text,[],'android server').matches,false);
 assert.equal(platformSearch(undefined),'');
});
test('all platform claims have dated official evidence, no unreviewed platform guess',()=>{
 assert.equal(Object.keys(support).length,100);
 for(const [id,r] of Object.entries(support)){
  assert.ok(fs.existsSync(new URL('../src/content/docs/'+id+'.md',import.meta.url)),id);
  assert.equal(r.checkedOn,'2026-11-12');assert.ok(r.note);
  if(r.server){
   assert.ok(r.server.label && r.server.platforms.length,'server block needs label and platforms: '+id);
   assert.ok((r.clients??[]).length,'server block needs clients: '+id);
   assert.ok(!r.platforms,'server entries split platforms into server/clients: '+id);
  }
  const rows=[...(r.platforms??[]),...(r.server?.platforms??[]),...(r.clients??[])];
  assert.ok(rows.length || (r.role === 'operating-system' && r.compatibilityUrl));
  for(const list of [r.platforms??[],r.server?.platforms??[],r.clients??[]])
   assert.equal(new Set(list.map(p=>p.name)).size,list.length,id+' duplicate platform names within a list');
  for(const p of rows){assert.ok(['Linux','Windows','macOS','Android','iOS','Web'].includes(p.name));assert.ok(p.kind);assert.equal(new URL(p.url).protocol,'https:');}
 }
});
test('unreleased or closed beta is not indexed as available iOS',()=>{
 assert.ok(!support['tools/thunderbird'].platforms.some(p=>p.name==='iOS'));
 assert.ok(!support['tools/audiobookshelf'].clients.some(p=>p.name==='iOS'));
 assert.match(support['tools/thunderbird'].note,/in development/);
 assert.match(support['tools/audiobookshelf'].details,/TestFlight is full/);
});
test('client/server, mobile payment and separate release caveats remain explicit',()=>{
 assert.match(support['tools/nextcloud'].note,/not platforms that run the full Nextcloud server/);
 assert.match(support['tools/cryptomator'].note,/read-only/);
 assert.match(support['tools/signal-desktop'].note,/own source repositories and releases/);
});
test('unreviewed listings are not automatically called unsupported and aliases are scoped',()=>{
 assert.match(support['tools/logseq'].note,/different workflows/);
 assert.ok(platformSearch(support['tools/joplin']).includes('iPhone'));
 assert.ok(platformSearch(support['tools/gimp']).includes('Mac'));
});

test('all existing and new phone OS listings reviewed, OS hardware is not an app platform',()=>{
 const tools=fs.readdirSync(new URL('../src/content/docs/tools',import.meta.url)).filter(x=>x.endsWith('.md'));
 assert.equal(tools.length,100);
 for(const f of tools) assert.ok(support['tools/'+f.slice(0,-3)],f);
 const os=Object.values(support).filter(r=>r.role==='operating-system');
 assert.equal(os.length,19);assert.ok(os.every(r=>r.platforms.length===0));
 assert.match(support['tools/silverbullet'].details,/Desktop is explicitly not open source/);
 assert.deepEqual(support['tools/silverbullet'].clients.map(p=>p.name),['Web']);
 assert.match(support['tools/taskwarrior'].platforms.find(p=>p.name==='Windows').kind,/WSL/);
 assert.match(support['tools/ublock-origin'].note,/Chrome removed/);
});

test('required-server listings carry the Self-hosted tag; optional self-hosting does not',()=>{
 const tagged=new Set();
 for(const f of fs.readdirSync(new URL('../src/content/docs/tools',import.meta.url)).filter(x=>x.endsWith('.md'))){
  const front=fs.readFileSync(new URL('../src/content/docs/tools/'+f,import.meta.url),'utf8').split('---')[1];
  if(/tags:\n- Self-hosted/.test(front)) tagged.add('tools/'+f.slice(0,-3));
 }
 const required=new Set([...Object.entries(support).filter(([,r])=>r.server).map(([id])=>id),'tools/caddy','tools/postgresql','tools/percona-server','tools/ollama','tools/syncthing']);
 const optional=SH;
 const expected=new Set([...required,...optional]);
 assert.deepEqual([...tagged].sort(),[...expected].sort());
 assert.ok(!tagged.has('tools/zotero'),'zotero has no official self-host route, so it is not tagged');
 for(const [id,rec] of Object.entries(support)) assert.equal(Boolean(rec.selfHost),SH.has(id),id+' selfHost only on optional-self-host listings');
 for(const id of SH) assert.ok(tagged.has(id),id+' optional self-host carries the discovery tag');
});
const SH=new Set(['tools/actual-budget','tools/trilium-notes','tools/joplin','tools/netbird','tools/penpot']);

test('exclusions re-verified: zotero web library and logseq iOS app exist officially',()=>{
 const z=support['tools/zotero'];
 assert.ok(z.platforms.some(p=>p.name==='Web'&&p.url==='https://www.zotero.org/mylibrary'),'zotero web library row');
 const l=support['tools/logseq'];
 assert.ok(l.platforms.some(p=>p.name==='iOS'&&p.url.includes('apps.apple.com/us/app/logseq')),'logseq App Store row');
 assert.match(l.note,/TestFlight/);
});

test('server blocks name the deployment, clients name the access route',()=>{
 const abs=support['tools/audiobookshelf'];
 assert.match(abs.server.label,/self-hosted Audiobookshelf server/);
 assert.deepEqual(abs.server.platforms.map(p=>p.name),['Linux']);
 assert.deepEqual(abs.clients.map(p=>p.name),['Web','Android']);
 const immich=support['tools/immich'];
 assert.deepEqual(immich.clients.map(p=>p.name),['Web','Android','iOS']);
 const nc=support['tools/nextcloud'];
 assert.ok(nc.clients.some(p=>p.name==='Web')&&nc.clients.length===6);
});

test('browse-tags page and sidebar link exist',()=>{
 assert.match(fs.readFileSync(new URL('../src/pages/tags.astro',import.meta.url),'utf8'),/tag\/\$\{tag\.slug\}/);
 assert.match(fs.readFileSync(new URL('../src/layouts/CatalogLayout.astro',import.meta.url),'utf8'),/Browse tags/);
});
