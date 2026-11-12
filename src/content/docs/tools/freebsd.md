---
dripsEligible: false
title: FreeBSD
description: Unix-like operating system with an integrated base system, jails and
  a large ports collection.
category: Operating systems
icon: freebsd.png
mark: FB
repository: https://github.com/freebsd/freebsd-src
license: BSD-2-Clause
funding:
  custom:
    - label: "Donate to FreeBSD"
      url: https://www.freebsd.org/donations/
screenshot:
  src: freebsd-source.webp
  alt: FreeBSD 14 text console after login, showing release details, documentation
    links and the shell prompt
  width: 720
  height: 400
  credit: MichiGreat
  sourceUrl: https://commons.wikimedia.org/wiki/File:FreeBSD_14_welcome_screen_after_login.png
  license: CC0-1.0
  captionNote: November 2023 FreeBSD 14.0 console, not the recorded 15.1 release or
    our install. This demonstrates the base console, not a default desktop.
  commons: true
---

FreeBSD is a Unix-like operating system, not a Linux distribution. Its integrated
base system includes the kernel and core utilities; applications are available
through packages and the ports collection. The core uses BSD-style terms,
including the FreeBSD two-clause license. Imported components and packages have
their own licenses, so the whole installation is not uniformly BSD-2-Clause.

FreeBSD is a registered trademark of The FreeBSD Foundation. This independent
listing does not imply affiliation or endorsement. A standalone logo is omitted
while permission for its commercial/marketing use remains unresolved.

## Quick start

*Researched against the FreeBSD Handbook and current release pages on November
11, 2026. We have not downloaded, booted or installed FreeBSD.*

### Isolated VM or spare computer

#### Get the image

Use [Getting FreeBSD](https://www.freebsd.org/where/) and choose a supported
production release for your hardware. The release page identified 15.1 as the
production release at our check; legacy releases have different support windows.
For a first test, use a virtual machine with a new empty disk rather than
replace your working system.

Download the installer image and verify its signed checksums using that
release's instructions. A `memstick` image is intended for writing to USB;
ISO images are useful for virtual optical drives. Confirm the architecture
matches your machine. Writing an image erases the target USB drive.

#### Install

Boot the installer and follow `bsdinstall`: select keymap, hostname, optional
components, target disk, networking, time zone and users. Automatic partitioning
can erase the selected disk. Check the target carefully and make a backup first.
Create a regular user and grant the documented administrative access only if
needed. Do not enable SSH for root or expose an unconfigured system publicly.

After installation, reboot and remove the installation media. A normal FreeBSD
base install starts at a console, not a graphical desktop. A desktop requires
additional packages and configuration from the Handbook.

## First use

Log in as your regular user. Check the installed version with `freebsd-version`
and consult the release-specific updating chapter before applying updates.
Use `man hier` to learn the filesystem layout and `man pkg` for package
management. On a new installation, `pkg` offers to bootstrap the package tool
when first used with administrative privileges. Review the package source,
permissions and service settings before installing or enabling applications.

## NixOS compatibility

FreeBSD is a separate operating system, not a NixOS module. Test it in a VM or on
separate hardware. Linux/NixOS service configuration is not a FreeBSD install
recipe; FreeBSD uses its own base tools and `rc.conf` service settings.

## Documentation

- [FreeBSD Handbook installation chapter](https://docs.freebsd.org/en/books/handbook/bsdinstall/)
- [Production and legacy release information](https://www.freebsd.org/releases/)
- [Getting FreeBSD](https://www.freebsd.org/where/)
- [FreeBSD copyright and license](https://www.freebsd.org/copyright/freebsd-license/)
- [Foundation trademark terms](https://freebsdfoundation.org/legal/trademark-usage-terms-and-conditions/)
