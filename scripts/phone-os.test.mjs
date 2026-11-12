import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { checkReleases } from './update-releases.js';
const support=JSON.parse(fs.readFileSync(new URL('../src/data/platform-support.json',import.meta.url),'utf8'));
const releases=JSON.parse(fs.readFileSync(new URL('../src/data/releases.json',import.meta.url),'utf8'));
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('three phone OS pages have real icons/screenshots, not fake native mobile support',()=>{
 for(const slug of ['grapheneos','calyxos','lineageos']){
  const text=read('src/content/docs/tools/'+slug+'.md');
  assert.match(text,/category: Operating systems/);assert.match(text,/Multiple \(component-specific\)/);
  assert.match(text,/proprietary/);assert.match(text,/not an Android app or an iPhone replacement/);
  assert.match(text,/We have not flashed a phone/);assert.match(text,/## First use/);assert.match(text,/## NixOS and desktop hosts/);
  assert.match(text,/source\.webp/);assert.match(text,/icon:/);
  assert.equal(support['tools/'+slug].role,'operating-system');assert.deepEqual(support['tools/'+slug].platforms,[]);
 }
});
test('flash/relock guidance stays project-specific and never enters generic AI prompt eligibility',()=>{
 const g=read('src/content/docs/tools/grapheneos.md'),c=read('src/content/docs/tools/calyxos.md'),l=read('src/content/docs/tools/lineageos.md');
 assert.match(g,/locks the bootloader again/);assert.match(c,/relocking/);assert.match(l,/relocking can make a device unusable/);
 const promptPath=new URL('../src/data/setup-prompts.json',import.meta.url);const prompt=fs.existsSync(promptPath)?JSON.parse(fs.readFileSync(promptPath,'utf8')):{};for(const id of ['grapheneos','calyxos','lineageos'])assert.equal(prompt['tools/'+id],undefined);
});
test('release scope is explicit and source checked, not a universal compatible phone build',()=>{
 assert.equal(releases['GrapheneOS/platform_manifest'].version,'2026110800');assert.match(releases['GrapheneOS/platform_manifest'].changelog,/Pixel 7/);
 assert.equal(releases['gitlab.com/CalyxOS/platform_manifest'].version,'8.0.5.20');assert.match(releases['gitlab.com/CalyxOS/platform_manifest'].changelog,/device/);
 assert.equal(releases['LineageOS/android'].version,'24.0');assert.match(releases['LineageOS/android'].changelog,/project-generation snapshot/);
 for(const key of ['GrapheneOS/platform_manifest','gitlab.com/CalyxOS/platform_manifest','LineageOS/android']){assert.equal(releases[key].manual,true);assert.equal(releases[key].checkedOn,'2026-11-12');assert.ok(releases[key].url.startsWith('https://'));}
});
test('asset notices preserve actual grants and old-image qualifications',()=>{
 const n=read('public/screenshots/NOTICE.md');
 for(const name of ['grapheneos-source.webp','calyxos-source.webp','lineageos-source.webp'])assert.ok(n.includes(name));
 assert.match(n,/CC BY-SA 2.5/);assert.match(n,/stricter attribution\/share-alike/);assert.match(n,/Copyright The LineageOS Project/);
 assert.match(n,/2022/);assert.match(n,/2024/);
 assert.ok(!fs.existsSync(new URL('../src/content/docs/tools/eos.md',import.meta.url)));
});

test('manifest repositories cannot overwrite device-scoped release snapshots',async()=>{
 const keys=['GrapheneOS/platform_manifest','LineageOS/android'];
 const result=await checkReleases({tools:keys.map(repo=>({repo,license:'Multiple (component-specific)'})),baseline:releases,fetcher:()=>{throw new Error('manual-only source must not be queried')}});
 assert.deepEqual(result.candidate,releases);assert.equal(result.skipped.length,2);assert.equal(result.errors.length,0);
});
