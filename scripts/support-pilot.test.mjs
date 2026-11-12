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
test('expanded guidance is data-driven and distinguishes research from testing',()=>{
 const detail=read('src/pages/[...slug].astro');
 assert.match(detail,/\{brief && <DecisionBrief \{\.\.\.brief\} \/>\}/);
 assert.match(detail,/\{contribute && <ContributeRoutes \{\.\.\.contribute\} \/>\}/);
 const briefs=JSON.parse(read('src/data/decision-briefs.json'));
 const routes=JSON.parse(read('src/data/contribute-routes.json'));
 const actual=briefs['tools/actual-budget'];
 assert.match(actual.heading,/Start with a budget, not a server/);
 assert.equal(actual.checkedOn,'November 12, 2026');
 const component=read('src/components/DecisionBrief.astro');
 assert.match(component,/Researched, not an install or restore test/);
 const actualRoutes=routes['tools/actual-budget'];
 assert.match(actualRoutes.aiNote,/ai-usage-policy/);
 assert.ok(actualRoutes.routes.some(r=>r.href.includes('i18n')));
 assert.ok(actualRoutes.routes.some(r=>r.href.includes('writing-docs')));
});
test('Actual funding and exit notes are explicit, with no new payment flow',()=>{
 const actual=read('src/content/docs/tools/actual-budget.md');
 assert.match(actual,/openCollective: https:\/\/opencollective.com\/actual/);
 assert.match(actual,/githubSponsors: https:\/\/github.com\/sponsors\/actualbudget/);
 assert.match(actual,/No migration, export or restore was performed/);
 assert.match(actual,/not a promise that another finance app can read it/);
});
