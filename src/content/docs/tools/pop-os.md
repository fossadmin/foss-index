---
title: "Pop!_OS"
description: "Ubuntu-based desktop Linux from System76 with its own COSMIC desktop."
category: Operating systems
icon: pop-os.svg
mark: PO
repository: https://github.com/pop-os/pop
license: Per-package licenses
funding:
  custom:
    - label: "Support Pop!_OS and COSMIC"
      url: https://system76.com/donate/
screenshot:
  src: pop-os-24.04-default-desktop.webp
  alt: "Pop!_OS 24.04 LTS COSMIC desktop with the default nebula wallpaper and the dock"
  width: 1280
  height: 720
  credit: "System76"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Pop!_OS_24.04_LTS_default_desktop_-_English.png
  license: "GPL-3.0-or-later"
  commons: true
  captionNote: "Pop!_OS 24.04 LTS default COSMIC desktop. Not our install."
---

Pop!_OS is an Ubuntu-based distribution from System76, built around
COSMIC, the company's own desktop environment with optional auto-tiling.
It ships in two images: standard, and one with NVIDIA drivers for newer
GeForce cards.

Like its Ubuntu base, Pop!_OS is an aggregate of packages under their own
licenses. System76's own components are open source - the COSMIC
desktop's compositor and file manager, for example, are GPL-3.0.

## Quick start

*Checked against the project's documentation on November 10, 2026. We have
not run these steps ourselves.*

### Get the image

Download from https://system76.com/pop/download: the standard image, or
the NVIDIA image for GeForce 16-series and newer. The page lists a SHA256
checksum; System76's live-disk guide shows how to verify it with
sha256sum, shasum or CertUtil. Disable Secure Boot before installing.

### Write it to a USB stick

Follow System76's live-disk guide to write the ISO to a USB stick. The
stick is erased in the process; back up first. The install guide asks for
4 GB of RAM (8 GB recommended) and 20 GB of disk space.

### Try it, then install

Boot from the USB through the firmware boot menu (Esc on System76 Open
Firmware laptops; the key varies elsewhere). Choose "Try Demo Mode" for
the live session, or "Clean Install", the recommended route for new
users, which erases the drive. "Custom (Advanced)" opens GParted for
dual-boot setups.
