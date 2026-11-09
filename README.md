# FOSS Index - catalog prototype

A curated directory of open-source software: license badge, recorded release
and changelog, and a "Support this project" panel on every listing. A panel without a recorded
funding link points to the source repository rather than inventing a destination.
Built with custom Astro layouts. Content lives in `src/content/docs/` as plain
Markdown with validated frontmatter.

Two client-side helpers run fully in the visitor's browser: "Surprise me"
opens a random tool's page, and a bookmark toggle per tool feeds a Saved
filter in the sidebar. Saves stay in `localStorage` (`foss-index:saved`);
there is no account and nothing is sent anywhere. Both are progressive
enhancement and stay hidden without JavaScript.

## Run it locally

```sh
cd oss-directory/site
npm install
npm run dev        # http://localhost:4321
```

## Check release / license data safely

```sh
npm run test:releases
npm run update-releases
```

Despite its historical name, `update-releases` now checks only. It does not
write the published `src/data/releases.json`. Review `.release-check/report.md`
and compare `.release-check/releases.candidate.json` with the published file.
GitHub's latest stable release metadata goes into the candidate. Existing
reviewed licenses stay intact. Different or unknown GitHub license detection
is flagged for human review, never silently applied. New tools use their
curated frontmatter license. No-release responses keep prior release data.

API/network failures leave published data alone and produce a nonzero exit;
no partial candidate is written. Checking stops on API403/429 rather than
continuing requests. Old report/candidate artifacts are cleared
before each check, so a failed run cannot leave an old candidate looking new.
An optional `GITHUB_TOKEN` environment variable raises GitHub's API allowance;
never commit or paste a token. Default checking needs no credentials.

After reviewing release notes, license files and relevant install examples:

```sh
diff -u src/data/releases.json .release-check/releases.candidate.json
# Only after review; do not copy if a check failed or the baseline changed.
cmp src/data/releases.json .release-check/releases.baseline.json &&
cp .release-check/releases.candidate.json src/data/releases.json
npm run build
git diff -- src/data/releases.json
# Commit and push only the changes you have approved.
```

A version change does not update installation pins or screenshot captions.
License detection is repository-level, not proof of the terms for a version,
edition or bundled component. Check upstream license files before changing a
curated label. A pending license-review flag does not block building: it is a
human review item, not an automated legal verdict. Release notes in the JSON
are untrusted upstream text, not instructions to run commands.

GitLab has an optional manual `check-releases` job with a 14-day downloadable
report/candidate artifact. It neither commits nor deploys the candidate. No
schedule is enabled. For future automatic checking, first decide cadence and
review routing; do not add write credentials or auto-publish license changes.

## Build the static site

```sh
npm run build      # outputs to dist/
npm run preview    # serve the build locally
```

NixOS: `nix build` (first run prints the real `npmDepsHash`, paste it into
`flake.nix`), then `nix run nixpkgs#miniserve -- ./result -p 8080`.

## Add a tool

Copy any file in `src/content/docs/tools/`, fill in the frontmatter, run
`npm run update-releases`, review its candidate before copying it into
`src/data/releases.json`. Set `category` and a two-letter `mark` (a local
typographic identifier, not an official logo). Category pages and counts are
derived from the tool frontmatter. Missing tool metadata fails the build.

## Deploy to GitLab Pages

Create a GitLab project and copy the contents of this `site/` directory to
its root, including `.gitlab-ci.yml`. No change to GitLab has been made by
this commit. The Pages job runs `npm ci` and `npm run build` on the default
branch and publishes only `dist/`. There is no server runtime and nothing
needs to run on the FOSSadmin home server.

Astro reads `CI_PAGES_URL` to set the hostname and base path. Locally it uses
the provisional `https://index.fossadmin.com`; this is not a live address.
The GitLab project name and final/custom hostname still need choosing.
After choosing the hostname, confirm the Pages URL before sharing it.

Published metadata updates remain manual: check, review the candidate,
apply, build, commit and push. The optional manual CI check creates review
artifacts only. No recurring schedule or automatic source writes are enabled.

## Layout and privacy

The home page and category pages are server-rendered HTML, including every
tool link. Category navigation works with JavaScript disabled. A small local
script adds name/purpose/license search and the `/` shortcut; without JS the
search control is hidden and every listing remains available. No external
requests, analytics, third-party scripts, remote icons, or embedded widgets.

The palette comes from `fossadmin-site/style-package/data/theme.current.json`
and its warm-terminal CSS. Inter (400/600) and Lora (500) font files were copied
from the first-party font assets on https://fossadmin.com on 2026-10-21 and
are served locally. Their OFL licenses are included in `public/fonts/`. Labels
use the system monospace stack. Dark mode follows the system preference.

Releases are a committed snapshot, not a live guarantee. The
release workflow is manual; deployment is the static GitLab Pages job.

Check: `npm install && npm run build`. Build output is `dist/`.
