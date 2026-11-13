---
title: Technitium DNS Server
description: Self-hosted recursive DNS server with ad blocking, DNS-over-HTTPS and DNS-over-TLS, a web console and clustering support.
category: Infrastructure
tags:
- Self-hosted
icon: technitium.png
iconLink: https://technitium.com/dns/
mark: TE
repository: https://github.com/TechnitiumSoftware/DnsServer
license: GPL-3.0
funding:
  custom:
    - label: "Support on Patreon"
      url: https://www.patreon.com/technitium
nixosModule: services.technitium-dns-server
screenshot:
  src: technitium-source.webp
  alt: "Technitium DNS Server web dashboard with a line chart of query volume and stat tiles for total queries, blocked queries and cache hit rate"
  width: 1522
  height: 980
  credit: Technitium
  sourceUrl: https://technitium.com/dns/ScreenShot1.png
  license: GPL-3.0
  captionNote: "Official product screenshot linked from the project's own README; not our install."
---

Technitium DNS Server is a GPLv3 recursive and authoritative DNS server for
your own network, written in .NET and run through a web console. It blocks
ads and trackers at the DNS level, speaks DNS-over-HTTPS, DNS-over-TLS and
DNS-over-QUIC, and can run primary and secondary zones with clustering. It
overlaps with Pi-hole and AdGuard Home but also aims to be a full
authoritative server, not only a filter.

Technitium is the name and mark of the project. This is an independent
listing, not an official Technitium resource or an endorsement.

## Quick start

*Researched from Technitium's documentation and GitHub releases on November
12, 2026. We have not installed or run it.*

### Linux

The project's documented install route is its install script, which sets up
the .NET runtime and a systemd unit:

```sh
curl -sSL https://download.technitium.com/dns/install.sh | sudo bash
```

If you prefer not to pipe a script, the same page documents manual tar.gz
installation and a Docker image (`technitium/dns-server`). The web console
listens on port 5380 by default; open `http://<server-ip>:5380/` from a
trusted LAN device, set the admin password on first login, then configure
forwarders or root recursion and any block lists. Keep the console off the
public internet. DNS itself listens on port 53, so free it from any existing
resolver (such as systemd-resolved) first.

### NixOS

```nix
services.technitium-dns-server = {
  enable = true;
  openFirewall = true;
};
```

Apply with `sudo nixos-rebuild switch`. The module runs the server and its
web console; finish setup through the console as above and review the
module's firewall option against your own interface rules.

## First use

Point one test device at the server for DNS and watch the dashboard's query
log before changing router-wide settings. Add block lists gradually and
check the cache and stats tiles. Back up the server's configuration folder
once your zones and settings are stable.

## Documentation

- [Technitium DNS Server](https://technitium.com/dns/)
- [GitHub repository and releases](https://github.com/TechnitiumSoftware/DnsServer)
- [Install instructions](https://github.com/TechnitiumSoftware/DnsServer/blob/master/DnsServerApp/install.sh)
