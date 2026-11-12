---
dripsEligible: false
title: "BlackArch"
description: "Arch-based penetration testing distribution with a rolling repository of more than 2,800 security tools, installable onto an existing Arch system."
category: Operating systems
icon: blackarch.png
iconLink: https://blackarch.org/
mark: BA
repository: https://github.com/BlackArch/blackarch
license: Per-package licenses
screenshot:
  src: blackarch-source.webp
  alt: "BlackArch 2020.12.01 desktop with the application menu open on security tool categories over a BlackArch wallpaper"
  width: 1920
  height: 1200
  credit: "BlackArch developers"
  sourceUrl: https://commons.wikimedia.org/wiki/File:BlackArch_Linux_2020.12.01_screenshot.png
  license: "GPL"
  commons: true
  captionNote: "BlackArch 2020.12.01 desktop, captured in 2020. Historical screenshot: current ISOs are 2023 snapshots and the tool repository is rolling. Not our install. Resized and recompressed to WebP."
---

BlackArch is an Arch Linux-based distribution for penetration testers and
security researchers, with a repository of more than 2,800 tools you can
install individually or by category. It also works as an unofficial repository
layer on top of an existing Arch installation. Use its security tools only on
systems you own or have explicit permission to test.

There is no single license for the whole distribution: each packaged tool
carries its own license. The BlackArch integration repository itself is
published under a BSD 3-clause license. BlackArch and its sword-and-arch logo
are marks of the project. This is an independent listing, not an official
BlackArch resource or an endorsement. We found no donation route on the
project's site; the support section points to the source instead.

## Quick start

*Researched from BlackArch's downloads page and installation notes on
November 12, 2026. We have not downloaded, booted or installed an operating
system.*

### Choose an install route

The [official downloads page](https://blackarch.org/downloads.html) offers
full, slim and netinstall ISOs plus an OVA for virtual machines. The project
itself discourages the full ISO (it targets offline installs and is prone to
conflicts on update) and recommends the netinstall ISO to install only what
you need, or the slim ISO for a minimal common toolset. The ISOs are 2023
snapshots while the package repository is rolling, so plan to update right
after install.

### Verify and write

Check your download against the SHA1 sums published beside each image before
writing. Write the ISO with `dd` or an equivalent tool - the project warns
against UNetbootin because it modifies the bootloader configuration. Writing
overwrites the target USB drive: confirm the device and back up first. The
default login on the ISOs and OVA is `root:blackarch`.

### Or layer onto Arch

On an existing Arch system, the documented route is the project's `strap.sh`
bootstrap script: download it, verify its published SHA1 sum, run it as root,
then install tool groups with `pacman`. Only run a bootstrap script you
fetched from the official site and verified.

## First use

Update with `pacman -Syu` immediately - a 2023 ISO against a rolling
repository means a large first update. List tool categories with
`pacman -Sgg | grep blackarch` and install only what you will actually use.

## NixOS compatibility

BlackArch is an operating system and an Arch repository, not a NixOS
application or service. Try it in a virtual machine or on separate hardware;
individual security tools may exist in nixpkgs independently. Back up any
system you intend to replace.

## Documentation

- [BlackArch downloads](https://blackarch.org/downloads.html)
- [BlackArch guide](https://blackarch.org/guide.html)
- [Project source (GitHub)](https://github.com/BlackArch/blackarch)
