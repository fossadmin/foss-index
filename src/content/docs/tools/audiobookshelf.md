---
title: Audiobookshelf
description: Self-hosted audiobook and podcast server with web, Android, and iOS apps and per-device progress.
category: Media
icon: audiobookshelf.svg
mark: AB
repository: https://github.com/advplyr/audiobookshelf
license: GPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/advplyr
dripsEligible: true
nixosModule: services.audiobookshelf
managedHosting: true
screenshot:
  src: audiobookshelf.webp
  alt: "Audiobookshelf web interface Libraries settings page on a fresh install with no libraries yet"
  width: 1337
  height: 859
  credit: Audiobookshelf
  version: "v2.37.2"
  own: true
---

Audiobookshelf serves your audiobook and podcast libraries to the web
and its own Android and iOS apps, remembering where you stopped on
every device. Libraries, listening progress, and stats stay on your
hardware. It covers the audio side of a media setup that Jellyfin
handles for video.

## Quick start

*Verified against Audiobookshelf's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

The project documents Docker and an official Debian/Ubuntu package
repository; the NixOS module is maintained in nixpkgs.

### Docker Compose

Save this as `compose.yaml`, adapted from the official example:

```yaml
services:
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    container_name: audiobookshelf
    ports:
      - 13378:80
    volumes:
      - ./audiobooks:/audiobooks
      - ./podcasts:/podcasts
      - ./metadata:/metadata
      - ./config:/config
    restart: unless-stopped
```

Then `docker compose up -d` and open http://localhost:13378. Point the
two media volumes at your actual collections; libraries, users, and
listening progress persist in `./config` and `./metadata`. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### Ubuntu Server

The project maintains an apt repository (amd64 only):

```bash
sudo apt install gnupg curl
wget -O- https://advplyr.github.io/audiobookshelf-ppa/KEY.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/adb-archive-keyring.gpg
sudo curl -s -o /etc/apt/sources.list.d/audiobookshelf.list https://advplyr.github.io/audiobookshelf-ppa/audiobookshelf.list
sudo apt update
sudo apt install audiobookshelf
```

The package installs a systemd service; the web interface is on
http://localhost:13378 and the packaged defaults live in
`/etc/default/audiobookshelf`.

### NixOS

```nix
services.audiobookshelf = {
  enable = true;
};
```

Then `sudo nixos-rebuild switch`. The module serves the web app on
http://127.0.0.1:8000 and stores its data in `/var/lib/audiobookshelf`.
Set `services.audiobookshelf.host` plus `openFirewall = true` if you
want LAN access without a reverse proxy.

## Why it's listed

Audiobooks and podcasts are the one media type a general media server
handles poorly. Audiobookshelf fills that gap with proper apps and
per-device progress, with no Audible account in the middle.
