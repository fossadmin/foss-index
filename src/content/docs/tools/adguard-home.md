---
dripsEligible: false
title: AdGuard Home
description: Self-hosted network-wide DNS filtering for ads, trackers and unwanted
  domains.
category: Infrastructure
tags:
- Self-hosted
icon: adguard-home.png
mark: AG
repository: https://github.com/AdguardTeam/AdGuardHome
license: GPL-3.0
nixosModule: services.adguardhome
screenshot:
  src: adguard-home-source.webp
  alt: "AdGuard Home dashboard with DNS query totals, blocked counts, top clients and queried domains"
  width: 800
  height: 509
  credit: "the AdGuard Home README demo"
  sourceUrl: https://cdn.adtidy.org/public/Adguard/Common/adguard_home.gif
  captionNote: "Frame from the project's own README demo GIF on the official AdGuard CDN. It shows an old release (v0.1-era interface); the current interface differs. The project states no reuse terms for the image."
---

AdGuard Home is a GPLv3 DNS filtering server for your own network. It is separate
from AdGuard's paid browser/desktop apps and hosted AdGuard DNS service. DNS
filtering blocks domain lookups, not every advertisement inside an allowed
website or application. It is an alternative to Pi-hole, not another name for it.

## Quick start

*Researched against upstream getting-started instructions and pinned nixpkgs
sources on November 11, 2026. No software was installed or network DNS changed.*

### Linux

Download the release archive for your operating system and CPU from the
upstream releases page. Check its checksum and extract it. From that directory:

```sh
cd AdGuardHome
sudo ./AdGuardHome -s install
```

The service starts a setup wizard on port 3000. On the server itself open
`http://127.0.0.1:3000`. On a headless server, use a trusted LAN connection to
its port 3000 only while completing setup. Never expose the wizard to the
public internet. Confirm that port 53 is free before assigning it to the DNS
listener; another local resolver may already use it.

In the wizard, choose the web-admin listen address and port, create an admin
account and choose the DNS listening interfaces. Keep access on a trusted LAN.
Initially point only one test device at the server's LAN IP for DNS. Check the
query log and test ordinary websites before changing the router's DNS settings.

### NixOS

```nix
services.adguardhome = {
  enable = true;
  openFirewall = false;
};
```

Apply with `sudo nixos-rebuild switch`, then complete the setup wizard. Keeping
`openFirewall = false` does not configure a LAN firewall for you. The module's
firewall option only handles its web interface, not DNS. For LAN clients, open
TCP and UDP port 53 on your chosen LAN interface only, and permit the admin port
only from trusted devices. Check the module's mutable/declarative settings
before later managing the same configuration through both Nix and the UI.

## First use

Keep the server on a stable LAN address. Check upstream DNS and blocklists in
the UI, then verify a test client's queries appear in the query log. Back up the
configuration and note your previous router DNS settings before a network-wide
change. Do not enable DHCP unless you deliberately replace the network's
existing DHCP server. DNS filtering is not a VPN or a full security boundary.

## Container deployments

Upstream documents multiple port mappings for DNS, DHCP and encrypted DNS. They
are not interchangeable: DHCP needs host networking on supported Linux hosts,
and port 53 may conflict with an existing resolver. Follow the official Docker
guide for your actual interfaces rather than publish every example port. The
persistent paths are `/opt/adguardhome/work` and `/opt/adguardhome/conf`.
For a first lab, the Linux setup above has fewer network layers to diagnose.

## Documentation

- [Getting started](https://adguard-dns.io/kb/adguard-home/getting-started/)
- [Upstream release downloads](https://github.com/AdguardTeam/AdGuardHome/releases)
- [Official Docker guide](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/services/networking/adguardhome.nix)
