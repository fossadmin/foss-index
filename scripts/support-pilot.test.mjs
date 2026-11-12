import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('project-support routes are static and not nested in card links',()=>{
 const detail=read('src/pages/[...slug].astro');
 assert.match(detail,/href="#project-support"/);
 assert.match(detail,/id="project-support"/);
 const catalog=read('src/components/Catalog.astro');
 assert.match(catalog,/#project-support/);
 assert.ok(catalog.indexOf('class="catalog-support"')>catalog.indexOf('</a>\n        {tool.data.iconLink'));
});
test('expanded guidance stays Actual-only and distinguishes research from testing',()=>{
 const detail=read('src/pages/[...slug].astro');
 assert.equal((detail.match(/entry.id === "tools\/actual-budget"/g)||[]).length,2);
 const pilot=read('src/components/ActualBudgetPilot.astro');
 assert.match(pilot,/Researched, not an install or restore test/);
 assert.match(pilot,/November 12, 2026/);
 assert.match(pilot,/ai-usage-policy/);
 assert.match(pilot,/i18n/);
 assert.match(pilot,/writing-docs/);
});
test('Actual funding and exit notes are explicit, with no new payment flow',()=>{
 const actual=read('src/content/docs/tools/actual-budget.md');
 assert.match(actual,/openCollective: https:\/\/opencollective.com\/actual/);
 assert.match(actual,/githubSponsors: https:\/\/github.com\/sponsors\/actualbudget/);
 assert.match(actual,/No migration, export or restore was performed/);
 assert.match(actual,/not a promise that another finance app can read it/);
});
