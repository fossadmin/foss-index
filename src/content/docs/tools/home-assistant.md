---
title: Home Assistant
description: Connect devices and automate your home through one locally controlled hub.
category: Home automation
tags:
- Self-hosted
icon: home-assistant.png
mark: HA
repository: https://github.com/home-assistant/core
license: Apache-2.0
funding:
  custom:
    - label: Open Home Foundation support options
      url: https://www.openhomefoundation.org/structure/
dripsEligible: false
nixosModule: services.home-assistant
managedHosting: false
screenshot:
  src: home-assistant.webp
  alt: "Home Assistant official overview image showing energy, floorplan and dashboard examples"
  width: 1331
  height: 581
  credit: Home Assistant
  sourceUrl: https://github.com/home-assistant/core/blob/02035d3a159494266b282c8f5c5d159f1eedaf28/.github/assets/screenshot-states.png
  license: Apache-2.0
  captionNote: "Project-published demo image, not our install. Screenshot version not recorded."
---

Home Assistant connects compatible devices and services, then lets you build
dashboards and automations around them. It favors local control where devices
and integrations support it. Some integrations still depend on vendor clouds;
check each device rather than assuming every connection works offline.

It can become part of the household's daily routine, so backups, update
planning and recovery matter. Keep safety-critical controls usable without
an automation server. Home Assistant Cloud is optional and helps fund the
project through Nabu Casa and the Open Home Foundation.

## Quick start

*Checked against the official Linux installation guide on November 9, 2026.
We have not run these setups ourselves.*

Home Assistant OS is upstream's recommended install for most users. The
Container route below is for people comfortable managing Linux and Docker;
it does not include the apps/add-ons managed by Home Assistant OS. The NixOS
module is maintained in nixpkgs; upstream explicitly does not support that
installation method.

### Docker Container on Linux

Requires Linux and Docker Engine, not Docker Desktop. Save as `compose.yaml`
in a new directory and set `TZ` to your own IANA timezone:

```yaml
services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    environment:
      TZ: America/Los_Angeles
    network_mode: host
    privileged: true
    restart: unless-stopped
```

Run `docker compose up -d`, then open http://localhost:8123 on the Linux host
or `http://HOST-IP:8123` from another device on the same trusted network.
Complete onboarding and add a few compatible devices. Back up `config` and
use Home Assistant's backup tools before upgrades.

This follows upstream's host networking and privileged container settings.
It is **not localhost-isolated**: the web UI can be reachable on your LAN.
Review these broad permissions, protect your network and do not port-forward
8123 to the internet. Bluetooth can also require a read-only D-Bus mount;
follow the official guide if you need it. Remote access needs a separate,
secure configuration, not a public port on this starter.

### Home Assistant OS

Follow the official [Linux VM installation
guide](https://www.home-assistant.io/installation/linux) for Home Assistant OS,
or choose the appropriate hardware guide linked there. OS manages the
system and apps/add-ons for you; Container leaves that work to you. Choose
the install method before investing time in integrations that require apps.

### NixOS

Upstream explicitly does not support running Home Assistant this way; report
module problems to nixpkgs, not the project.

```nix
services.home-assistant = {
  enable = true;
  config = {
    default_config = { };
  };
};
# Only for access from other devices on a trusted LAN:
# networking.firewall.allowedTCPPorts = [ 8123 ];
```

Run `sudo nixos-rebuild switch`, then open http://localhost:8123 on the host
and complete onboarding. The instance binds all interfaces on port 8123 by
default; do not port-forward 8123 to the internet. Configuration and state
live in `/var/lib/hass`; back it up before upgrades. Add integrations through
`services.home-assistant.extraComponents` so their dependencies are packaged.

## Why it's listed

One place to connect a mixed smart home without making a single device
vendor the center of everything. Start with a small, reversible automation
before trusting it with important household routines.

## Documentation

- [Linux: OS and Container installation](https://www.home-assistant.io/installation/linux)
- [Documentation](https://www.home-assistant.io/docs/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/home-automation/home-assistant.nix)
- [Foundation funding and support options](https://www.openhomefoundation.org/structure/)
