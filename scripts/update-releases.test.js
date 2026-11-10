import test from 'node:test';
import assert from 'node:assert/strict';
import { checkReleases } from './update-releases.js';
const tools = [{ repo: 'owner/project', license: 'MIT / Apache-2.0' }];
const baseline = { 'owner/project': { version: 'v1', license: 'MIT / Apache-2.0', url: 'old', changelog: 'old' } };
const response = (status, body) => ({ ok: status === 200, status, json: async () => body });
async function check(license, release, status = 200) {
 return checkReleases({ tools, baseline, fetcher: async url => url.endsWith('/latest') ? response(status, release) : response(200, { license: { spdx_id: license } }) });
}
test('version candidate changes, curated mixed license and baseline preserved', async () => {
 const r = await check('MIT', { tag_name:'v2', html_url:'https://github.com/owner/project/releases/tag/v2', body:'notes' });
 assert.equal(r.candidate['owner/project'].version,'v2');assert.equal(r.candidate['owner/project'].license,'MIT / Apache-2.0');assert.equal(baseline['owner/project'].version,'v1');assert.equal(r.changes[0].licenseReview,true);
});
test('unknown license never replaces curated license', async () => { const r=await check('NOASSERTION',null,404);assert.equal(r.candidate['owner/project'].license,tools[0].license);assert.equal(r.changes[0].licenseReview,true); });
test('no release keeps previous version/URL/notes', async () => { const r=await check('MIT',null,404);assert.deepEqual(r.candidate,baseline);assert.equal(r.changes[0].noRelease,true); });
test('rate limit/server error reported, old data kept', async () => { for (const status of [403,429,500]) {const r=await check('MIT',null,status);assert.ok(r.errors.length>=1);assert.deepEqual(r.candidate,baseline);} });
test('network failure reported', async () => { const r=await checkReleases({tools,baseline,fetcher:async()=>{throw Error('timeout')}});assert.equal(r.errors.length,1);assert.deepEqual(r.candidate,baseline); });
test('new repo gets curated frontmatter license, not detection', async () => {const r=await checkReleases({tools,baseline:{},fetcher:async url=>url.endsWith('/latest')?response(404,null):response(200,{license:{spdx_id:'GPL-3.0'}})});assert.equal(r.candidate['owner/project'].license,tools[0].license);});
test('malformed release rejected', async()=>{const r=await check('MIT',{tag_name:'v2',html_url:'http://bad.invalid'});assert.equal(r.errors.length,1);assert.deepEqual(r.candidate,baseline);});
test('throttling stops subsequent repository requests', async()=>{let calls=0;const r=await checkReleases({tools:[...tools,{repo:'owner/second',license:'MIT'}],baseline,fetcher:async()=>{calls++;return response(429,null)}});assert.equal(calls,1);assert.equal(r.errors.length,2);});
test('non-GitHub host is skipped explicitly, curated data kept, not an error', async()=>{let calls=0;const kept={'git/forgejo':{license:'GPL-3.0-or-later',version:'v1'}};const r=await checkReleases({tools:[{unsupportedHost:'codeberg.org',url:'https://codeberg.org/forgejo/forgejo',file:'forgejo.md',license:'GPL-3.0-or-later'}],baseline:kept,fetcher:async()=>{calls++;return response(200,{})}});assert.equal(calls,0);assert.equal(r.errors.length,0);assert.equal(r.skipped.length,1);assert.equal(r.skipped[0].host,'codeberg.org');assert.deepEqual(r.candidate,kept);});
