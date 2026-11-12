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
  assert.ok(r.platforms.length || (r.role === 'operating-system' && r.compatibilityUrl));assert.equal(new Set(r.platforms.map(p=>p.name)).size,r.platforms.length);
  for(const p of r.platforms){assert.ok(['Linux','Windows','macOS','Android','iOS','Web'].includes(p.name));assert.ok(p.kind);assert.equal(new URL(p.url).protocol,'https:');}
 }
});
test('unreleased or closed beta is not indexed as available iOS',()=>{
 assert.ok(!support['tools/thunderbird'].platforms.some(p=>p.name==='iOS'));
 assert.ok(!support['tools/audiobookshelf'].platforms.some(p=>p.name==='iOS'));
 assert.match(support['tools/thunderbird'].note,/in development/);
 assert.match(support['tools/audiobookshelf'].note,/full/);
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
 assert.match(support['tools/silverbullet'].note,/Desktop is explicitly not open source/);
 assert.deepEqual(support['tools/silverbullet'].platforms.map(p=>p.name),['Web']);
 assert.match(support['tools/taskwarrior'].platforms.find(p=>p.name==='Windows').kind,/WSL/);
 assert.match(support['tools/ublock-origin'].note,/Chrome removed/);
});
