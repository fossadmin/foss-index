import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const support=JSON.parse(fs.readFileSync(new URL('../src/data/platform-support.json',import.meta.url),'utf8'));
const releases=JSON.parse(fs.readFileSync(new URL('../src/data/releases.json',import.meta.url),'utf8'));
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('six tool pages have icons, screenshots and researched-not-installed scoping',()=>{
 for(const slug of ['technitium','scrutiny','cryptpad','ollama','copyparty','warpgate']){
  const text=read('src/content/docs/tools/'+slug+'.md');
  assert.match(text,/icon:/);
  assert.match(text,/source\.webp/);
  assert.match(text,/## Quick start/);
  assert.match(text,/We have not installed or run it/);
  assert.match(text,/## First use/);
  assert.match(text,/## Documentation/);
  assert.match(text,/independent\s+listing|independent listing/);
  assert.ok(support['tools/'+slug],slug);
  const rec=support['tools/'+slug];assert.ok((rec.platforms??rec.clients??[]).length>0,slug);
 }
});
test('funding fields match verified routes only',()=>{
 assert.match(read('src/content/docs/tools/technitium.md'),/patreon\.com\/technitium/);
 assert.match(read('src/content/docs/tools/scrutiny.md'),/githubSponsors: https:\/\/github\.com\/sponsors\/AnalogJ/);
 assert.match(read('src/content/docs/tools/cryptpad.md'),/openCollective: https:\/\/opencollective\.com\/cryptpad/);
 assert.ok(!read('src/content/docs/tools/ollama.md').includes('funding:'));
 assert.ok(!read('src/content/docs/tools/copyparty.md').includes('funding:'));
 const w=read('src/content/docs/tools/warpgate.md');
 assert.match(w,/githubSponsors: https:\/\/github\.com\/sponsors\/eugeny/);
 assert.match(w,/openCollective: https:\/\/opencollective\.com\/tabby/);
 assert.match(w,/FUNDING\.yml directs support to[\s\S]*?Tabby Open Collective/);
 // Unenrolled GitHub Sponsors URLs redirect to plain profiles: never link them.
 const bean=read('src/content/docs/tools/beancount.md');
 assert.match(bean,/url: https:\/\/www\.paypal\.com\/paypalme\/misislavski/);
 assert.ok(!bean.includes('sponsors/blais'));
 assert.ok(!read('src/content/docs/tools/drawio-desktop.md').includes('funding:'));
 const routes=read('src/data/contribute-routes.json');
 assert.ok(!routes.includes('sponsors/blais'));
 assert.ok(!routes.includes('sponsors/jgraph'));
});
test('nixos coverage is accurate: five modules, copyparty package-only',()=>{
 forconst: for(const slug of ['technitium','scrutiny','cryptpad','ollama','warpgate']){
  assert.match(read('src/content/docs/tools/'+slug+'.md'),/nixosModule: services\./);
 }
 const c=read('src/content/docs/tools/copyparty.md');
 assert.ok(!c.includes('nixosModule:'),'copyparty must not claim a module');
 assert.match(c,/nix run nixpkgs#copyparty/);
 assert.match(c,/no NixOS service module at check time/);
});
test('release records are present with the stated check date',()=>{
 assert.equal(releases['TechnitiumSoftware/DnsServer'].version,'v15.6.2');
 assert.equal(releases['AnalogJ/scrutiny'].version,'v0.10.0');
 assert.equal(releases['cryptpad/cryptpad'].version,'2026.10.1');
 assert.equal(releases['ollama/ollama'].version,'v0.40.16');
 assert.equal(releases['9001/copyparty'].version,'v1.20.26');
 assert.equal(releases['warp-tech/warpgate'].version,'v0.30.4');
 assert.match(releases['warp-tech/warpgate'].changelog,/moved from Eugeny\/warpgate/);
 for(const key of ['TechnitiumSoftware/DnsServer','AnalogJ/scrutiny','cryptpad/cryptpad','ollama/ollama','9001/copyparty','warp-tech/warpgate']){
  assert.equal(releases[key].checkedOn,'2026-11-12');assert.ok(releases[key].url.startsWith('https://'));
 }
});
test('asset notices cover the new icons and screenshots',()=>{
 const icons=read('public/icons/NOTICE.md'),shots=read('public/screenshots/NOTICE.md');
 for(const name of ['technitium.png','ollama.png','copyparty.svg','cryptpad.svg','warpgate.svg','scrutiny.svg','scrutiny-dark.svg'])assert.ok(icons.includes('## '+name),name);
 for(const name of ['technitium-source.webp','scrutiny-source.webp','copyparty-source.webp','cryptpad-source.webp','warpgate-source.webp','ollama-source.webp'])assert.ok(shots.includes('## '+name),name);
 assert.match(shots,/CC BY 4\.0/);
 assert.match(shots,/MGeog2022/);
 assert.ok(fs.existsSync(new URL('../public/screenshots/licenses/LICENSE-CC-BY-4.0.txt',import.meta.url)));
});
test('mealie listing is complete and honestly scoped (100th listing)',()=>{
 const text=read('src/content/docs/tools/mealie.md');
 assert.match(text,/license: AGPL-3\.0/);
 assert.match(text,/githubSponsors: https:\/\/github\.com\/sponsors\/hay-kot/);
 assert.match(text,/nixosModule: services\.mealie/);
 assert.match(text,/We have not installed or run it/);
 assert.match(text,/source\.webp/);
 assert.match(text,/default\s+admin\s+credentials/);
 assert.ok(support['tools/mealie']);assert.ok(!support['tools/tandoor'],'tandoor must stay unlisted (Commons Clause)');
 assert.ok(!fs.existsSync(new URL('../src/content/docs/tools/tandoor.md',import.meta.url)));
 assert.equal(releases['mealie-recipes/mealie'].version,'v3.30.0');
 assert.equal(releases['mealie-recipes/mealie'].checkedOn,'2026-11-12');
 const icons=read('public/icons/NOTICE.md'),shots=read('public/screenshots/NOTICE.md');
 assert.ok(icons.includes('## mealie.png'));assert.ok(shots.includes('## mealie-source.webp'));
});
