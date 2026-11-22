# AGENTS.md

Guidance for AI coding assistants working on this repository. Written
2026-11-17 as a forward-looking convention; it describes how to work on the
project from here on. For anything not covered here, follow README.md and
CONTRIBUTING.md.

## Project

FOSS Index (https://index.fossadmin.com) is a curated, editorial directory of
open-source software. Static Astro site deployed to GitLab Pages. Licensed
AGPL-3.0-only. Every listing is reviewed by a person before it goes in; keep
it that way.

## Commands

- `npm install` then `npm run dev` - local preview at http://localhost:4321
- `npm run build` - full check + build. `prebuild` runs `npm test` (including
  `scripts/listing-structure.test.mjs`), `postbuild` runs
  `scripts/verify-rendered.mjs` on the built pages. The build fails if any
  guard fails. Run this before proposing any listing or content change.
- `npm run preview` - serve the built site locally.
- `npm run test:releases` - unit tests for the release checker.
- `npm run update-releases` - CHECK ONLY. Writes a candidate file and report
  under `.release-check/`; never edits published data. A human reviews the
  report and diffs the candidate against `src/data/releases.json` before
  anything is copied over. Never copy a candidate after a failed check.

## Layout

- `src/content/docs/tools/<slug>.md` - one file per listing.
- `templates/new-listing.md` - annotated skeleton every listing starts from.
- `src/data/` - four records every listing must have:
  `platform-support.json`, `decision-briefs.json`, `contribute-routes.json`,
  `setup-prompts.json`.
- `public/icons/`, `public/screenshots/` - self-hosted assets with
  `NOTICE.md` attribution and `screenshots/licenses/` texts where required.
- `scripts/` - the guards and the release checker.

## Listing contract

- Start from `templates/new-listing.md`; fill every frontmatter field.
- Section order: Quick start (method tabs, Docker first and NixOS last),
  then First steps. The structure test enforces this.
- Add the listing's four `src/data/` records in the same change.
- Icon and screenshot: the project's official material used under its stated
  terms (with NOTICE.md entries), or our own capture of the running software.
  If the asset terms require permission, ask first or ship without the image.
  Never use images scraped from search results. Screenshot captions identify
  their source.
- All links official: project-owned sites, docs, repos and funding pages.
  Verify against the project's own declarations; when no official route
  exists, omit the field rather than link a third party.
- FOSS only: OSI-approved licenses. If a candidate's license does not
  qualify, it does not go in.
- Quick-start content comes from each project's current documentation, and
  license details from upstream license files. License detection in the
  release checker is a repository-level hint, not a legal verdict.

## Site rules

- Works without JavaScript; scripts are progressive enhancement only.
- No tracking, accounts or third-party scripts. The disclosed self-hosted
  Umami counter is the one intentional exception.
- No per-page claims about what we have or have not tested; the About page
  carries the site-wide disclaimer and AI-use disclosure. Captions keep
  image attribution.
- Keep changes small and reviewable.

## Commits

- Author and committer stay FOSSadmin.
- When AI meaningfully contributed to a commit's code, research or writing,
  add an `Assisted-by:` trailer naming the tool that helped, e.g.
  `Assisted-by: Instinct AI`, one trailer per tool. Genuinely manual commits
  need no trailer. Never rewrite or relabel existing history.
- Do not push or deploy; the maintainer reviews and pushes.

## Boundaries

Do not add services, accounts, deployment changes, analytics or external
dependencies without the maintainer's explicit approval. When asked to
review or audit, report findings only; do not change, install, commit or
push anything unless asked.

## Agent skills

### Issue tracker

Issues are tracked in GitLab Issues for `fossadmin/foss-index` (uses `glab`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default triage label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` + `docs/adr/` at repo root). See `docs/agents/domain.md`.
