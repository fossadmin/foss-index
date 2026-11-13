---
title: LubeLogger
description: Vehicle maintenance records and fuel-mileage tracking for your household.
category: Home
tags:
- Self-hosted
icon: lubelogger.png
mark: LL
repository: https://github.com/hargata/lubelog
license: MIT
funding:
  custom:
    - label: "Patreon"
      url: https://patreon.com/lubelogger
nixosModule: services.lubelogger
screenshot:
  src: lubelogger-service-records.webp
  alt: "LubeLogger service-records view for a demo vehicle, listing dated shop visits with odometer readings and costs"
  width: 1410
  height: 731
  credit: LubeLogger
  sourceUrl: https://github.com/hargata/lubelog/blob/main/docs/screenshots.md
  license: MIT
  captionNote: "Project sample screenshot from the LubeLogger README (demo data, demo vehicle)."
---

LubeLogger keeps a household's vehicle records in one place: service visits,
repairs, fuel fill-ups with mileage, odometer history and reminders. It is a
web app you host yourself, so the records stay on your own machine.

## Quick start

*Checked against the project's documentation on November 10, 2026. We have
not run this setup ourselves.*

### Docker Compose

The docs call Docker the most reliable channel. Save the compose file from
the repository (image `ghcr.io/hargata/lubelogger:latest`, port 8080, volumes
`data` and `keys`), then:

```bash
docker compose pull
docker compose up -d
```

Open http://localhost:8080. Keep the port bound to your own machine unless
you add authentication and a reverse proxy. Avoid the `:edge` image, which
the docs mark experimental.

### Linux, without Docker

Download `LubeLogger_vNNN_linux_x64.zip` from the latest release, extract it
and run `./CarCareTracker` (make it executable first, for example
`chmod u+x CarCareTracker` - the docs' `chmod 777` grants far more than
needed).


### Windows

Download the Windows zip from the latest release and run
`CarCareTracker.exe`.

### NixOS

```nix
services.lubelogger.enable = true;
```

## First steps

- Authentication is **off by default**. Before you expose LubeLogger beyond
  your own machine or invite anyone, open Settings, tick "Enable
  Authentication" and set the root user. New users join by invitation token
  (Admin Panel, Manage Tokens).
- Add a vehicle, then log a service record or a fill-up and set a reminder
  by date or odometer.
- Want a look first? The project runs a demo at https://demo.lubelogger.com
  that resets every 20 minutes.
