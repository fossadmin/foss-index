---
dripsEligible: false
title: openSUSE
description: Community Linux distributions with rolling Tumbleweed and regular-release
  Leap choices.
category: Operating systems
icon: opensuse.svg
iconLink: https://www.opensuse.org/
mark: OS
repository: https://build.opensuse.org/
license: Per-package licenses
screenshot:
  src: opensuse-source.webp
  alt: openSUSE Tumbleweed KDE Plasma 6 desktop in dark mode with its application
    menu open
  width: 1366
  height: 768
  credit: VulcanSphere
  sourceUrl: https://commons.wikimedia.org/wiki/File:KDE_Plasma_6_screenshot_(openSUSE_dark_mode).png
  license: GPL-2.0-or-later
  commons: true
  captionNote: March 2024 Tumbleweed / Plasma 6 screenshot. An older example of one
    desktop choice, not the current installer and not our install.
---

openSUSE is a community project with several Linux distributions. **Tumbleweed**
is the rolling-release choice; **Leap** uses regular releases. This listing
keeps those identities separate instead of assigning one version number to
all of openSUSE.

Like other Linux distributions, the complete system has per-package licenses,
not a single code license. Repositories can offer software with different
licensing or firmware terms; check the packages you choose.

## Quick start

*Researched against project documentation on November 11, 2026. We have not
booted an image or run the installer as part of this listing.*

### Tumbleweed

1. Open [the official Tumbleweed page](https://get.opensuse.org/tumbleweed/).
   Choose the **Offline Image** matching your computer's architecture. A Network
   Image downloads selected packages during installation and needs internet.
2. Download its checksum and signature files too. Follow the project's
   [verification instructions](https://en.opensuse.org/SDB:Download_help#Checksums) before using the image. A matching checksum alone
   is not proof of authenticity if it came from the same compromised mirror.
3. Follow the project's [USB image-writing guide](https://en.opensuse.org/SDB:Live_USB_stick)
   to write the ISO to a spare USB drive. This erases
   the USB drive: check the selected device carefully. Back up the computer
   before installing; a virtual machine is a safer first look.
4. Boot the USB from the firmware boot menu and start **Installation**. Choose
   language, keyboard, network and desktop/system role. Review the disk and
   partition summary before committing any changes; installation can erase data.
5. Create your local user, complete installation, remove the USB when prompted
   and boot the installed system. On Tumbleweed, use `sudo zypper dup` for normal
   distribution updates after reviewing the proposed changes.

### Leap

Choose [Leap from the official selector](https://get.opensuse.org/leap/) if you
prefer a regular-release system. Read the release-specific requirements and
installation guide there: Leap and Tumbleweed do not necessarily use the same
installer or upgrade process. Verify the image, write a spare USB, boot it and
review the disk changes before installation. Follow Leap's own update guidance,
not Tumbleweed's `zypper dup` instructions by default.

## First use

Open a browser and check networking, then update the new system before moving
important work onto it. Desktop screenshots show only one available desktop;
KDE Plasma is not the only choice. This is a full operating system, not an app
to install into NixOS, so it has no NixOS Quick start tab.

The recorded-release box identifies the rolling Tumbleweed track, not a
specific downloaded snapshot. Check the download page for the current image.

## Documentation

- [Download selector](https://get.opensuse.org/)
- [Tumbleweed installation guide](https://en.opensuse.org/openSUSE:Tumbleweed_installation)
- [Tumbleweed portal](https://en.opensuse.org/Portal:Tumbleweed)
- [Trademark guidelines](https://en.opensuse.org/openSUSE:Trademark_guidelines)
