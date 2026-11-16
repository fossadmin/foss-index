---
title: GrapheneOS
description: A privacy- and security-focused Android-based operating system for specifically
  supported devices.
added: 2026-11-12
category: Operating systems
tags:
- Security
- Android
icon: grapheneos.svg
iconTile: true
mark: GO
repository: https://github.com/GrapheneOS/platform_manifest
license: Multiple (component-specific)
dripsEligible: false
managedHosting: false
funding:
  custom:
  - label: Support GrapheneOS
    url: https://grapheneos.org/donate
screenshot:
  credit: Omilc
  sourceUrl: https://commons.wikimedia.org/wiki/File:GrapheneOS_Screenshot.png
  license: CC BY-SA 2.5
  commons: true
  alt: GrapheneOS home screen with default apps on a black background
  captionNote: Historical September 2022 home screen, resized and converted to WebP.
    Not the current release. The image remains under CC BY-SA
    2.5.
  src: grapheneos-source.webp
  width: 720
  height: 1600
---

A privacy- and security-focused Android-based operating system for specifically supported devices.

This is an operating system for compatible Android hardware, not an Android app or an iPhone replacement. The source link is a manifest pointing to many repositories, not one binary or one license for the whole distribution.

The software combines open-source components under different licenses. Device firmware and vendor binaries can be proprietary and have their own terms. Consult the component source and the project's build instructions before redistribution; neither a logo license nor a manifest repository license covers the complete phone image. GrapheneOS is a project name/mark; this independent listing does not imply affiliation or endorsement.

## Quick start

Researched against official instructions on November 12, 2026. We have not flashed a phone or run an installation.

### Device-specific installation

1. Open https://grapheneos.org/faq and match the exact model to the official production-supported list. The current page lists selected Pixel models, including the Pixel 10 family, Pixel 9 family, Pixel 8 family and earlier specifically listed models. This is not support for every Pixel or every Android phone. Carrier restrictions may prevent bootloader unlocking even when the hardware model matches. Check the remaining support lifetime before buying hardware.
2. Back up data, account recovery material and app-specific exports elsewhere. Installing replaces the OS and erases the phone. Confirm you can recover your accounts before wiping it.
3. Follow https://grapheneos.org/install/web from a supported computer/browser and USB connection. Read its prerequisites first. The official flow enables OEM unlocking, unlocks the bootloader, flashes the correct factory image and then locks the bootloader again. Unlocking and locking wipe data. Do not substitute another ROM's instructions.
4. Complete initial setup only after the official verification and locking steps. Confirm the installed version and updates. Review permissions before restoring apps. Sandboxed Google Play is an optional compatibility choice, not an automatic requirement.

## First use

Check system updates, use a strong screen lock, and confirm the device remains officially supported. App compatibility, banking and integrity checks vary. A privacy-focused OS is not anonymity and cannot remove hardware/firmware dependencies.


## NixOS and desktop hosts

This phone OS is not a NixOS service or desktop application. A Linux/NixOS, Windows or macOS computer may be used as an installer host only when the project supports that exact browser/toolchain and USB setup. Installing adb or finding a Nix package is not evidence that a phone is supported. Use the project's host prerequisites rather than a generic NixOS rebuild recipe.

## Current builds

Use the official device download matrix to match your exact model, maintained status and channel. A project-generation/version snapshot below does not replace that check. Do not infer device support or firmware security updates from the existence of a source branch or old image.

## Documentation

- https://grapheneos.org/faq
- https://grapheneos.org/install/web
- https://grapheneos.org/source
- https://grapheneos.org/releases
