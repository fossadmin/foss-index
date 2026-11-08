---
title: Jellyfin
description: The free software media system. Stream your own movies, shows, and music to any device.
category: Media
mark: JF
repository: https://github.com/jellyfin/jellyfin
license: GPL-2.0
funding:
  openCollective: https://opencollective.com/jellyfin
dripsEligible: true
nixosModule: services.jellyfin
managedHosting: true
screenshot:
  src: jellyfin.webp
  alt: "Jellyfin web video player during playback of the public-domain film Jungle Book (1942), with timeline and controls"
  width: 1400
  height: 788
  credit: Jellyfin
  sourceUrl: https://github.com/jellyfin/jellyfin.org/blob/8bbab0075207076559c9cae64143cf44b26c65be/static/images/screenshots/home/10.8-playback.png
  license: CC BY-ND 4.0
---

Jellyfin is a media server: point it at your collection of movies, shows,
music, and photos, and it streams them to apps on phones, TVs, and
browsers. It's a fully community-run fork of Emby with no premium tier
and no tracking. Everything is free.

## Quick start

*Verified against Jellyfin's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

### Docker Compose

Save this as `compose.yaml`:

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    ports:
      - 8096:8096
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /path/to/your/media:/media
    restart: unless-stopped
```

Then `docker compose up -d` and open http://localhost:8096. Config, cache
and your media library stay on the host. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

Jellyfin is a single service in `configuration.nix`:

```nix
services.jellyfin = {
  enable = true;
  openFirewall = true;
};
```

Then `sudo nixos-rebuild switch` and open http://localhost:8096.
`openFirewall` opens the web UI port; hardware transcoding options live
under `services.jellyfin.transcoding`.

### Ubuntu Server

Jellyfin's own script adds its apt repository and installs the server:

```bash
curl -s https://repo.jellyfin.org/install-debuntu.sh -O
curl -s https://repo.jellyfin.org/install-debuntu.sh.sha256sum -O
sha256sum -c install-debuntu.sh.sha256sum
sudo bash install-debuntu.sh
```

Then `sudo systemctl enable --now jellyfin` and open http://localhost:8096.

## Why it's listed

It's the standard answer for self-hosted media. No accounts on someone
else's server, no features locked behind a subscription, and a healthy
plugin ecosystem.
