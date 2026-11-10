import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { matchTool } from '../src/lib/search.mjs';
const alternatives = JSON.parse(readFileSync(new URL('../src/data/search-alternatives.json', import.meta.url)));

test('all curated alternative targets exist and have source/scope notes', () => {
  for (const [id, entry] of Object.entries(alternatives)) {
    assert.ok(existsSync(new URL(`../src/content/docs/${id}.md`, import.meta.url)), id);
    assert.ok(entry.source.startsWith('https://'));
    assert.ok(entry.scope);
    for (const name of entry.names) assert.ok(matchTool('example gpl creative', entry.names, name).matches, name);
  }
});
test('Photoshop works in case variants and comparison phrases', () => {
  for (const query of ['Photoshop', 'PHOTOSHOP', 'adobe photoshop', 'alternative to Photoshop', 'Photoshop alternatives', 'open-source alternative to Adobe Photoshop']) {
    const result = matchTool('gimp raster image editor creative gpl-3.0-or-later', alternatives['tools/gimp'].names, query);
    assert.ok(result.matches, query); assert.ok(result.alternative, query);
  }
});
test('ordinary searches keep their existing substring and AND semantics', () => {
  const text = 'gimp raster image editor creative gpl-3.0-or-later';
  for (const query of ['', 'GIMP', 'raster', 'Creative GPL', 'gpl-3.0']) assert.ok(matchTool(text, [], query).matches, query);
  assert.equal(matchTool(text, [], 'raster spreadsheet').matches, false);
});
test('aliases do not produce arbitrary substring or mixed-product matches', () => {
  const names = alternatives['tools/gimp'].names;
  for (const query of ['notphotoshop', 'Photoshop Figma', 'Photoshop spreadsheet', 'Adobe']) assert.equal(matchTool('gimp image creative gpl', names, query).matches, false, query);
  assert.ok(matchTool('gimp image creative gpl', names, 'Photoshop GPL').matches);
});
test('multiword suite names and specific component names work without generic Word matches', () => {
  const names = alternatives['tools/libreoffice'].names;
  for (const query of ['Microsoft Office', 'MS Office', 'Office 365', 'Excel', 'PowerPoint']) assert.ok(matchTool('libreoffice documents spreadsheets presentations', names, query).matches, query);
  assert.equal(matchTool('libreoffice documents spreadsheets presentations', names, 'word').matches, false);
});
