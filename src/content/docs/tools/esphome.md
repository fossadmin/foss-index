---
title: ESPHome
description: Build local firmware for sensors, switches and other small smart-home devices from YAML.
added: 2026-11-15
category: Home automation
tags:
- Self-hosted
icon: esphome.svg
mark: ES
repository: https://github.com/esphome/esphome
license: MIT / GPL-3.0
managedHosting: false
screenshot:
  src: esphome.webp
  alt: "ESPHome Device Builder dashboard with one example living-room sensor configuration and its edit, install and log controls"
  width: 1280
  height: 800
  credit: ESPHome
  own: true
  version: "Device Builder 1.28.1 / ESPHome 2026.10.2"
  captionNote: "Local Device Builder with an example YAML configuration, no physical device attached. The Unknown badge is the device's connection state, not a live sensor reading."
---

ESPHome turns a YAML configuration into firmware for small devices such as
ESP32 boards. Describe the inputs, outputs and sensors you want, compile
the firmware, then install it on compatible hardware. It works with Home
Assistant and can also expose devices through MQTT.

The code has split licensing, not a choice between two licenses: Python
and most other files are MIT; C/C++ runtime files are GPLv3. The separate
[Device Builder](https://github.com/esphome/device-builder) dashboard is
Apache-2.0. Hardware still matters: a board being supported does not mean
an arbitrary commercial device is safe or possible to reflash.

## Quick start

*Researched from the project's documentation on November 15, 2026.*

### Home Assistant app

The official [getting-started guide](https://esphome.io/guides/getting_started_hassio/)
walks through adding ESPHome Device Builder in Home Assistant. Install the
app, start it and open its web interface. Create a device configuration
for your exact board. The first installation often needs a USB connection;
subsequent updates can use the network once the device is configured.

Do not open mains-powered equipment or assume a product can be reflashed
without checking its hardware and the project's guidance first.

### Python

For a standalone dashboard, the [Device Builder README](https://github.com/esphome/device-builder#standalone-pypi)
uses a virtual environment and the extra that installs ESPHome itself.
Use a supported Python version (ESPHome 2026.10.2 requires Python 3.12-3.14):

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install 'esphome-device-builder[esphome]'
mkdir -p esphome-configs
esphome-device-builder --host 127.0.0.1 ./esphome-configs
```

Open http://localhost:6052. The loopback binding keeps this standalone
dashboard on your computer. It is not authenticated by default; do not
expose it to a network without setting up authentication and checking the
project's deployment guidance. The old `esphome dashboard` command has
been removed from current ESPHome releases.

## First steps

Choose the exact board in Device Builder, then add only the components
that match your hardware. Validate the configuration before compiling.
Back up the YAML and its local secrets file. Keep Wi-Fi credentials out
of shared snippets and repositories. Confirm the target device before
installing firmware: flashing replaces what is on that device.

## Why it's listed

It is a way to build smart-home devices whose behavior you can inspect
and change, with local Home Assistant integration instead of a required
vendor cloud. It is a firmware tool, not a promise that every retail
smart-home device can be made cloud-free.

## Documentation

- [Project documentation](https://esphome.io/)
- [Device Builder](https://github.com/esphome/device-builder)
- [Source and license](https://github.com/esphome/esphome)
