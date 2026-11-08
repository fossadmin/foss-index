---
title: Paperless-ngx
description: Scan, index, and search your documents. OCRs paper into a searchable archive on your own hardware.
category: Documents
icon: paperless-ngx.svg
iconDark: paperless-ngx-dark.svg
mark: PX
repository: https://github.com/paperless-ngx/paperless-ngx
license: GPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/shamoon
dripsEligible: true
nixosModule: services.paperless
managedHosting: true
screenshot:
  src: paperless-ngx.webp
  alt: "Paperless-ngx documents view with document cards"
  width: 1400
  height: 1011
  credit: Paperless-ngx
  sourceUrl: https://github.com/paperless-ngx/paperless-ngx/blob/32bc552/docs/assets/screenshots/documents-smallcards.png
  license: GPL-3.0
---

Paperless-ngx turns scanned paper and digital files into a searchable
document archive. Drop a PDF or a phone photo of a letter into its
consumption folder and it OCRs the text, detects the correspondent and
date, applies your tags, and files it. Everything stays full-text
searchable from the web app, and it can also pull attachments straight
out of a mailbox.

## Quick start

*Verified against Paperless-ngx's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Docker Compose is the documented install; a bare-metal route exists for
advanced setups, so on Ubuntu use Docker. The NixOS module is maintained
in nixpkgs.

### Docker Compose

Save this as `compose.yaml`, adapted from the official SQLite compose
file:

```yaml
services:
  broker:
    image: docker.io/valkey/valkey:9-alpine
    restart: unless-stopped
    volumes:
      - redisdata:/data
  webserver:
    image: ghcr.io/paperless-ngx/paperless-ngx:latest
    restart: unless-stopped
    depends_on:
      - broker
    ports:
      - "8000:8000"
    volumes:
      - data:/usr/src/paperless/data
      - media:/usr/src/paperless/media
      - ./export:/usr/src/paperless/export
      - ./consume:/usr/src/paperless/consume
    environment:
      PAPERLESS_REDIS: redis://broker:6379
      PAPERLESS_DBENGINE: sqlite
      PAPERLESS_SECRET_KEY: change-me-to-a-long-random-string
volumes:
  data:
  media:
  redisdata:
```

Set `PAPERLESS_SECRET_KEY` to a long random string first; recent
versions refuse the placeholder. Then `docker compose up -d` and open
http://localhost:8000 - the web interface prompts you to create the
admin account on first visit. Documents copied into `./consume` get
OCRed and imported automatically. The project also ships PostgreSQL
compose variants and an interactive setup script that asks the questions
for you. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.paperless = {
  enable = true;
};
```

Then `sudo nixos-rebuild switch`. The module generates the required
secret key on first start, keeps data in `/var/lib/paperless`, and
serves the web interface on http://127.0.0.1:28981. Drop files into
`/var/lib/paperless/consume` or upload them in the web app.

## Why it's listed

Paper admin is where small offices and households quietly drown.
Paperless-ngx is the most mature open-source answer: a filing cabinet
that OCRs and searches itself, with an active community keeping it
current.
