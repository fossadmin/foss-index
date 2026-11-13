---
title: Warpgate
description: Self-hosted smart bastion for SSH, HTTPS, MySQL and PostgreSQL - record sessions and stop handing out target credentials.
category: Security
tags:
- Self-hosted
icon: warpgate.svg
iconLink: https://warpgate.null.page/
mark: WG
repository: https://github.com/warp-tech/warpgate
license: Apache-2.0
funding:
  githubSponsors: https://github.com/sponsors/eugeny
  openCollective: https://opencollective.com/tabby
nixosModule: services.warpgate
screenshot:
  src: warpgate-source.webp
  alt: "Terminal showing an SSH connection through Warpgate selecting a target, verifying the host key and landing on the remote shell"
  width: 1566
  height: 824
  credit: Warpgate contributors
  sourceUrl: https://github.com/warp-tech/warpgate/blob/main/README.md
  license: Apache-2.0
  captionNote: "Official README screenshot of an SSH session through Warpgate; not our install."
---

Warpgate is an Apache-2.0 smart bastion host: instead of handing every
admin the credentials for every server, you point SSH, HTTPS, MySQL and
PostgreSQL clients at Warpgate, and it authenticates the user, checks their
roles and connects them to the targets they may reach - with session
recording and a web admin UI. Targets keep no per-user keys or passwords of
their own.

The project's own FUNDING.yml directs support to its author's GitHub
Sponsors and Ko-fi, and to the Tabby Open Collective (the author's other
project); there is no Warpgate-named collective. Warpgate is the name and
mark of the project. This is an independent listing, not an official
Warpgate resource or an endorsement.

## Quick start

*Researched from Warpgate's documentation and releases on November 12,
2026. We have not installed or run it.*

### Docker (upstream's documented route)

The project documents a Docker setup:

```sh
docker run -d --name warpgate \
  -p 2222:2222 -p 8888:8888 \
  -v warpgate-data:/data \
  ghcr.io/warp-tech/warpgate:latest
warpgate setup
```

The interactive `warpgate setup` (run inside the container) sets the admin
password and listen ports. Port 2222 serves SSH, 8888 the web admin and
HTTPS targets; keep the admin UI on a trusted network. Binary releases for
Linux are published per release as an alternative.

### NixOS

```nix
services.warpgate = {
  enable = true;
};
```

Apply with `sudo nixos-rebuild switch`, then run the interactive setup and
register your targets and users.

## First use

Add one target and one test user, connect with
`ssh user:target@warpgate-host -p 2222`, and confirm the session appears in
the admin UI's recording list before migrating real access. Back up
Warpgate's data directory - it holds the host keys and credential store
your targets now trust.

## Documentation

- [Warpgate](https://warpgate.null.page/)
- [GitHub repository and releases](https://github.com/warp-tech/warpgate)
