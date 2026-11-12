import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {matchingMethod,copyPrompt} from '../src/lib/setup-prompt.js';
const prompts=JSON.parse(fs.readFileSync(new URL('../src/data/setup-prompts.json',import.meta.url),'utf8'));
test('eligibility is explicitly limited to PostgreSQL Docker Compose',()=>{
 assert.deepEqual(Object.keys(prompts),['tools/postgresql']);
 assert.equal(prompts['tools/postgresql'].method,'Docker Compose');
 assert.equal(matchingMethod('Docker Compose',['Linux','Docker Compose','NixOS']),1);
 assert.equal(matchingMethod('Docker Compose',['Linux','NixOS']),-1);
});
test('copy preserves authored plain text exactly, including shell metacharacters',async()=>{
 const text='a\n$PASSWORD: ${PASSWORD:?local only}\n"quoted" `code` <tag> \\q';let actual;
 assert.equal(await copyPrompt(text,async value=>{actual=value}),true);assert.equal(actual,text);
});
test('failed/unavailable clipboard never reports success',async()=>{
 assert.equal(await copyPrompt('test',null),false);
 assert.equal(await copyPrompt('test',async()=>{throw Error('denied')}),false);
 assert.equal(await copyPrompt('',async()=>{}),false);
});
test('reference retains shared storage, first-use and verification caveats',()=>{
 const p=prompts['tools/postgresql'];
 assert.match(p.verification,/Researched, not run/);
 for(const term of ['2026-11-11','127.0.0.1:5432:5432','postgres-data:/var/lib/postgresql','SELECT current_database(), version();','down without -v','does not reset','not approval to execute','https://hub.docker.com/_/postgres']) assert.ok(p.text.includes(term),term);
 assert.match(p.text,/until I approve the exact plan/);assert.match(p.text,/never pasted into chat/);
 assert.doesNotMatch(p.text,/POSTGRES_PASSWORD:\s+[A-Za-z0-9]{8,}/);
});
test('manual prompt stays available without JavaScript, copy starts hidden',()=>{
 const component=fs.readFileSync(new URL('../src/components/SetupPrompt.astro',import.meta.url),'utf8');
 assert.match(component,/data-copy-setup hidden/);assert.match(component,/<details data-setup-fallback>/);assert.match(component,/<textarea readonly/);assert.match(component,/aria-live="polite"/);
});

test('reviewed Docker recipe is copied without drifting from listing',()=>{
 const listing=fs.readFileSync(new URL('../src/content/docs/tools/postgresql.md',import.meta.url),'utf8');
 const recipe=listing.split('### Docker Compose\n')[1].split('### Linux')[0].trim();
 assert.ok(prompts['tools/postgresql'].text.includes(recipe));
});
