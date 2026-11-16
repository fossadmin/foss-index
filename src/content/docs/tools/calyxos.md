---
title: CalyxOS
description: An Android-based phone operating system with privacy-focused defaults
  for a specific supported-device list.
added: 2026-11-12
category: Operating systems
tags:
- Security
- Android
icon: calyxos.png
mark: CO
repository: https://gitlab.com/CalyxOS/platform_manifest
license: Multiple (component-specific)
dripsEligible: false
managedHosting: false
funding:
  custom:
  - label: Support CalyxOS
    url: https://members.calyx.org/donate
screenshot:
  credit: Calyx Institute
  sourceUrl: https://calyxos.org/
  license: CC BY-SA 4.0 website-content terms; see Image credits
  alt: Official CalyxOS promotional composite of phone messaging and email interfaces
  captionNote: Official promotional composite with project sample content, resized
    and converted to WebP. Not our install or a version-specific capture. Website
    terms name BY 4.0 but link BY-SA 4.0; we retain attribution and share-alike obligations.
    See the full credit.
  src: calyxos-source.webp
  width: 664
  height: 1008
---

An Android-based phone operating system with privacy-focused defaults for a specific supported-device list.

This is an operating system for compatible Android hardware, not an Android app or an iPhone replacement. The source link is a manifest pointing to many repositories, not one binary or one license for the whole distribution.

The software combines open-source components under different licenses. Device firmware and vendor binaries can be proprietary and have their own terms. Consult the component source and the project's build instructions before redistribution; neither a logo license nor a manifest repository license covers the complete phone image. CalyxOS is a project name/mark; this independent listing does not imply affiliation or endorsement.

Current official pages list November 2026 images and a November security update. The install table and security bulletin show different version labels, so match the exact device, current build and support tier rather than assuming a universal latest version.

## Quick start

Researched against official instructions on November 12, 2026. We have not flashed a phone or run an installation.

### Device-specific installation

1. Match the exact model and codename at https://calyxos.org/install/ , then read https://calyxos.org/docs/guide/device-support/ . Supported families include specifically listed Pixel, Fairphone, Motorola and SHIFT devices, not every phone from those brands. Separate full vendor support from extended-security support: an available image does not mean every proprietary component still receives vendor security patches.
2. Back up the phone and account recovery material. The OS installation replaces the existing system and wipes data. Read the device-specific prerequisites, including account/factory-reset protection and OEM unlocking. Bootloader unlockability is distinct from SIM/carrier unlocking; Verizon restrictions can block installation.
3. Use the installer and instructions linked for the exact model. Read the official prerequisites before enabling OEM unlocking. Follow the project's verification, flashing and supported bootloader-relocking process; do not improvise from another ROM's steps.
4. Finish setup, confirm system updates and the supported device state, then decide which compatibility services and apps to enable. Review permissions and your backup plan before importing important data.

## First use

Check update availability and the device's support end date. CalyxOS aims to keep Verified Boot, including relocking, on its supported targets. Do not promise security updates for unsupported vendor firmware or identical compatibility with stock Android.


## NixOS and desktop hosts

This phone OS is not a NixOS service or desktop application. A Linux/NixOS, Windows or macOS computer may be used as an installer host only when the project supports that exact browser/toolchain and USB setup. Installing adb or finding a Nix package is not evidence that a phone is supported. Use the project's host prerequisites rather than a generic NixOS rebuild recipe.

## Current builds

Use the official device download matrix to match your exact model, maintained status and channel. A project-generation/version snapshot below does not replace that check. Do not infer device support or firmware security updates from the existence of a source branch or old image.

## Documentation

- https://calyxos.org/install/
- https://calyxos.org/docs/guide/device-support/
- https://calyxos.org/docs/development/
- https://calyxos.org/news/2026/11/10/november-security-updates/
