---
title: "AlmaLinux OS"
description: "Community-owned, forever-free enterprise Linux distribution, compatible with RHEL and governed by its own foundation."
category: Operating systems
icon: almalinux.png
iconLink: https://almalinux.org/
mark: AL
repository: https://github.com/AlmaLinux
license: Per-package licenses
funding:
  githubSponsors: https://github.com/sponsors/AlmaLinux
screenshot:
  src: almalinux-source.webp
  alt: "AlmaLinux 9.3 default GNOME desktop with the AlmaLinux-branded wallpaper"
  width: 1689
  height: 894
  credit: "AlmaLinux OS Foundation"
  sourceUrl: https://commons.wikimedia.org/wiki/File:AlmaLinux_9.3_GNOME_default_desktop_-_English.png
  license: "GPL"
  commons: true
  captionNote: "AlmaLinux 9.3 default GNOME desktop from early 2024, not the current 10.2 or 9.8 releases or our install. Resized and recompressed to WebP."
---

AlmaLinux OS is an open-source, community-owned enterprise Linux distribution
built to be compatible with RHEL. It filled the gap left when CentOS Linux's
stable releases were discontinued. The AlmaLinux OS Foundation, a 501(c)(6)
non-profit, owns and manages the project, and its governing board is chosen
by foundation members.

Like other distributions, packages carry their own licenses; there is no
single license covering the complete OS. AlmaLinux and its logo are marks of
the AlmaLinux OS Foundation. This is an independent listing, not an official
AlmaLinux resource or an endorsement.

## Quick start

*Researched from AlmaLinux's download page and release notes on November 12,
2026. We have not downloaded, booted or installed an operating system.*

### Choose a release and image

Use the [official download page](https://almalinux.org/get-almalinux/). Two
branches are current: AlmaLinux OS 10 (10.2 at our check, active support to
May 2030) and AlmaLinux OS 9 (9.8 at our check, security support to May
2032). Each minor version reaches end of life when the next one ships, so
plan updates within your branch. Images cover x86_64 (including x86_64_v2),
aarch64, ppc64le and s390x, plus live media (GNOME, KDE, XFCE, MATE), cloud
and container images, Raspberry Pi and WSL.

### Verify and write

Download from a mirror listed on the official page and check the image
against the published checksums before writing it. Writing an ISO overwrites
the target USB drive: confirm the device and back up anything you need first.
Boot the USB and use the live environment or go straight to the installer.

### Install or migrate

The installer asks for language, storage and user setup; review the target
disk before continuing. To move an existing RHEL-family system instead of
reinstalling, the project's ELevate tooling supports in-place migration
between major versions - test it on a non-production machine first.

## First use

Check the installed release with `cat /etc/almalinux-release` and apply
updates with the system package manager. The project publishes errata,
OpenSCAP/OVAL data and a software bill of materials for security auditing.
Commercial support is available from foundation sponsors if a deployment
needs it.

## NixOS compatibility

AlmaLinux OS is an operating system, not a NixOS application or service. Try
it in a virtual machine or on separate hardware rather than expect a Nix
package to replace NixOS. Back up any system you intend to replace.

## Documentation

- [AlmaLinux OS downloads](https://almalinux.org/get-almalinux/)
- [Release notes and support windows](https://wiki.almalinux.org/release-notes/)
- [Sponsor the AlmaLinux OS Foundation](https://github.com/sponsors/AlmaLinux)
- [Project source (GitHub)](https://github.com/AlmaLinux)
