// Pairs each "Ask your AI to help with setup" box with its matching Quick
// start platform section at build time, and adds a no-JS platform jump list.
//
// Input: the rendered .prose HTML of a tool page, with every setup-prompt box
// (<section class="setup-prompt" data-setup-prompt data-method="...">) still at
// the end (their server-rendered position). Output: each box moved to the end
// of the Quick start <h3> section whose title matches its data-method, and a
// "Jump to" anchor list inserted after the Quick start lead when the page has
// two or more platform sections. With JavaScript on, the existing tab builder
// sweeps each section (box included) into its tab panel unchanged; the jump
// list is hidden by CSS (html.js .qs-jump).
//
// Pure string surgery on known, machine-generated markup. Box markup contains
// no nested <section> elements, so a box ends at its first "</section>".
// Anything unexpected leaves the input unchanged rather than dropping content.

const BOX_RE = /<section class="setup-prompt" data-setup-prompt data-method="([^"]*)"[^>]*>/g;
const HEADING_RE = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;

const decodeAttr = s =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const stripTags = s => s.replace(/<[^>]*>/g, '').trim();
const idFrom = attrs => (attrs.match(/\bid="([^"]*)"/) || [])[1];

export function pairQuickStart(html) {
  // 1. Lift the setup-prompt boxes out of the flow.
  const boxes = [];
  let out = '';
  let last = 0;
  for (const m of html.matchAll(BOX_RE)) {
    const end = html.indexOf('</section>', m.index);
    if (end < 0) return html; // malformed: leave everything as it was
    boxes.push({ method: decodeAttr(m[1]), html: html.slice(m.index, end + '</section>'.length) });
    out += html.slice(last, m.index);
    last = end + '</section>'.length;
  }
  out += html.slice(last);

  // 2. Find the Quick start h2 and its h3 platform sections.
  const qs = /<h2\b[^>]*>\s*Quick start\s*<\/h2>/i.exec(out);
  if (!qs) return boxes.length ? html : out; // no quick start: keep the original order
  const sections = [];
  let quickStartEnd = out.length;
  HEADING_RE.lastIndex = qs.index + qs[0].length;
  for (let m; (m = HEADING_RE.exec(out)); ) {
    if (m[1] === '2') { quickStartEnd = m.index; break; }
    sections.push({ title: stripTags(m[3]), id: idFrom(m[2]), start: m.index, heading: m[0] });
  }
  if (!sections.length) return html;

  // 3. Build the result in one pass, inserting the jump list before the first
  //    platform heading and each box at the end of its matching section.
  sections.forEach((s, i) => { s.end = i + 1 < sections.length ? sections[i + 1].start : quickStartEnd; });
  const inserts = new Map(); // position -> html to insert before it
  if (sections.length >= 2 && sections.every(s => s.id)) {
    const links = sections.map(s => `<a href="#${s.id}">${s.title}</a>`).join(' · ');
    inserts.set(sections[0].start, `<p class="qs-jump">Jump to: ${links}</p>`);
  }
  const unmatched = [];
  for (const box of boxes) {
    const sec = sections.find(s => s.title === box.method);
    if (sec) inserts.set(sec.end, (inserts.get(sec.end) || '') + box.html);
    else unmatched.push(box.html);
  }
  let result = '';
  let pos = 0;
  const points = [...inserts.keys()].sort((a, b) => a - b);
  for (const p of points) {
    result += out.slice(pos, p) + inserts.get(p);
    pos = p;
  }
  result += out.slice(pos);
  if (unmatched.length) result += unmatched.join(''); // keep them visible at the end, as before
  return result;
}
