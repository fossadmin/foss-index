---
title: "Debian"
description: "Community-built universal operating system, the base for many other distributions."
category: Operating systems
icon: debian.svg
mark: DE
repository: https://sources.debian.org
license: Per-package licenses
funding:
  custom:
    - label: "Donate to Debian"
      url: https://www.debian.org/donations
screenshot:
  src: debian-13-gnome.webp
  alt: "Debian 13 GNOME overview with a terminal showing system details and a browser open on debian.org"
  width: 1280
  height: 720
  credit: "The Debian Project"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Debian_13_(Trixie)_screenshot_-_using_GNOME_desktop.png
  license: "GPL-2.0-or-later"
  commons: true
  captionNote: "Debian 13 (trixie) GNOME overview published by the project. It was captured in a VMware virtual machine and shows a demo user session, not our install."
---

Debian is one of the oldest Linux distributions and the base for many
others, including Ubuntu and Linux Mint. It is built by volunteers under
the Debian Social Contract, and its stable releases favor reliability over
novelty.

There is no single Debian license: the system is thousands of packages,
each under its own free license that meets the Debian Free Software
Guidelines. Official installer images can include non-free firmware,
installed only when your hardware needs it.

## Quick start

*Checked against the project's documentation on November 10, 2026. We have
not run these steps ourselves.*

### Get the image

New to Debian? Choose a live image (GNOME, KDE or Xfce) from
https://www.debian.org/CD/live/ - it runs from a USB stick without touching
your disk, and its installer can install what you just tried. The smaller
netinst image is the classic installer, but it needs an internet connection
during setup.

Verify the download against the signed checksum files next to the images:
https://www.debian.org/CD/verify.

### Write it to a USB stick

Debian's CD FAQ points Windows users to balenaEtcher or USBImager: pick the
ISO, pick the USB drive, flash. The stick is erased in the process, and a
raw `cp` of the ISO to the wrong device can wipe a disk, so leave that
method to the installation guide.

### Try it, then install

Boot from the USB through your firmware's boot menu (often F12, F11 or
Esc). The live session runs entirely from the stick; start the installer
from the desktop when you are ready. Back up anything you need first - the
installation guide's early chapters have a checklist.
