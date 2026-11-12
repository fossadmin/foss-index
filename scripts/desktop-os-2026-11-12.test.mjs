import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const support=JSON.parse(fs.readFileSync(new URL('../src/data/platform-support.json',import.meta.url),'utf8'));
const releases=JSON.parse(fs.readFileSync(new URL('../src/data/releases.json',import.meta.url),'utf8'));
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('six desktop/server OS pages have icons, screenshots and explicit not-an-app scoping',()=>{
 for(const slug of ['parrot','almalinux','tails','qubes','blackarch','omarchy']){
  const text=read('src/content/docs/tools/'+slug+'.md');
  assert.match(text,/category: Operating systems/);
  assert.match(text,/not a NixOS\s+application or service/);
  assert.match(text,/## First use/);
  assert.match(text,/## NixOS compatibility/);
  assert.match(text,/source\.webp/);
  assert.match(text,/icon:/);
  assert.equal(support['tools/'+slug].role,'operating-system');
  assert.deepEqual(support['tools/'+slug].platforms,[]);
 }
});
test('security distros carry responsible-use and distro licenses are scoped',()=>{
 for(const slug of ['parrot','blackarch']){
  assert.match(read('src/content/docs/tools/'+slug+'.md'),/only on\s+systems you own or have explicit permission to test/);
 }
 for(const slug of ['parrot','almalinux','tails','qubes','blackarch']){
  assert.match(read('src/content/docs/tools/'+slug+'.md'),/Per-package licenses/);
 }
 assert.match(read('src/content/docs/tools/omarchy.md'),/license: MIT/);
 assert.match(read('src/content/docs/tools/parrot.md'),/no single license for the whole distribution/);
 assert.match(read('src/content/docs/tools/qubes.md'),/built from many components/);
});
test('release records are site-scoped snapshots with the stated caveat',()=>{
 assert.equal(releases['AlmaLinux'].version,'10.2 / 9.8');
 assert.equal(releases['BlackArch/blackarch'].version,'2023.05.01');
 assert.equal(releases['BlackArch/blackarch'].manualOnly,true);
 assert.equal(releases['QubesOS'].version,'4.3.2');
 assert.equal(releases['gitlab.tails.boum.org/tails/tails'].version,'7.17');
 assert.equal(releases['nest.parrot.sh'].version,'7.4');
 assert.equal(releases['omacom/omarchy'].version,'v4.5.0');
 assert.match(releases['omacom/omarchy'].changelog,/GitHub release v4\.5\.0 matches the omarchy\.org ISO/);
 for(const key of ['AlmaLinux','BlackArch/blackarch','QubesOS','gitlab.tails.boum.org/tails/tails','nest.parrot.sh','omacom/omarchy']){
  assert.equal(releases[key].manual,true);assert.equal(releases[key].checkedOn,'2026-11-12');assert.ok(releases[key].url.startsWith('https://'));
 }
});
test('asset notices cover the six new icons and screenshots',()=>{
 const icons=read('public/icons/NOTICE.md'),shots=read('public/screenshots/NOTICE.md');
 for(const name of ['parrot.svg','almalinux.png','tails.svg','qubes.png','blackarch.png','omarchy.svg'])assert.ok(icons.includes('## '+name),name);
 for(const name of ['parrot-source.webp','almalinux-source.webp','tails-source.webp','qubes-source.webp','blackarch-source.webp','omarchy-source.webp'])assert.ok(shots.includes('## '+name),name);
 assert.match(icons,/CSS animation rules were removed/);
 assert.match(icons,/The Jellyfin logo/);
 assert.match(shots,/not our install/);
 assert.ok(fs.existsSync(new URL('../public/icons/licenses/LICENSE-GPL-3.0.txt',import.meta.url)));
});
