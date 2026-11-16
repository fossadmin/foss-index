---
title: Zigbee2MQTT
description: Connect supported Zigbee devices to your own MQTT broker instead of a vendor hub.
added: 2026-11-15
category: Home automation
tags:
- Self-hosted
icon: zigbee2mqtt.png
mark: Z2
repository: https://github.com/Koenkk/zigbee2mqtt
license: GPL-3.0
managedHosting: false
funding:
  githubSponsors: https://github.com/sponsors/Koenkk
screenshot:
  src: zigbee2mqtt.webp
  alt: "Zigbee2MQTT frontend device list showing example lights, buttons and sensors from several manufacturers"
  width: 1280
  height: 800
  credit: Zigbee2MQTT frontend contributors
  own: true
  version: "Frontend 0.9.21"
  captionNote: "The default frontend's own mock-data development mode, captured locally. These are upstream example devices, not a connected Zigbee network or FOSSadmin customer equipment."
---

Zigbee2MQTT links a supported Zigbee coordinator to an MQTT broker. Lights,
buttons and sensors can then work together across manufacturers, without
requiring each manufacturer's own hub. Home Assistant can discover its
devices through the MQTT integration.

It needs more than software: check both the coordinator and every device
against the project's compatibility lists. A Zigbee logo alone does not
guarantee that a particular model or firmware revision will work.

## Quick start

*Researched from the project's documentation on November 15, 2026.*

### Docker

Before starting, have an MQTT broker and a
[supported coordinator](https://www.zigbee2mqtt.io/guide/adapters/) ready.
The [official Docker guide](https://www.zigbee2mqtt.io/guide/installation/02_docker.html)
uses `ghcr.io/koenkk/zigbee2mqtt`, maps persistent `data` to `/app/data`,
exposes port 8080 for onboarding/the frontend, and passes the adapter into
the container.

1. Find your adapter's stable `/dev/serial/by-id/` path on the Linux host.
2. Use the command in the Docker guide, replacing its example adapter
   path and timezone with yours. Keep the `/app/data` mount persistent.
3. Open http://localhost:8080 and complete onboarding with the correct
   adapter settings and MQTT broker address. The broker must be reachable
   from inside the container; `localhost` there means the container.
4. Check the logs before allowing devices to join. Restrict frontend
   access to your trusted network and configure authentication before
   any wider exposure.

The Docker guide also has rootless Docker/Podman examples. Do not make a
container privileged merely to avoid identifying the right device and
permissions.

### Home Assistant app

Follow the [Home Assistant installation guide](https://www.zigbee2mqtt.io/guide/installation/03_ha_addon.html).
It links the app repository and explains the MQTT and adapter settings.
Stop any other integration using the same coordinator first: ZHA and
Zigbee2MQTT cannot both own one serial adapter at the same time.

## First steps

Turn on permit-join only while pairing, follow your device's documented
reset/pairing steps, then close joining again. Give devices useful names
and back up the whole data directory, including coordinator/network
state. Replacing a coordinator or losing those files can mean re-pairing
devices; treat a network migration as a separate plan.

## Why it's listed

It makes a mixed-brand Zigbee network practical with a local broker and
an inspectable bridge. It is a useful partner to Home Assistant, rather
than a replacement for the automation platform or the MQTT broker.

## Documentation

- [Getting started](https://www.zigbee2mqtt.io/guide/getting-started/)
- [Supported devices](https://www.zigbee2mqtt.io/supported-devices/)
- [Frontend settings](https://www.zigbee2mqtt.io/guide/configuration/frontend.html)
- [Source](https://github.com/Koenkk/zigbee2mqtt)
