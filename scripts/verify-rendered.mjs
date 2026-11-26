// Post-build guard: checks the SHARED rendered sections (release, platform
// support, decision brief, support panel, tags) exist and sit in the right
// order in the built HTML, driven by the data records - so a component or
// data change that drops a section fails `npm run build`.
// Runs as the build's postbuild hook; also runnable directly after a build.
import fs from 'node:fs';
import { tagsFor, browseDefinitions } from '../src/lib/taxonomy.mjs';

const read = p => fs.readFileSync(new URL('../'+p, import.meta.url), 'utf8');
const support = JSON.parse(read('src/data/platform-support.json'));
const briefs = JSON.parse(read('src/data/decision-briefs.json'));
const releases = JSON.parse(read('src/data/releases.json'));
const previews = JSON.parse(read('src/data/previews.json'));
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

const frontmatter = slug => {
 const text = read('src/content/docs/tools/'+slug+'.md');
 const front = text.split('---')[1];
 const get = k => (front.match(new RegExp('^'+k+': "?([^"\\n]+)"?$', 'm'))||[])[1];
 const tagBlock = (front.match(/^tags:\n((?:- .+\n)+)/m)||[])[1];
 return {
  repository: get('repository'), category: get('category'), added: get('added'),
  tags: tagBlock ? [...tagBlock.matchAll(/^- (.+)$/gm)].map(m => m[1].trim()) : [],
 };
};

const fails = [];
const catById = {};
for (const id of Object.keys(support)) catById[id] = frontmatter(id.replace('tools/', '')).category;
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

 // Preview clip (pilot): explicit-play video, never autoplaying
 const pv = previews[id];
 if (pv) {
  if (!html.includes('<video')) fails.push(slug+': preview video missing');
  if (!html.includes('preload="none"')) fails.push(slug+': preview video must not preload');
  if (/autoplay/i.test(html)) fails.push(slug+': preview video must not autoplay');
  if (!html.includes('controls')) fails.push(slug+': preview video needs visible controls');
  if (!html.includes(esc(pv.note))) fails.push(slug+': preview provenance note not rendered');
  if (!fs.existsSync(new URL('../dist/'+pv.src, import.meta.url))) fails.push(slug+': preview file missing from dist: '+pv.src);
 }

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

 // Related tools: same browse group, after the tags line, linking the group page
 const group = browseDefinitions.find(g => g.categories.includes(fm.category));
 const peers = Object.keys(catById).filter(k => k !== id && group.categories.includes(catById[k]));
 const iRel = at('<nav class="related"');
 if (peers.length > 0) {
  if (iRel < 0) fails.push(slug+': related-tools section missing');
  else {
   if (iRel < at('>Tags:')) fails.push(slug+': related-tools section above tags');
   if (!html.includes('More in '+esc(group.name))) fails.push(slug+': related-tools heading missing');
   if (!html.includes('/browse/'+slugify(group.name)+'/')) fails.push(slug+': related-tools group link missing');
   const peerLink = peers.find(k => html.includes('/'+k+'/'));
   if (!peerLink) fails.push(slug+': related-tools has no peer link');
  }
 } else if (iRel >= 0) fails.push(slug+': related-tools section with no peers');
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
 if (/class="tour-share"/.test(home)) fails.push('homepage: modal shareable-page link present (removed Nov 13 per Chris: share the site, not the video)');
if (!/tour-title" href="\/tour\/"/.test(home)) fails.push('homepage: modal title link to /tour/ missing');
 if (!home.includes('data-src-mobile="media/tour-mobile.mp4"') && !home.includes('data-src-mobile="/media/tour-mobile.mp4"')) fails.push('homepage: modal mobile cut source missing');
 if (!home.includes('data-src-desktop')) fails.push('homepage: modal desktop cut source missing');
 if (!home.includes('data-poster-mobile="media/tour-poster-mobile.jpg"') && !home.includes('data-poster-mobile="/media/tour-poster-mobile.jpg"')) fails.push('homepage: modal mobile poster missing');
 if (!home.includes('data-tour-cut="mobile"')) fails.push('homepage: modal Mobile/Desktop switch missing');
if (/class="search-row" hidden/.test(home)) fails.push('homepage: search row must render at first paint (hidden attr reintroduced)');
if (/data-view-toggle[^>]*hidden/.test(home)) fails.push('homepage: view toggle must render at first paint (hidden attr reintroduced)');
if ((home.match(/rel="preload"[^>]*font\/woff2/g) || []).length < 3) fails.push('homepage: all three fonts must be preloaded');

 // Recently added: button beside "Watch the tour" linking /recent/, always
 // visible even when the rolling 7-day window is empty (Chris, 2026-11-26).
 // The /recent/ page carries the empty-state wording instead of the homepage.
 const RECENT_MS = 7*24*60*60*1000;
 const windowDates = Object.keys(support)
  .map(id => frontmatter(id.replace('tools/', '')).added)
  .filter(d => d && Date.now() - Date.parse(d+'T00:00:00Z') <= RECENT_MS);
 if (!/data-recent-link[^>]*>Recently added/.test(home)) fails.push('homepage: recently-added button missing beside the tour button');
 if (/data-recent-link[^>]*\shidden[ >]/.test(home)) fails.push('homepage: recently-added button must always render visible');
 if (home.includes('data-latest-added')) fails.push('homepage: data-latest-added aging leftover must be gone');
 if (home.includes('data-recent-fallback') || home.includes('Check back for newly added tools')) fails.push('homepage: recent empty-state wording belongs on /recent/, not the homepage');
 if (!home.includes('Featured first, then A-Z')) fails.push('homepage: sort-order note missing beside the All tools heading');
 if (home.includes('76 seconds, captions available')) fails.push('homepage: old tour duration note must be gone');
 if (home.includes('data-recent-dismiss') || home.includes('fossindex-recent-seen')) fails.push('homepage: banner/dismiss leftovers must be gone');
 const recentPage = fs.existsSync(new URL('../dist/recent/index.html', import.meta.url)) ? read('dist/recent/index.html') : '';
 if (!recentPage) fails.push('recent page: missing from dist');
 else {
  if (windowDates.length > 0 && !recentPage.includes('data-recent-list')) fails.push('recent page: list missing');
  if (windowDates.length === 0 && !recentPage.includes('data-recent-empty')) fails.push('recent page: empty state missing');
  if (windowDates.length > 0 && (recentPage.match(/data-added="/g) || []).length !== windowDates.length) fails.push('recent page: row count mismatch');
  if (/Recently added<\/h1>[\s\S]{0,200}\d{4}-\d{2}-\d{2}/.test(recentPage)) fails.push('recent page: must not show dates in the header area');
 }
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
 if (!tour.includes('Quick tour around the Index')) fails.push('tour page: lede must open with the current quick-tour phrasing');
}

// Tour media pairing pins (V10, Nov 13): captions and labels must match the
// current video files, so stale captions or an old label can never ship
// paired with new cuts.
const vtt = fs.existsSync(new URL('../dist/media/tour.vtt', import.meta.url)) ? read('dist/media/tour.vtt') : '';
if (!vtt) fails.push('tour captions file missing from dist');
else {
 const saveAt = vtt.indexOf('Save tools for later');
 const supportAt = vtt.indexOf('Support this project');
 if (saveAt < 0 || supportAt < 0 || saveAt > supportAt) fails.push('tour captions: Save cue must come before the Support cue (V10 order)');
}
const sizes = { 'dist/media/tour.mp4': 4573900, 'dist/media/tour-mobile.mp4': 12119955 };

// Canonical-domain guard: the public origin is https://index.fossadmin.com
// everywhere. On CI, CI_PAGES_URL is the gitlab.io Pages domain and must never
// leak into canonical links or the sitemap (regression: 2026-11-13 deploy
// 3f57ef2 canonicalized every page to foss-index-d1c2ba.gitlab.io).
{
  const home = read('dist/index.html');
  const canonical = (home.match(/<link rel="canonical" href="([^"]+)"/)||[])[1];
  if (canonical !== 'https://index.fossadmin.com/') fails.push('homepage canonical must be https://index.fossadmin.com/, got '+canonical);
  const smPath = new URL('../dist/sitemap-0.xml', import.meta.url);
  if (!fs.existsSync(smPath)) { fails.push('sitemap-0.xml missing from dist (sitemap integration dropped?)'); }
  else {
    const sitemap = fs.readFileSync(smPath, 'utf8');
    if (sitemap.includes('gitlab.io')) fails.push('sitemap URLs must use index.fossadmin.com, found gitlab.io');
    if (!sitemap.includes('<loc>https://index.fossadmin.com/</loc>')) fails.push('sitemap must list the custom-domain homepage');
  }
}
for (const [f, want] of Object.entries(sizes)) {
 try { const got = fs.statSync(new URL('../'+f, import.meta.url)).size; if (got !== want) fails.push(f+': size '+got+' != expected '+want+' (V10 cut) - stale or mismatched media'); }
 catch { fails.push(f+': missing from dist'); }
}
if (!home.includes('data-tour-open')) fails.push('homepage: tour button must render');

// Analytics pins (Umami integration): the tracker must load on every page
// with query strings and URL fragments stripped, restricted to the production
// hostname; the About privacy answer must carry the real disclosure (region,
// retention) and the footer must link to it.
const scriptRe = /<script defer src="https:\/\/cloud\.umami\.is\/script\.js" data-website-id="0b53e35a-33df-477d-a489-f81c79aa0277" data-domains="index\.fossadmin\.com" data-exclude-search="true" data-exclude-hash="true" data-do-not-track="true"><\/script>/;
for (const page of ['dist/index.html', 'dist/about/index.html']) {
 if (!fs.existsSync(new URL('../'+page, import.meta.url))) { fails.push(page+': missing from dist'); continue; }
 const html = read(page);
 if (!scriptRe.test(html)) fails.push(page+': Umami script tag missing or config drifted (website-id, data-domains, exclude-search/hash, do-not-track must stay pinned)');
}
const about = fs.existsSync(new URL('../dist/about/index.html', import.meta.url)) ? read('dist/about/index.html') : '';
if (about) {
 if (about.includes('No analytics, no external scripts')) fails.push('about page: stale "no analytics" claim contradicts the Umami integration');
 if (!about.includes('cookie-free analytics')) fails.push('about page: analytics disclosure missing');
 if (!about.includes('6 months')) fails.push('about page: retention period missing from disclosure');
 if (!about.includes('US region')) fails.push('about page: data region missing from disclosure');
}
if (!home.includes('Minimal, cookie-free analytics')) fails.push('homepage footer: short analytics notice link missing');

// The stale pre-analytics claim must appear on NO rendered page, not just
// About: sweep every generated index.html for its distinctive wording.
function walkHtml(dir){ const out=[]; for (const e of fs.readdirSync(new URL('../'+dir, import.meta.url), { withFileTypes: true })) { const p = dir+'/'+e.name; if (e.isDirectory()) out.push(...walkHtml(p)); else if (e.name === 'index.html') out.push(p); } return out; }
for (const page of walkHtml('dist')) {
 if (/no external scripts/i.test(read(page))) fails.push(page+': stale "no analytics / no external scripts" claim contradicts the Umami integration');
}

// Outbound-click analytics: every tool page's Source-code anchor must be
// tagged link="project", and every list-rendered outbound anchor (the
// support list and the related-guides list both render
// <li><a ...>Label ↗</a></li>, unlike contributing-route anchors, which
// render </a>:) must carry outbound-click + tool attributes and be tagged
// with its own kind: link="support" for funding links, link="guide" for
// related-guides links - the About privacy note promises exactly this scope.
for (const page of walkHtml('dist/tools')) {
 const html = read(page);
 const src = html.match(/<a class="source-link" href="[^"]*"([^>]*)>/);
 if (!src || !src[1].includes('data-umami-event="outbound-click"') || !src[1].includes('data-umami-event-link="source"') || !src[1].includes('data-umami-event-tool="')) fails.push(page+': Source code anchor lost its outbound-click event attributes');
 for (const m of html.matchAll(/<a href="https?:\/\/[^"]*"([^>]*)>[^<]*↗<\/a><\/li>/g)) {
  const kind = m[1].includes('data-umami-event-link="support"') ? 'support' : m[1].includes('data-umami-event-link="guide"') ? 'guide' : null;
  if (!m[1].includes('data-umami-event="outbound-click"') || !kind || !m[1].includes('data-umami-event-tool="')) fails.push(page+': '+(kind ? kind+' link' : 'outbound list link (funding or related-guide)')+' lost its outbound-click event attributes');
 }
}
for (const page of walkHtml('dist')) {
 const html = read(page);
 for (const m of html.matchAll(/<a class="tool-mark tool-icon project-icon-link" href="[^"]*"([^>]*)>/g)) {
  if (!m[1].includes('data-umami-event="outbound-click"') || !m[1].includes('data-umami-event-link="website"') || !m[1].includes('data-umami-event-tool="')) fails.push(page+': project website icon link lost its outbound-click event attributes');
 }
}

// Featured-card measurement: the homepage marks exactly the featured.json
// cohort (this week's featured tools as featured, the previous week's as
// regular after they return to normal positions), and every directory card
// row on every page carries card-click attributes - the About privacy note
// promises exactly this scope.
{
 const featured = JSON.parse(read('src/data/featured.json'));
 const featuredIds = [...featured.picks, featured.random];
 const previousIds = [...(featured.previous ?? []), ...(featured.next ?? [])].filter(id => !featuredIds.includes(id));
 const home = read('dist/index.html');
 const marked = [...home.matchAll(/<li class="tool-item" data-tool data-tool-id="([^"]+)" data-card-placement="(featured|regular)"/g)];
 const got = pl => marked.filter(m => m[2] === pl).map(m => m[1]).sort().join(',');
 const want = ids => ids.slice().sort().join(',');
 if (got('featured') !== want(featuredIds)) fails.push('homepage: measured featured cards ' + (got('featured') || '(none)') + ' != featured.json ' + want(featuredIds));
 if (got('regular') !== want(previousIds)) fails.push('homepage: measured regular cards ' + (got('regular') || '(none)') + ' != featured.json previous+next ' + (want(previousIds) || '(empty until rotation)'));
 for (const page of walkHtml('dist')) {
  const html = read(page);
  for (const m of html.matchAll(/<a class="tool-row" href="[^"]*"([^>]*)>/g)) {
   if (!m[1].includes('data-umami-event="card-click"') || !m[1].includes('data-umami-event-tool="') || !m[1].includes('data-umami-event-placement="')) fails.push(page+': tool row lost its card-click event attributes');
  }
  if (page !== 'dist/index.html' && html.includes('data-card-placement')) fails.push(page+': card measurement marks leaked off the homepage');
 }
}

// Search snippets: taxonomy pages (browse/category/tag/platform) must carry
// their own meta description, not the homepage tagline, and tag page titles
// must differ from same-named category pages. Credits pages intentionally
// share a title because they canonical to /credits/.
{
 const DEFAULT_DESC = 'Discover open source. Support the projects.';
 for (const section of ['dist/browse', 'dist/category', 'dist/tag', 'dist/platform']) {
  for (const page of walkHtml(section)) {
   const html = read(page);
   const m = html.match(/<meta name="description" content="([^"]*)"/);
   if (!m || m[1] === DEFAULT_DESC) fails.push(page+': taxonomy page lost its own meta description');
   // Featured tools lead every listing view, then the rest A-Z, so taxonomy
   // pages carry the same sort note as the homepage (Chris, 2026-11-26).
   if (!html.includes('<p class="sort-note">Featured first, then A-Z</p>')) fails.push(page+': taxonomy page missing the sort note');
  }
 }
 for (const page of walkHtml('dist/tag')) {
  const t = read(page).match(/<title>([^<]*)<\/title>/);
  if (!t || !t[1].startsWith('Tools tagged ')) fails.push(page+': tag page title no longer distinct from its category page');
 }
}

const total = Object.keys(support).length;
if (fails.length) {
 console.error('Rendered-layout check: '+fails.length+' failure(s) across '+total+' pages');
 fails.forEach(f => console.error('FAIL', f));
 process.exit(1);
}
console.log('Rendered-layout check: all '+total+' pages pass (release, platform support, decision brief, order, support panel, setup prompts, tags, related tools) + responsive homepage tour modal and /tour/ page (mobile + desktop cuts)');
