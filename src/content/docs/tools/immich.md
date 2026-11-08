---
title: Immich
description: High performance self-hosted photo and video backup. A Google Photos alternative on your own hardware.
category: Photos
mark: IM
repository: https://github.com/immich-app/immich
license: AGPL-3.0
funding:
  custom:
    - label: Buy a license (supports development)
      url: https://buy.immich.app
dripsEligible: true
nixosModule: services.immich
managedHosting: true
screenshot:
  src: immich.webp
  alt: "Immich administration Server Stats page with storage usage and per-user usage table"
  width: 1400
  height: 763
  credit: Immich
  sourceUrl: https://github.com/immich-app/immich/blob/87ef895041e160aef4f61f2d7af1ad3f8e38827d/docs/docs/administration/img/server-stats.webp
  license: AGPL-3.0
---

Immich is a self-hosted photo and video backup system: the mobile app
uploads straight from your phone to your server, with automatic backup,
albums, facial recognition, and search. It's the closest thing to Google
Photos running on hardware you own.

## Quick start

*Verified against Immich's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Immich officially supports Docker; there is no supported bare-metal
Ubuntu install, so on Ubuntu use Docker. The NixOS module is maintained
in nixpkgs.

### Docker Compose

Download the compose file and environment template from the current
release:

```bash
mkdir immich-app && cd immich-app
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```

Set `UPLOAD_LOCATION` (where your photos live), `DB_DATA_LOCATION` and a
random `DB_PASSWORD` in `.env`, then `docker compose up -d` and open
http://localhost:2283. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.immich = {
  enable = true;
  openFirewall = true;
};
```

Then `sudo nixos-rebuild switch`. The module sets up PostgreSQL and Redis
automatically and serves the web app on http://localhost:2283.

## Why it's listed

Phone photos are usually the least backed-up and most personal data
people have. Immich makes leaving the cloud version painless. Development
is fast, so read the release notes before upgrading.
