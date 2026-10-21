# FOSS Index - catalog prototype

A curated directory of open-source software: license badge, recorded release
and changelog, and a "Support this project" panel on every listing. A panel without a recorded
funding link points to the source repository rather than inventing a destination.
Built with custom Astro layouts. Content lives in `src/content/docs/` as plain
Markdown with validated frontmatter.

## Run it locally

```sh
cd oss-directory/site
npm install
npm run dev        # http://localhost:4321
```

## Refresh release / license data

```sh
npm run update-releases              # unauthenticated, fine for a few repos
GITHUB_TOKEN=... npm run update-releases
OLLAMA_HOST=http://localhost:11434 npm run update-releases   # optional LLM summaries
```

The site renders whatever is in `src/data/releases.json`; the listing
frontmatter is the fallback when no data has been fetched yet.

## Build the static site

```sh
npm run build      # outputs to dist/
npm run preview    # serve the build locally
```

NixOS: `nix build` (first run prints the real `npmDepsHash`, paste it into
`flake.nix`), then `nix run nixpkgs#miniserve -- ./result -p 8080`.

## Add a tool

Copy any file in `src/content/docs/tools/`, fill in the frontmatter, run
`npm run update-releases`. Set `category` and a two-letter `mark` (a local
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

Release updates are manual for now: run `npm run update-releases`, review
the data diff, commit it, and push. No scheduled release refresh is claimed
or configured. The old GitHub Actions workflows were removed.

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
