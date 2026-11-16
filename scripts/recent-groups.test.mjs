import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../src/pages/recent.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

test('Recently added groups existing listing days, labels dates in UTC, keeps date/title order', () => {
  assert.match(source, /Map\.groupBy\(recentTools/);
  assert.match(source, /b\.data\.added!\.getTime\(\) - a\.data\.added!\.getTime\(\) \|\| a\.data\.title\.localeCompare/);
  assert.match(source, /timeZone: "UTC"/);
  assert.match(source, /<h2[^>]*>Added /);
  const format = new Intl.DateTimeFormat('en-US', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'});
  assert.equal(format.format(new Date('2026-11-15T00:00:00Z')), 'November 15, 2026');
});

for (const remaining of [true, false]) {
  test(`Expiry removes empty day headings and ${remaining ? 'keeps remaining groups' : 'shows empty state'}`, () => {
    function row(day) { return { removed:false, getAttribute:()=>day, remove(){this.removed=true;} }; }
    const old = row('2026-11-08');
    const fresh = row('2026-11-15');
    const groups = [[old], ...(remaining ? [[fresh]] : [])].map(rows=>({removed:false, querySelector:()=>rows.find(r=>!r.removed), remove(){this.removed=true;}}));
    const rows = [old, ...(remaining ? [fresh] : [])];
    const list = {hidden:false, querySelectorAll:s=>s==='[data-added]'?rows:groups, querySelector:()=>rows.find(r=>!r.removed)};
    const empty = {hidden:true};
    vm.runInNewContext(script, {Date:class extends Date { static now(){return Date.parse('2026-11-16T05:00:00Z');}}, document:{querySelector:s=>s==='[data-recent-list]'?list:empty}});
    assert.equal(old.removed,true);
    assert.equal(groups[0].removed,true);
    assert.equal(list.hidden,!remaining);
    assert.equal(empty.hidden,remaining);
    if (remaining) assert.equal(groups[1].removed,false);
  });
}
