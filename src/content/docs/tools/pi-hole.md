---
dripsEligible: false
title: Pi-hole
description: Network-wide DNS filtering for ads and trackers, with a local administration
  dashboard.
added: 2026-11-12
category: Networking
tags:
- Self-hosted
- NixOS module
- DNS
icon: pihole.svg
mark: PH
repository: https://github.com/pi-hole/pi-hole
license: EUPL-1.2
managedHosting: true
nixosModule: services.pihole-ftl
funding:
  custom:
  - label: Donate to Pi-hole
    url: https://pi-hole.net/donate/#donate
screenshot:
  src: pi-hole-source.webp
  alt: "Pi-hole v6 web dashboard with query totals, blocked-share cards, query and client activity charts, and query-type and upstream-server doughnuts"
  width: 1250
  height: 1064
  credit: Pi-hole
  sourceUrl: https://github.com/pi-hole/graphics/blob/master/Screenshots/v6/v6_dashboard.png
  license: MIT
---

Pi-hole filters DNS requests for your network. Point devices at its DNS service
and it can block known advertising and tracking domains, including on devices
that cannot run browser extensions. It is not a firewall, VPN or a complete
replacement for browser content blocking. DNS filtering cannot distinguish an
advertisement from wanted content served from the same domain.

Core, FTL and the web interface currently publish EUPL-1.2 license texts.
Their notices preserve exceptions for older code; bundled components retain
their own licenses. Pi-hole is a registered trademark of Pi-hole, LLC. This
independent listing does not imply affiliation or endorsement.

## Quick start

*Researched against upstream documentation and nixpkgs sources on November 11,
2026. We have not installed Pi-hole or tested these configurations.*

### Docker Compose

Use a Linux host with a stable LAN address. Port 53 must be available; check
for an existing DNS resolver before starting. Save this as `compose.yaml`:

```yaml
services:
  pihole:
    image: pihole/pihole:2026.10.1
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "127.0.0.1:8080:80/tcp"
    environment:
      TZ: UTC
      FTLCONF_webserver_api_password: ${PIHOLE_PASSWORD:?Set a unique dashboard password}
      FTLCONF_dns_listeningMode: ALL
    volumes:
      - ./etc-pihole:/etc/pihole
    restart: unless-stopped
```

Put `PIHOLE_PASSWORD` in a local `.env` file and keep it out of Git. Start with
`docker compose up -d`. On the host open `http://127.0.0.1:8080/admin/` and sign in
with that password. For a headless server use an SSH tunnel rather than exposing
the admin port publicly. This example does not provide DHCP and does not need
the DHCP-specific `NET_ADMIN` capability.

Allow DNS port 53 only from your trusted LAN in the host firewall; do not forward
it from the internet or run an open resolver. Set one test device's DNS server
to the Pi-hole host's LAN address. Visit a few sites and check the dashboard's
query log before changing DNS for the whole network. Keep the old DNS settings
so you can undo the test.

### Linux

The native installer supports selected Linux distributions. Check the current
[supported operating systems and prerequisites](https://docs.pi-hole.net/main/prerequisites/)
first. Upstream documents a download-and-review route:

```sh
wget -O basic-install.sh https://install.pi-hole.net
# Read the script before running it with administrator privileges.
less basic-install.sh
sudo bash basic-install.sh
```

Follow the installer to select the interface, upstream resolver and blocklist.
Open the admin URL shown at completion, keep the generated password private,
and test one device before changing your router's DNS settings. Do not use the
mutable upstream installer on NixOS; use its modules instead.

### NixOS

The DNS engine and dashboard are separate modules. An isolated local test can
start with the dashboard bound to loopback and no firewall ports opened:

```nix
services.pihole-ftl = {
  enable = true;
  settings.dns = {
    listeningMode = "LOCAL";
    upstreams = [ "1.1.1.1" ];
  };
};
services.pihole-web = {
  enable = true;
  ports = [ "127.0.0.1:8080" ];
};
```

Check that another service is not using DNS port 53, rebuild with
`sudo nixos-rebuild switch`, then set a dashboard password with
`sudo pihole setpassword`. Open `http://127.0.0.1:8080/admin/`. Review and add your
chosen blocklists in the dashboard, then update gravity. Before using it from
other devices, deliberately configure its listening interface and allow DNS
only on the trusted LAN. No broad firewall openings are made in this example.

nixpkgs patches Pi-hole's update/reinstall commands out: upgrade through your
NixOS configuration. Check your channel for `services.pihole-ftl` and
`services.pihole-web`; older channels may not provide them.

## First use

Avoid a second unfiltered DNS server if you expect all device queries to be
filtered. Check IPv6 DNS and encrypted-DNS settings too: clients can bypass the
resolver you selected. DNS logs can reveal browsing patterns, so review privacy
and retention settings and do not expose the dashboard to the internet.

## Documentation

- [Docker configuration](https://docs.pi-hole.net/docker/)
- [Native installation](https://docs.pi-hole.net/main/basic-install/)
- [Post-install steps](https://docs.pi-hole.net/main/post-install/)
- [NixOS DNS module](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/services/networking/pihole-ftl.nix)
- [NixOS dashboard module](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/services/web-apps/pihole-web.nix)
