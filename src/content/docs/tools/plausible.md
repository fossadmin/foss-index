---
title: Plausible Analytics
description: Open source, privacy-first web analytics. Lightweight, cookie-free Google Analytics alternative.
added: 2026-10-21
category: Analytics
tags:
- Self-hosted
- NixOS module
icon: plausible.svg
mark: PL
repository: https://github.com/plausible/analytics
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/plausible
dripsEligible: true
nixosModule: services.plausible
managedHosting: true
screenshot:
  src: plausible.webp
  alt: "Plausible Analytics dashboard with sample traffic data"
  width: 1400
  height: 1098
  credit: Plausible Analytics
  sourceUrl: https://github.com/plausible/analytics/blob/1264998/.github/plausible-analytics-dashboard.webp
  license: AGPL-3.0
---

Plausible is a website analytics tool that tracks traffic without cookies
and without collecting personal data, so sites using it can skip the
consent banner. The script is small enough not to slow pages down, and
all the reports fit on one page.

You can self-host the Community Edition or pay for their hosted cloud.
The AGPL license means anyone offering their own hosted version has to
share their changes back.

## Quick start

*Verified against Plausible's own documentation on November 8, 2026.*

Plausible Community Edition self-hosts with Docker; there is no native
Ubuntu package, so on Ubuntu use Docker. The NixOS module is maintained
in nixpkgs.

### Docker Compose

The Community Edition repo ships the compose file and ClickHouse config:

```bash
git clone -b v3.2.1 --single-branch https://github.com/plausible/community-edition plausible-ce
cd plausible-ce
echo "BASE_URL=https://analytics.example.com" > .env
echo "SECRET_KEY_BASE=$(openssl rand -base64 48)" >> .env
docker compose up -d
```

Then open http://localhost:8000. Registration, sites and email settings
are covered in the [Community Edition
wiki](https://github.com/plausible/community-edition/wiki). Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.plausible = {
  enable = true;
  server = {
    baseUrl = "https://analytics.example.com";
    # generate once with: openssl rand -base64 48
    secretKeybaseFile = "/run/secrets/plausible-secret-key-base";
  };
};
```

Then `sudo nixos-rebuild switch`. PostgreSQL and ClickHouse are set up
automatically; the dashboard listens on localhost port 8000, so put a
reverse proxy in front.

## Why it's listed

A self-hosted option for keeping website traffic reports on infrastructure
you control.
