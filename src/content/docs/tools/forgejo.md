---
title: "Forgejo"
description: "Self-hosted software forge for Git repositories, issues and pull requests."
category: Development
icon: forgejo.svg
mark: FG
repository: https://codeberg.org/forgejo/forgejo
license: GPL-3.0-or-later
managedHosting: false
nixosModule: services.forgejo
screenshot:
  src: forgejo.webp
  alt: "A Forgejo repository page in light mode with the file list and commit history"
  width: 1280
  height: 800
  credit: "SkipperGeek"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Forgejo_screenshot_light_mode.png
  license: "CC BY-SA 4.0"
  commons: true
  captionNote: "Light mode, January 2023. This is an early release and the current interface may differ."
---

Forgejo hosts Git repositories with issues, pull requests and a web interface, on a server you run. The project describes itself as a community-governed forge.

Forgejo's README says it is distributed under GPL version 3 or any later version, implemented from Forgejo v9.0. All versions before v9.0 were under the MIT license. The project is developed on Codeberg, so release data for this listing is not tracked by the site's GitHub-based release check.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Docker Compose

Forgejo's [Docker guide](https://forgejo.org/docs/latest/admin/installation/docker/) gives this example. Save it as `compose.yaml`:

```yaml
networks:
  forgejo:
    external: false
services:
  server:
    image: codeberg.org/forgejo/forgejo:17
    container_name: forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - forgejo
    volumes:
      - ./forgejo:/data
      - /etc/localtime:/etc/localtime:ro
    ports:
      - '3000:3000'
      - '222:22'
```

Then run `docker compose up -d`. The folder you mount must be owned by the UID and GID you set, or the container may not start. The `17` tag followed the latest 17.x release when we checked. Moving up a major version needs a manual step, so read the upgrade notes first. If you don't configure a database it uses SQLite.

### Other routes

The project also documents Podman, binary and package installs under [installation](https://forgejo.org/docs/latest/admin/installation/). Docker is the route we checked most closely.

### NixOS

nixpkgs carries a full module (source: [nixos/modules/services/misc/forgejo.nix](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/misc/forgejo.nix)). A minimal host:

```nix
services.forgejo = {
  enable = true;
  settings.server = {
    DOMAIN = "git.example.com";
    HTTP_PORT = 3000;
  };
};
```

Apply with `sudo nixos-rebuild switch`. State lives in `/var/lib/forgejo` and the module defaults to SQLite, so a small instance needs no database setup. Git over SSH is exposed through the host's own `services.openssh` when enabled.

## First steps

- Open http://localhost:3000 in a browser. The first visit shows Forgejo's onboarding page to set up the instance.
- Choose the database (SQLite is fine for a small instance), the site URL and the admin account, then create the first repository.
- Git over SSH is mapped to port 222 in the example above. Clone with the SSH port included, or use HTTP.
- Keep the `./forgejo` data folder in your backups.

Forgejo is hosted on Codeberg, so this site's release checker skips it and shows no recorded release for it.
