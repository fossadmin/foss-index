---
title: "Penpot"
description: "Design and prototyping tool you can self-host, for teams that hand off to developers."
category: Creative
icon: penpot.svg
iconDark: penpot-dark.svg
mark: PN
repository: https://github.com/penpot/penpot
license: MPL-2.0
managedHosting: false
screenshot:
  src: penpot.webp
  alt: "The Penpot design app with a design system's typography tokens and a sample travel app on the canvas"
  width: 1280
  height: 720
  credit: "the Penpot website"
  sourceUrl: https://penpot.app/
  captionNote: "Image published on the Penpot home page, showing the app with a sample design project. The page states no reuse terms."
---

Penpot is a browser-based design tool for interfaces and prototypes. Designers and developers work in the same files, and the project documents how to host it yourself.

The repository's LICENSE file is the Mozilla Public License 2.0. The hosted service at penpot.app is run by the project and is separate from the self-hosted version.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Docker Compose

The [self-hosting guide](https://help.penpot.app/technical-guide/getting-started/docker/) needs Docker and Docker Compose, and says some DNS and proxy knowledge helps. It uses:

```bash
curl -o docker-compose.yaml https://raw.githubusercontent.com/penpot/penpot/main/docker/images/docker-compose.yaml
docker compose -p penpot -f docker-compose.yaml up -d
```

It listens on http://localhost:9001. To pin a version, set `PENPOT_VERSION`, for example `PENPOT_VERSION=2.4.3 docker compose -p penpot -f docker-compose.yaml up -d`. Stop it with `docker compose -p penpot -f docker-compose.yaml down`. The sample file uses placeholder secrets, so change the secret key and database password before exposing it.

### Hosted by the project

If you'd rather not run a server, Penpot also runs a hosted service at [penpot.app](https://penpot.app/). That is the project's service, with its own terms, and not what this listing's self-hosting steps cover.

### NixOS

nixpkgs packages the Penpot desktop client as `penpot-desktop` (source: [pkgs/by-name/pe/penpot-desktop/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/pe/penpot-desktop/package.nix)):

```nix
environment.systemPackages = [ pkgs.penpot-desktop ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch Penpot from the application menu.

Self-hosting the Penpot server on NixOS uses the Docker Compose route above; nixpkgs has no Penpot service module.

## First steps

- Open http://localhost:9001 and register an account. If public registration is off, the guide describes a command to create a user inside the backend container.
- Create a project and a board, then draw with the shapes on the left. Use the inspector on the right for colours and layout.
- Use **Invite** to add teammates. Invitation emails need SMTP set up in the compose file.

Source: [Penpot first steps](https://help.penpot.app/user-guide/first-steps/).
