---
dripsEligible: false
title: Fedora®
description: Community Linux distribution with Workstation, Server and other focused
  editions.
added: 2026-11-12
category: Operating systems
mark: FE
repository: https://src.fedoraproject.org
license: Per-package licenses
icon: fedora.ico
screenshot:
  src: fedora-source.webp
  alt: Fedora 44 Workstation GNOME desktop with its default green landscape wallpaper
  width: 1920
  height: 1080
  credit: The Fedora Project; screenshot by Daichungus
  sourceUrl: https://commons.wikimedia.org/wiki/File:Fedora_44_Workstation.png
  license: GPL-2.0-or-later
  captionNote: May 2026 Fedora 44 desktop screenshot, not the current download channel
    or our install.
  commons: true
iconLink: https://fedoraproject.org/
---

Fedora is a community Linux distribution. Workstation provides the GNOME desktop;
Server, KDE Plasma, CoreOS and other editions serve different needs. This page
uses Workstation for a first desktop trial rather than treating all editions as
one install image. Packages use their own licenses; there is no single license
covering the complete distribution. Some hardware firmware has separate terms.

Fedora and the Infinity design logo are trademarks of Red Hat, Inc. This is an
independent listing, not an official Fedora resource or an endorsement.

## Quick start

*Researched from Fedora's Workstation download and installation documentation on
November 11, 2026. We have not downloaded, booted or installed an operating system.*

### Workstation

#### Get the image

Use the [official Workstation download page](https://fedoraproject.org/workstation/download/)
and select the image for your processor. At our check, that page headed the
release as Workstation 45 but labeled the ISO "BETA" despite a release date.
The project leader's [release announcement](https://www.redhat.com/en/blog/announcing-fedora-45)
confirms general availability on November 3. Check the selected image and its
checksum against the release instructions rather than rely on the stray label.

Use the page's Verify instructions to check the signed checksum and the image
checksum. Prefer Fedora Media Writer to create a USB drive. It overwrites the
selected USB drive: check its identity and back up anything you need first.

#### Try Workstation

Boot the USB from your firmware's boot menu. The live session lets you test
networking, sound, display and input devices before installing. Trying the live
session is different from choosing to install to a disk. The installer can erase
data; back up the computer and review its target disk before continuing.

#### Install

Start the installer from the live desktop when ready. Choose language, keyboard,
time zone, users and disk layout as the current installer requests. Reboot and
remove the USB after installation, then finish any first-login setup. Installer
screens vary by release; follow the guide linked from the download page.

## First use

Use GNOME Software to review updates and restart if requested. Open a terminal
and run `cat /etc/fedora-release` to confirm the installed release. Test your
normal hardware and workflow before migrating important work. Additional
software repositories may carry separate licensing and trust decisions.

## NixOS compatibility

Fedora is an operating system, not a NixOS application or service. Try it in a
virtual machine or on a separate disk rather than expect a Nix package to
replace NixOS. Back up any system you intend to replace.

## Documentation

- [Fedora Workstation](https://fedoraproject.org/workstation/)
- [Workstation downloads, verification and installation guide](https://fedoraproject.org/workstation/download/)
- [Fedora documentation](https://docs.fedoraproject.org/)
- [Trademark guidelines](https://docs.fedoraproject.org/en-US/legal/trademarks/)
