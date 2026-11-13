// Post-build guard: checks the SHARED rendered sections (release, platform
// support, decision brief, support panel, tags) exist and sit in the right
// order in the built HTML, driven by the data records - so a component or
// data change that drops a section fails `npm run build`.
// Runs as the build's postbuild hook; also runnable directly after a build.
import fs from 'node:fs';
import { tagsFor } from '../src/lib/taxonomy.mjs';

const read = p => fs.readFileSync(new URL('../'+p, import.meta.url), 'utf8');
const support = JSON.parse(read('src/data/platform-support.json'));
const briefs = JSON.parse(read('src/data/decision-briefs.json'));
const releases = JSON.parse(read('src/data/releases.json'));
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

const frontmatter = slug => {
 const text = read('src/content/docs/tools/'+slug+'.md');
 const front = text.split('---')[1];
 const get = k => (front.match(new RegExp('^'+k+': "?([^"\\n]+)"?$', 'm'))||[])[1];
 const tagBlock = (front.match(/^tags:\n((?:- .+\n)+)/m)||[])[1];
 return {
  repository: get('repository'), category: get('category'),
  tags: tagBlock ? [...tagBlock.matchAll(/^- (.+)$/gm)].map(m => m[1].trim()) : [],
 };
};

const fails = [];
for (const id of Object.keys(support)) {
 const slug = id.replace('tools/', '');
 const path = 'dist/tools/'+slug+'/index.html';
 if (!fs.existsSync(new URL('../'+path, import.meta.url))) { fails.push(slug+': page missing from dist'); continue; }
 const html = read(path);
 const rec = support[id], fm = frontmatter(slug), at = s => html.indexOf(s);

 // Release block: present exactly when the release data has a version
 const repoKey = fm.repository.replace(/^https?:\/\//, '').replace(/^github\.com\//, '');
 const rel = releases[repoKey];
 const hasBlock = html.includes('class="changelog"');
 if (rel?.version && !hasBlock) fails.push(slug+': release block missing for recorded version '+rel.version);
 if (!rel?.version && (html.includes('Release notes /') || html.includes('Recorded release /'))) fails.push(slug+': release block with no recorded version');
 if (rel?.version && !html.includes(rel.version)) fails.push(slug+': recorded version not rendered');

 // Platform support section
 const iPS = at('<section class="platform-support"');
 if (iPS < 0) { fails.push(slug+': platform-support section missing'); continue; }
 const isOS = rec.role === 'operating-system';
 const heading = isOS ? 'Device compatibility' : 'Available on these platforms';
 if (!html.includes(heading)) fails.push(slug+': platform heading missing: '+heading);
 if (rec.server) {
  const iReq = html.indexOf('Requires '+rec.server.label+'.');
  if (iReq < 0) fails.push(slug+': Requires line missing');
  else if (at(rec.clients[0].name) > iReq) fails.push(slug+': Requires line above client chips');
  if (!html.includes('Server systems, compatibility details and official sources')) fails.push(slug+': collapsed details summary missing');
  for (const c of rec.clients) if (!html.includes(c.name)) fails.push(slug+': client chip missing: '+c.name);
 } else if (rec.platforms) {
  for (const p of rec.platforms) if (!html.includes(p.name)) fails.push(slug+': platform chip missing: '+p.name);
  if (rec.selfHost && !html.includes('Optional:')) fails.push(slug+': optional self-host line missing');
 }
 if (rec.note && !html.includes(esc(rec.note))) fails.push(slug+': platform note not rendered');

 // Decision brief
 const iDB = at('<section class="decision-brief"');
 if (iDB < 0) fails.push(slug+': decision brief missing');
 else if (!html.includes(esc(briefs[id].heading))) fails.push(slug+': decision brief heading not rendered');

 // Shared section order: release < platform support < decision brief < Quick start
 const iQS = at('id="quick-start"');
 if (iQS < 0) fails.push(slug+': Quick start section missing from rendered page');
 if (hasBlock && at('class="changelog"') > iPS) fails.push(slug+': release block after platform support');
 if (iDB >= 0 && iDB < iPS) fails.push(slug+': decision brief above platform support');
 if (iQS >= 0 && iDB >= 0 && iQS < iDB) fails.push(slug+': Quick start above decision brief');

 // Support panel, setup prompts, tags
 if (!html.includes('id="project-support"')) fails.push(slug+': support panel missing');
 if (!html.includes('class="setup-prompt"')) fails.push(slug+': setup prompt missing');
 for (const tag of tagsFor({ category: fm.category, tags: fm.tags }))
  if (!html.includes('/tag/'+slugify(tag)+'/')) fails.push(slug+': tag link missing: '+tag);
}

// Homepage tour button + modal, and the shareable /tour/ page
for (const asset of ['dist/media/tour.mp4', 'dist/media/tour-mobile.mp4', 'dist/media/tour.vtt', 'dist/media/tour-poster.jpg', 'dist/media/tour-poster-mobile.jpg'])
 if (!fs.existsSync(new URL('../'+asset, import.meta.url))) fails.push(asset+' missing from dist');
const home = fs.existsSync(new URL('../dist/index.html', import.meta.url)) ? read('dist/index.html') : '';
if (!home) fails.push('homepage missing from dist');
else {
 if (!home.includes('data-tour-open')) fails.push('homepage: tour button missing');
 if (!home.includes('New here? Watch the tour')) fails.push('homepage: tour button label missing');
 if (!home.includes('data-tour-modal')) fails.push('homepage: tour dialog missing');
 if (!home.includes('preload="none"')) fails.push('homepage: tour video must not preload');
 if (!home.includes('media/tour.vtt')) fails.push('homepage: captions track missing');
 if (/data-tour-open[^>]*autoplay|autoplay[^>]*data-tour-modal/.test(home)) fails.push('homepage: autoplay attribute found');
 if (!home.includes('href="/tour/"')) fails.push('homepage: modal shareable-page link missing');
 if (!home.includes('data-src-mobile="media/tour-mobile.mp4"') && !home.includes('data-src-mobile="/media/tour-mobile.mp4"')) fails.push('homepage: modal mobile cut source missing');
 if (!home.includes('data-src-desktop')) fails.push('homepage: modal desktop cut source missing');
 if (!home.includes('data-poster-mobile="media/tour-poster-mobile.jpg"') && !home.includes('data-poster-mobile="/media/tour-poster-mobile.jpg"')) fails.push('homepage: modal mobile poster missing');
 if (!home.includes('data-tour-cut="mobile"')) fails.push('homepage: modal Mobile/Desktop switch missing');
}
// Detail-card regression pin (Nov 13 wide-desktop report): at 651px and up,
// the card's icon column must fit the 40px icon plus its 16px inset (56px).
// A 40px column let the icon overlap the tool name in detail view.
const cssHref = (home.match(/href="(\/_astro\/[^"]+\.css)"/)||[])[1];
if (!cssHref) fails.push('homepage: built stylesheet link missing');
else {
 const builtCss = read('dist'+cssHref);
 if (!/\[data-view="?detail"?\][^{]*\{[^}]*grid-template-columns:56px/.test(builtCss)) fails.push('built css: detail card icon column must be 56px so the icon cannot overlap the tool name');
}

const tour = fs.existsSync(new URL('../dist/tour/index.html', import.meta.url)) ? read('dist/tour/index.html') : '';
if (!tour) fails.push('tour page missing from dist');
else {
 if (!tour.includes('<video')) fails.push('tour page: video missing');
 if (!tour.includes('media/tour.vtt')) fails.push('tour page: captions track missing');
 if (!tour.includes('preload="none"')) fails.push('tour page: video must not preload');
 if (!tour.includes('media/tour-poster.jpg')) fails.push('tour page: poster missing');
 if (!tour.includes('Watch the tour')) fails.push('tour page: heading missing');
 if (!tour.includes('data-src-mobile')) fails.push('tour page: mobile cut source missing');
 if (!tour.includes('data-src-desktop')) fails.push('tour page: desktop cut source missing');
 if (!tour.includes('data-tour-cut="mobile"')) fails.push('tour page: Mobile/Desktop switch missing');
}

const total = Object.keys(support).length;
if (fails.length) {
 console.error('Rendered-layout check: '+fails.length+' failure(s) across '+total+' pages');
 fails.forEach(f => console.error('FAIL', f));
 process.exit(1);
}
console.log('Rendered-layout check: all '+total+' pages pass (release, platform support, decision brief, order, support panel, setup prompts, tags) + responsive homepage tour modal and /tour/ page (mobile + desktop cuts)');
