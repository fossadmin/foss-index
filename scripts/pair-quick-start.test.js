// Unit tests for build-time pairing of setup-prompt boxes with their Quick
// start platform sections, and the no-JS platform jump list.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pairQuickStart } from '../src/lib/pair-quick-start.js';

const box = (method, text) =>
  `<section class="setup-prompt" data-setup-prompt data-method="${method}" aria-label="${method} setup prompt"><div class="setup-prompt-heading"><strong>Ask your AI to help with setup · ${method}</strong></div><p>${method} · ${text}.</p><details><summary>Read or copy the prompt manually</summary><textarea>prompt for ${method}</textarea></details></section>`;

const page = ({ sections = [['linux', 'Linux'], ['nixos', 'NixOS']], boxes = [box('Linux', 'purpose'), box('NixOS', 'purpose')], tail = '<h2 id="first-use">First use</h2><p>later</p>' } = {}) => {
  const secs = sections.map(([id, t]) => `<h3 id="${id}">${t}</h3><p>${t} steps <code>run</code></p>`).join('');
  return `<h2 id="quick-start">Quick start</h2><p>lead note</p>${secs}${tail}${boxes.join('')}`;
};

test('each box lands at the end of its matching platform section', () => {
  const out = pairQuickStart(page());
  const at = s => out.indexOf(s);
  assert.ok(at('<p>Linux steps') < at('data-method="Linux"'), 'Linux box after Linux steps');
  assert.ok(at('data-method="Linux"') < at('<h3 id="nixos">'), 'Linux box before NixOS section');
  assert.ok(at('<p>NixOS steps') < at('data-method="NixOS"'), 'NixOS box after NixOS steps');
  assert.ok(at('data-method="NixOS"') < at('<h2 id="first-use">'), 'NixOS box before the next h2');
});

test('jump list is inserted after the lead with anchors to every platform', () => {
  const out = pairQuickStart(page());
  const jump = out.match(/<p class="qs-jump">(.*?)<\/p>/);
  assert.ok(jump, 'jump list present');
  assert.ok(jump[1].includes('<a href="#linux">Linux</a>'));
  assert.ok(jump[1].includes('<a href="#nixos">NixOS</a>'));
  assert.ok(out.indexOf('qs-jump') > out.indexOf('lead note'), 'after the lead');
  assert.ok(out.indexOf('qs-jump') < out.indexOf('<h3 id="linux">'), 'before the first platform heading');
});

test('page without a Quick start heading is returned unchanged', () => {
  const html = '<h2 id="install">Install</h2><p>steps</p>' + box('Linux', 'x');
  assert.equal(pairQuickStart(html), html);
});

test('unmatched method keeps its box at the end, others still pair', () => {
  const out = pairQuickStart(page({ boxes: [box('Linux', 'a'), box('Windows', 'b')] }));
  assert.ok(out.indexOf('data-method="Linux"') < out.indexOf('<h3 id="nixos">'), 'Linux paired');
  assert.ok(out.indexOf('data-method="Windows"') > out.indexOf('<h2 id="first-use">'), 'Windows left at the end');
  assert.ok(out.includes('qs-jump'), 'jump list still added');
});

test('a single platform section gets its box but no jump list', () => {
  const out = pairQuickStart(page({ sections: [['linux', 'Linux']], boxes: [box('Linux', 'a')] }));
  assert.ok(!out.includes('qs-jump'), 'no jump list for one platform');
  assert.ok(out.indexOf('data-method="Linux"') > out.indexOf('Linux steps'));
  assert.ok(out.indexOf('data-method="Linux"') < out.indexOf('<h2 id="first-use">'));
});

test('no boxes: jump list still added, content otherwise untouched', () => {
  const src = page({ boxes: [] });
  const out = pairQuickStart(src);
  assert.ok(out.includes('qs-jump'));
  assert.equal(out.replace(/<p class="qs-jump">.*?<\/p>/, ''), src);
});

test('malformed box markup leaves the page unchanged', () => {
  const src = '<h2 id="quick-start">Quick start</h2><h3 id="linux">Linux</h3><p>x</p><section class="setup-prompt" data-setup-prompt data-method="Linux"><p>never closed';
  assert.equal(pairQuickStart(src), src);
});

test('section titles with markup still match plain methods', () => {
  const src = '<h2 id="quick-start">Quick start</h2><p>lead</p><h3 id="docker-compose"><span>Docker</span> Compose</h3><p>steps</p><h2 id="more">More</h2>' + box('Docker Compose', 'y');
  const out = pairQuickStart(src);
  assert.ok(out.indexOf('data-method="Docker Compose"') > out.indexOf('<p>steps</p>'));
  assert.ok(out.indexOf('data-method="Docker Compose"') < out.indexOf('<h2 id="more">'));
});
