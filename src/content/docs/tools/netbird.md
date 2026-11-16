---
title: NetBird
description: WireGuard-based private network that connects your machines and self-hosted services without port forwarding.
added: 2026-11-08
category: Networking
tags:
- Self-hosted
- NixOS module
- VPN
icon: netbird.svg
mark: NB
repository: https://github.com/netbirdio/netbird
license: BSD-3-Clause / AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/netbirdio
dripsEligible: true
nixosModule: services.netbird.server
managedHosting: true
screenshot:
  src: netbird.webp
  alt: "NetBird admin dashboard listing six peers with names, overlay addresses, last-seen times and client versions"
  width: 1024
  height: 481
  credit: NetBird
  sourceUrl: https://github.com/netbirdio/docs/blob/995c90990139ba39eac9a49c344f76dc2cf468af/public/docs-static/img/manage/peers/add-machines-to-your-network/peer-list.png
  license: BSD-3-Clause / AGPL-3.0
---

NetBird builds a private network between your machines over WireGuard.
Once a laptop, a home server and a cloud VM join, they reach each other
directly by name, wherever they are, with no open ports or port forwarding
on any router. An admin dashboard manages peers, groups, access rules,
DNS and routes to whole networks through a routing peer.

The client and most of the codebase are published under the BSD-3-Clause
license; the self-hosted server components (management, signal, relay and
the combined deployment) are AGPL-3.0. NetBird Cloud is the company's
managed version for anyone who would rather not run the control plane.

## Quick start

*Verified against NetBird's own documentation on November 8, 2026.*

Unlike most tools here, a NetBird control plane has to be publicly
reachable: peers, TLS and relay traffic expect a real domain and open
ports. Upstream's supported self-host route is its installer script on a
public VM (at least 1 CPU and 2 GB RAM) with a domain pointing at it and
TCP ports 80 and 443 plus UDP 3478 open:

```sh
curl -fsSL https://github.com/netbirdio/netbird/releases/latest/download/getting-started.sh | bash
```

The script asks which reverse proxy to use (Traefik by default, with
options for an existing Traefik, Nginx, Nginx Proxy Manager or an external
Caddy) and generates a `docker-compose.yml` plus config files you manage
with `docker compose` afterwards. When it finishes, open
https://netbird.example.com (your domain) and create the first admin
account on the `/setup` page, which only exists until the first user does.

### NixOS

nixpkgs ships a full server stack module:

```nix
services.netbird.server = {
  enable = true;
  domain = "netbird.example.com";
  enableNginx = true;
};
```

Run `sudo nixos-rebuild switch`, then create the admin account at your
domain. The module enables the dashboard, management API and signal
service together; relay and coturn options live under the same
`services.netbird.server` namespace. Machines that only join a network
need the client instead, `services.netbird`.

## Why it's listed

Every tool in this directory needs a safe way to be reached from outside
your network. NetBird provides that path without exposing ports to the
internet, and its self-hosted control plane keeps the whole setup in your
own hands.

## Documentation

- [Self-hosting quickstart](https://docs.netbird.io/selfhosted/selfhosted-quickstart)
- [How NetBird works](https://docs.netbird.io/about-netbird/how-netbird-works)
- [NixOS module source](https://github.com/NixOS/nixpkgs/tree/master/nixos/modules/services/networking/netbird)
