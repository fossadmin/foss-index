---
title: SilverBullet
description: A programmable Markdown knowledge base backed by files you can keep and move.
category: Notes
tags:
- Self-hosted
icon: silverbullet.png
mark: SB
repository: https://github.com/silverbulletmd/silverbullet
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/silverbulletmd
dripsEligible: false
nixosModule: services.silverbullet
managedHosting: false
screenshot:
  src: silverbullet.webp
  alt: "SilverBullet Markdown preview showing a sample photo-walk note"
  width: 1600
  height: 914
  credit: SilverBullet
  sourceUrl: https://github.com/silverbulletmd/silverbullet/blob/0fbe7b51a35fe3d1ef1fe0a4063448ae98b2e052/docs/Screenshots/markdown-basics-preview.png
  license: MIT
  captionNote: "Project-published demo image, not our install. Screenshot version not recorded."
---

SilverBullet is a browser-based knowledge base built around Markdown files,
links and queries. Its extension and scripting system can turn notes into
small personal workflows, while the underlying files remain yours to edit,
back up or move elsewhere.

It rewards people who like shaping their own workspace. A plain Markdown
note is easy to start with; deeper automation needs time to learn. Treat
installed extensions and scripts as code, not harmless formatting.

## Quick start

*Checked against upstream docs on November 9, 2026. We have not run these
setups ourselves.*

Docker is an upstream-documented route. The NixOS module is maintained in
nixpkgs and may package a different version.

### Docker Compose

Requires Docker and the Compose plugin. This follows the current official
image and data path, with a localhost-only port. Save as `compose.yaml`:

```yaml
services:
  silverbullet:
    image: ghcr.io/silverbulletmd/silverbullet:latest
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - ./data:/data
    restart: unless-stopped
```

Run `docker compose up -d`, then open http://localhost:3000 and complete the
server setup. The `data` directory holds the space's files; back it up before
upgrades. Review release notes before pulling a new image. The current image
includes a runtime and Chromium; do not assume old Deno-based tutorials still
match the current server.

Keep this local while getting started. For remote access, follow the official
server setup, authentication and HTTPS guidance before exposing it. Do not
publish a notes directory without deciding who may access it.

### NixOS

```nix
services.silverbullet.enable = true;
```

Run `sudo nixos-rebuild switch`, then open http://localhost:3000 and complete
the server setup. The module listens on localhost port 3000 by default
(`services.silverbullet.listenAddress` and `listenPort`) and keeps the space
in `/var/lib/silverbullet`; back it up before upgrades.

## Why it's listed

A file-based option for people who want more than a folder of notes but do
not want their knowledge base trapped in a hosted account. Trilium is the
alternative here when a rich hierarchical database is a better fit.

## Documentation

- [Install](https://docs.silverbullet.md/Install)
- [Current Docker instructions](https://github.com/silverbulletmd/silverbullet/blob/main/docs/Install/Docker.md)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/web-apps/silverbullet.nix)
- [Project source and documentation](https://github.com/silverbulletmd/silverbullet)
