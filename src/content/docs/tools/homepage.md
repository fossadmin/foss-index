---
title: Homepage
description: A fast, self-hosted start page for your services, with live widgets for over a hundred apps.
category: Dashboard
mark: HP
repository: https://github.com/gethomepage/homepage
license: GPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/gethomepage
  openCollective: https://opencollective.com/homepage
dripsEligible: true
nixosModule: services.homepage-dashboard
managedHosting: true
---

Homepage gives your server a front door: one start page with links,
live status, and widgets for the things you run. Everything is
configured in a few readable YAML files, and built-in integrations pull
live data - queue depth, disk health, stream counts - from over a
hundred self-hosted apps.

## Quick start

*Verified against Homepage's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Homepage runs as a container or from source; there is no native Ubuntu
package, so on Ubuntu use Docker. The NixOS module is maintained in
nixpkgs.

### Docker Compose

Save this as `compose.yaml`, from the official installation docs:

```yaml
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - 3000:3000
    environment:
      HOMEPAGE_ALLOWED_HOSTS: localhost:3000
    volumes:
      - ./config:/app/config
    restart: unless-stopped
```

Then `docker compose up -d` and open http://localhost:3000.
`HOMEPAGE_ALLOWED_HOSTS` is required - list every hostname you browse it
under, comma-separated. Your apps go in `./config/services.yaml` (the
config directory holds the other YAML files too); mount
`/var/run/docker.sock` read-only as well if you want container status
widgets. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.homepage-dashboard = {
  enable = true;
};
```

Then `sudo nixos-rebuild switch`. The service listens on port 8082 and
only answers for localhost until you set
`services.homepage-dashboard.allowedHosts` to the hostname or IP you
browse it under. Bookmarks, service entries, and widgets are declared
under `services.homepage-dashboard.bookmarks`, `.services`, `.widgets`
and `.settings`.

## Why it's listed

Once more than a couple of tools from this directory are running,
remembering ports becomes the chore. Homepage replaces the bookmark
folder with a start page that shows what's actually up.
