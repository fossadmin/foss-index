---
title: "FreshRSS"
description: "Self-hosted RSS feed aggregator."
category: Reading
tags:
- Self-hosted
icon: freshrss.svg
mark: FR
repository: https://github.com/FreshRSS/FreshRSS
license: AGPL-3.0
funding:
  liberapay: https://liberapay.com/FreshRSS
managedHosting: false
nixosModule: services.freshrss
screenshot:
  src: freshrss.webp
  alt: "FreshRSS feed list in light mode with a subscription sidebar and a list of articles"
  width: 1280
  height: 653
  credit: "the FreshRSS website"
  sourceUrl: https://freshrss.org/images/screenshot.webp
  captionNote: "Image published on the FreshRSS home page, dated February 2025 by its sample entries. Article titles shown are public feed headlines."
---

FreshRSS collects the feeds you follow into one reader that you host yourself. Per its README, it supports WebSub push notifications from compatible sources.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Docker

From the project's [Docker README](https://github.com/FreshRSS/FreshRSS/blob/edge/Docker/README.md):

```bash
docker run -d --restart unless-stopped --log-opt max-size=10m \
  -p 8080:80 \
  -e TZ=Europe/Paris \
  -e CRON_MIN=1,31 \
  -v freshrss_data:/var/www/FreshRSS/data \
  -v freshrss_extensions:/var/www/FreshRSS/extensions \
  --name freshrss \
  freshrss/freshrss:latest
```

Change `TZ` to your timezone. The README's example uses the rolling `edge` image, which tracks the development branch. This page uses `latest`, the README's tag for the newest versioned release. The README also documents other tags and a Docker Compose setup. `CRON_MIN` makes it refresh feeds automatically.

### Web server (PHP)

The [general installation guide](https://freshrss.github.io/FreshRSS/en/admins/03_Installation.html) covers a plain install: a web server, PHP and a database, FreshRSS placed where PHP can write its `data/` folder, and only the `p/` folder exposed to the web. Docker is simpler if you have it.

### NixOS

nixpkgs carries a module (source: [nixos/modules/services/web-apps/freshrss.nix](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/web-apps/freshrss.nix)) that runs FreshRSS with php-fpm behind nginx (or caddy, via `webserver`):

```nix
services.freshrss = {
  enable = true;
  defaultUser = "admin";
  passwordFile = "/run/secrets/freshrss-password"; # keep outside the Nix store
  baseUrl = "http://localhost";
};
```

Apply with `sudo nixos-rebuild switch`, then sign in as `admin` with the password from `passwordFile` and change it. Data lives in `/var/lib/freshrss`.

## First steps

- Open http://localhost:8080 and finish the installation in the web interface (language, database, first user).
- Add a feed under subscription management by pasting its address, or import an OPML file from another reader.
- If you'd rather script it, the Docker README shows `docker exec --user www-data freshrss cli/do-install.php` for installing from the command line.
- Put it behind HTTPS before exposing it beyond your own network.
