---
# New-listing template. Copy to src/content/docs/tools/<slug>.md and replace
# every <placeholder>. scripts/listing-structure.test.mjs enforces this
# contract, and scripts/verify-rendered.mjs checks the built pages. Both
# run inside `npm run build`; the build fails if either does.
#
# Required frontmatter (all fields, all listings):
title: <Name>
description: <One sentence: what it does and who it is for. Used in cards and search.>
category: <One existing sidebar category, e.g. Media>
tags:
# Optional discovery tags. Add "- Self-hosted" only when the tool can run on
# your own server (required OR optional); the platform record decides which.
- <tag>
icon: <slug.svg-or-png>        # file must exist in public/icons/
mark: <Two letters>            # fallback monogram
repository: <https://... official source repo>
license: <SPDX id, verified against the repo's license file>
funding:
  githubSponsors: <https://github.com/sponsors/...>   # optional; other keys exist
nixosModule: <services.foo>    # only if nixpkgs has a module option
managedHosting: true           # optional, only if an official hosted route exists
screenshot:
  src: <slug.webp>             # file must exist in public/screenshots/
  alt: "<What the screenshot shows, concretely>"
  width: <px>
  height: <px>
  credit: <Project name or "FOSS Index">
  own: true                    # our own capture; otherwise add sourceUrl + terms note
  captionNote: "<Honest provenance: whose capture, which version>"
---

<Intro prose: 2-3 sentences. What it does, what makes it worth listing.
No marketing voice.>

## Quick start

<!-- Method tabs: Docker first, NixOS last (both when the project supports
them). Real, tested commands from the official docs - no invented flags.
Each method ends with its AI setup-prompt box (rendered from
src/data/setup-prompts.json), then the next method begins. -->

### Docker Compose

<Steps>

### Ubuntu Server

<Steps>

### NixOS

<Steps>

## First steps

<What to do right after it runs: create the admin account, add the first
thing, where settings live. Titled "First use" on some listings; pick one
and keep it. Operating-system listings may end at Quick start.>

<!--
CHECKLIST before proposing:
- [ ] Records added in ALL of: src/data/platform-support.json,
      src/data/decision-briefs.json, src/data/contribute-routes.json,
      src/data/setup-prompts.json (every listing has all four)
- [ ] platform-support.json: flat {platforms: []} for standalone apps;
      {server: {label, platforms: []}, clients: []} when a separate server
      is required; every claim checked against official docs TODAY
- [ ] Icon + screenshot files committed under public/, with NOTICE.md
      entries when the asset is the project's own published material
- [ ] npm run build passes: it runs the structure tests before building
      and the rendered-layout check after, and fails if either does
-->
