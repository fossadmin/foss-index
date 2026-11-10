---
title: "Linux Mint"
description: "Friendly, familiar desktop Linux with the Cinnamon desktop, based on Ubuntu and Debian."
category: Operating systems
icon: linux-mint.svg
mark: MI
repository: https://github.com/linuxmint
license: Per-package licenses
funding:
  custom:
    - label: "Donate to Linux Mint"
      url: https://linuxmint.com/donors.php
screenshot:
  src: mint-22.3-cinnamon.webp
  alt: "Linux Mint 22.3 Cinnamon desktop in a live session with the application menu open"
  width: 1280
  height: 800
  credit: "Linux Mint"
  sourceUrl: https://linuxmint.com/pictures/screenshots/zena/cinnamon.png
  captionNote: "Linux Mint 22.3 live session with the Cinnamon menu open, from the project's screenshots page."
---

Linux Mint is a desktop-first distribution based on Ubuntu (itself based
on Debian). Its Cinnamon edition goes for a familiar layout: a start-style
menu, a taskbar and a system tray, plus its own update and driver tools.

Mint licenses its own components under the GPL and says the vast majority
of what it ships is free and open source. Proprietary drivers are not
installed by default, and multimedia codecs are an opt-in checkbox during
installation.

## Quick start

*Checked against the project's documentation on November 10, 2026. We have
not run these steps ourselves.*

### Get the image

Download the Cinnamon edition from https://linuxmint.com/download.php, then
verify it: the installation guide covers checking the ISO with the mirror's
sha256sum.txt and its GPG signature
(https://linuxmint-installation-guide.readthedocs.io/en/latest/verify.html).

### Write it to a USB stick

On Mint, right-click the ISO and choose "Make Bootable USB Stick".
Elsewhere, balenaEtcher works: select image, select drive, flash. The
stick is erased in the process.

### Try it, then install

Boot from the USB into the live session (user "mint"; changes there are
not saved), then start "Install Linux Mint" from the desktop. After
installing, open Driver Manager first, and add the multimedia codecs later
if you want them.

One caution: 22.3 ships the HWE kernel 6.14, and the release notes point
VirtualBox users and owners of older NVIDIA cards (470 driver) to Mint
22.1 instead.
