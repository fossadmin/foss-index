---
title: Trilium Notes
description: Rich notes in a linked hierarchy, with search, revisions and scripting.
added: 2026-11-09
category: Notes
tags:
- Self-hosted
- NixOS module
icon: trilium-notes.svg
mark: TR
repository: https://github.com/TriliumNext/Trilium
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/eliandoran
dripsEligible: false
nixosModule: services.trilium-server
managedHosting: false
screenshot:
  src: trilium-notes.webp
  alt: "Trilium Notes desktop interface showing its built-in demo knowledge base"
  width: 1600
  height: 1187
  credit: Trilium Notes
  sourceUrl: https://github.com/TriliumNext/Trilium/blob/849f6042766c23b2804716f3da80aebb422ea242/apps/website/public/screenshot_desktop_linux_light.webp
  license: AGPL-3.0
  captionNote: "Project-published demo image. Screenshot version not recorded."
---

Trilium Notes organizes a large personal knowledge base as a tree of rich-text
and code notes. A note can appear in more than one place; links, attributes,
search and revisions help connect the information without duplicating it.
Desktop apps can sync with a self-hosted server.

This is a structured note database, not a directory of Markdown files.
Plan exports and backups before depending on it, and check version
compatibility before upgrading a server that syncs with desktop clients.

## Quick start

*Checked against the official docs on November 9, 2026.*

Docker and the desktop app are upstream-documented routes. The NixOS module
is maintained in nixpkgs and may package a different version than the pinned
Docker example.

### Docker Compose

Requires Docker and the Compose plugin. This adapts the official server
example to localhost and pins the researched release rather than `latest`.
Save as `compose.yaml`:

```yaml
services:
  trilium:
    image: triliumnext/trilium:v0.107.0
    ports:
      - "127.0.0.1:8080:8080"
    volumes:
      - ./trilium-data:/home/node/trilium-data
    restart: unless-stopped
```

Run `docker compose up -d`, open http://localhost:8080 on the host, and follow
the setup wizard. The mounted data directory must be writable by the
container. Back up `trilium-data` and test a restore before entrusting it with
your only copy of important notes.

For remote clients, follow upstream's HTTPS/reverse-proxy and sync guidance.
Keep server and desktop versions compatible. Review release notes and backups
before changing the pinned version; an automatic `latest` update can create
an unwanted sync mismatch.

### Desktop app

Download the appropriate app from the official [release
page](https://github.com/TriliumNext/Trilium/releases/tag/v0.107.0).
You can use Trilium locally without deploying a server first. A server is
useful when you want browser access or synchronization, not a prerequisite
to trying the editor.

### NixOS

```nix
services.trilium-server.enable = true;
```

Run `sudo nixos-rebuild switch`, then open http://localhost:8080 on the host
and follow the setup wizard. The module listens on localhost by default
(`services.trilium-server.host`) and keeps data in `/var/lib/trilium`; back
it up and test a restore before trusting it with important notes.

## Why it's listed

A rich, linked notebook for a substantial personal knowledge base. Its
hierarchy and database model offer a different tradeoff from SilverBullet's
plain-file approach.

## Documentation

- [Documentation](https://docs.triliumnotes.org/)
- [Docker installation](https://docs.triliumnotes.org/user-guide/setup/server/installation/docker)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/web-apps/trilium.nix)
- [Project and desktop downloads](https://github.com/TriliumNext/Trilium)
