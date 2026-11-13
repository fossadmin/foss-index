---
title: Umami
description: Simple, privacy-first web analytics you can self-host. No cookies, no personal data collection.
category: Analytics
tags:
- Self-hosted
icon: umami.svg
iconDark: umami-dark.svg
mark: UM
repository: https://github.com/umami-software/umami
license: MIT
dripsEligible: true
nixosModule: services.umami
managedHosting: true
screenshot:
  src: umami.webp
  alt: "Umami analytics dashboard for umami.is with views, visits, visitors, bounce rate, pages and referrers"
  width: 1400
  height: 1188
  credit: Umami's website
  sourceUrl: https://umami.is/
  captionNote: "Product image from Umami's own website, showing example umami.is stats. Not our install."
---

Umami is a self-hosted analytics platform focused on simplicity: traffic,
referrers, and events on a clean dashboard, with no cookies and no
personal data collection. It runs on Node.js with a PostgreSQL
database.

## Quick start

*Verified against Umami's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

### Docker Compose

Umami's own repo ships a compose file with its PostgreSQL database. Save
this as `compose.yaml`:

```yaml
services:
  umami:
    image: ghcr.io/umami-software/umami:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      APP_SECRET: replace-with-a-random-string
      # needed only for two-factor login: openssl rand -hex 32
      # TWO_FACTOR_ENCRYPTION_KEY: replace-with-a-64-character-hex-string
    depends_on:
      db:
        condition: service_healthy
    restart: always
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  umami-db-data:
```

Change `APP_SECRET` and the database password before exposing it. Then
`docker compose up -d` and open http://localhost:3000. Umami creates a
default login (`admin` / `umami`) when it first sets up the database;
change it immediately after your first login. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### Ubuntu Server

Umami documents a from-source install (Node.js 20.19+ and PostgreSQL
required):

```bash
git clone https://github.com/umami-software/umami.git
cd umami
pnpm install
echo "DATABASE_URL=postgresql://umami:password@localhost:5432/umami" > .env
pnpm build
pnpm start
```

Then open http://localhost:3000. First login is `admin` / `umami`; change
it immediately.

### NixOS

```nix
services.umami.enable = true;
```

Then `sudo nixos-rebuild switch` and open http://localhost:3000. The
module creates its PostgreSQL database automatically. First login is
`admin` / `umami`; change it immediately.

## Why it's listed

A solid MIT-licensed alternative in the same space as Plausible. If you
want the most permissive license for an analytics deployment, this is
the pick.
