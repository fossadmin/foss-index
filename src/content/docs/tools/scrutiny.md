---
title: Scrutiny
description: Self-hosted S.M.A.R.T. hard-drive health monitoring with a web dashboard, collector agents and alerting.
category: Monitoring
icon: scrutiny.svg
iconDark: scrutiny-dark.svg
iconLink: https://github.com/AnalogJ/scrutiny
mark: SC
repository: https://github.com/AnalogJ/scrutiny
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/AnalogJ
nixosModule: services.scrutiny
screenshot:
  src: scrutiny-source.webp
  alt: "Scrutiny dashboard listing six drives with passed status, temperature, capacity and powered-on time"
  width: 1920
  height: 967
  credit: AnalogJ and Scrutiny contributors
  sourceUrl: https://github.com/AnalogJ/scrutiny/blob/master/docs/dashboard.png
  license: MIT
  captionNote: "Official dashboard screenshot from the project repository; not our install."
---

Scrutiny is an MIT-licensed web dashboard for hard-drive and SSD health. It
collects S.M.A.R.T. data from your drives through small collector agents,
keeps history, and surfaces failures, temperature and wear so a dying disk
is visible before it takes data with it. It wraps smartd/smartctl data in a
clearer interface rather than replacing the underlying tools.

The name and glasses logo belong to the project. This is an independent
listing, not an official Scrutiny resource or an endorsement.

## Quick start

*Researched from the Scrutiny repository and documentation on November 12,
2026. We have not installed or run it.*

### Docker (upstream's documented route)

The project documents an omnibus Docker image that runs the web server and
a collector together:

```sh
docker run -it --rm -p 8080:8080 \
  -v /run/udev:/run/udev:ro \
  --cap-add SYS_RAWIO \
  --device=/dev/sda \
  --name scrutiny \
  ghcr.io/analogj/scrutiny:master-omnibus
```

Pass each drive device you want monitored, or use the documented
hub-and-spoke layout where collectors on other machines report to one web
server. Open the dashboard on port 8080 from a trusted network.

### NixOS

```nix
services.scrutiny = {
  enable = true;
  openFirewall = false;
};
```

Apply with `sudo nixos-rebuild switch`. The module runs the web interface
and collector; check its settings for the listen port and inbound rules
before exposing it beyond localhost or a trusted LAN.

## First use

Confirm every drive you expect appears on the dashboard; missing disks
usually mean the collector lacks device access. Let it gather history
before trusting trends, and configure notifications (the project supports
several shoutrrr-style services) so alerts reach you without watching the
UI.

## Documentation

- [GitHub repository](https://github.com/AnalogJ/scrutiny)
- [Installation guides](https://github.com/AnalogJ/scrutiny/tree/master/docs)
