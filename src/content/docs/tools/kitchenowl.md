---
title: KitchenOwl
description: Shared grocery lists, recipes and meal planning for a household.
added: 2026-11-09
category: Home
tags:
- Self-hosted
icon: kitchenowl.svg
mark: KO
repository: https://github.com/TomBursch/kitchenowl
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/tombursch
dripsEligible: false
managedHosting: false
screenshot:
  src: kitchenowl.webp
  alt: "KitchenOwl official mobile promotional screenshot showing grocery-list tiles"
  width: 900
  height: 1600
  credit: KitchenOwl
  sourceUrl: https://github.com/TomBursch/kitchenowl/blob/3cc27f41e3de3d805abd66bdac9eb283eb16e72c/metadata/en-US/images/phoneScreenshots/groceries.png
  license: AGPL-3.0
  captionNote: "Project-published demo image. Screenshot version not recorded."
---

KitchenOwl combines shared shopping lists, recipes and meal planning. It is
built for a household rather than a team wiki: add ingredients to a list,
keep recipes together and use web or mobile clients against your own server.

Upstream still labels the project **public alpha**, not production-ready,
and warns that things can occasionally break. Keep exports and backups and
try it with a non-critical list before relying on it for the household.

## Quick start

*Checked against the official single-container example on November 9, 2026.*

### Docker Compose

Requires Docker and the Compose plugin. Create a private `.env` file with
`KITCHENOWL_JWT_SECRET=` followed by a long, unique random secret. Run
`chmod 600 .env` and keep it out of version control. Do not use upstream's
placeholder secret. Save this as `compose.yaml`:

```yaml
services:
  kitchenowl:
    image: tombursch/kitchenowl:latest
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      JWT_SECRET_KEY: ${KITCHENOWL_JWT_SECRET:?Set it in .env first}
    volumes:
      - kitchenowl-data:/data
    restart: unless-stopped

volumes:
  kitchenowl-data:
```

Run `docker compose up -d`, then open http://localhost:8080 on the host and
complete the initial setup. The single image serves the web client and
backend. Back up the `kitchenowl-data` volume and preserve the secret.

This port is intentionally local. Mobile clients need a reachable server URL;
follow the official self-hosting guide to set up remote access with HTTPS
before connecting them. Review release notes and back up before updates,
especially while the project is in alpha.

## Why it's listed

A practical household use for self-hosting that is different from managing
servers or media libraries. Its shared list and recipe workflow is worth
trying, with its alpha status kept in view.

## Documentation

- [Self-hosting](https://docs.kitchenowl.org/latest/self-hosting/)
- [Official single-container Compose](https://github.com/TomBursch/kitchenowl/blob/main/docker-compose-single.yml)
- [Features](https://kitchenowl.org/features/)
