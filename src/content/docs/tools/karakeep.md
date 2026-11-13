---
title: Karakeep
description: Self-hosted bookmark-everything app. Saves the content, not just the link, with search and AI tagging.
category: Bookmarks
tags:
- Self-hosted
icon: karakeep.svg
iconDark: karakeep-dark.svg
mark: KK
repository: https://github.com/karakeep-app/karakeep
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/MohamedBassem
dripsEligible: true
nixosModule: services.karakeep
managedHosting: true
screenshot:
  src: karakeep.webp
  alt: "Karakeep home view with saved bookmarks shown as cards, on web and mobile"
  width: 1400
  height: 605
  credit: Karakeep
  sourceUrl: https://github.com/karakeep-app/karakeep/blob/main/screenshots/homepage.png
  license: AGPL-3.0
  captionNote: "Shows the v0.23.1 interface. Demo data, not our install."
---

Karakeep is a self-hosted "bookmark everything" app. Save links, notes,
images, and PDFs from the browser extension or the mobile apps, and it
crawls and stores the content itself - so search still works when the
original page disappears. Full-text search runs on Meilisearch, and
automatic AI tagging is optional.

## Quick start

*Verified against Karakeep's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Docker Compose is the documented install; there is no native Ubuntu
package, so on Ubuntu use Docker. The NixOS module is maintained in
nixpkgs.

### Docker Compose

Download the official compose file and environment template:

```bash
mkdir karakeep && cd karakeep
wget -O docker-compose.yml https://raw.githubusercontent.com/karakeep-app/karakeep/main/docker/docker-compose.yml
wget -O .env https://raw.githubusercontent.com/karakeep-app/karakeep/main/docker/.env.sample
```

The stack is three containers: the app, Meilisearch for search, and
headless Chrome for archiving pages. Edit `.env` and set the two
required secrets before starting:

```bash
# generate each with: openssl rand -base64 36 | tr -dc 'A-Za-z0-9'
MEILI_MASTER_KEY=
NEXTAUTH_SECRET=
```

Then `docker compose up -d`, open http://localhost:3000, and create your
account. Once you're in, set `DISABLE_SIGNUPS=true` in `.env` if the
instance is just for you. Data persists in the compose-managed volumes.
Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.karakeep = {
  enable = true;
  browser.enable = true;
};
```

Then `sudo nixos-rebuild switch`. The module starts Meilisearch for you,
generates the required secrets into `/var/lib/karakeep/settings.env` on
first run, and serves the app on http://localhost:3000.
`browser.enable` adds the headless Chrome that archives page contents.

## Why it's listed

Bookmarks in a browser sync service are links that rot; Karakeep keeps
the content, searchable, on your own hardware. It turns "save it for
later" into a pile you can actually find things in.
