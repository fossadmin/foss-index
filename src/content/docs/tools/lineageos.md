---
title: LineageOS
description: An Android-based aftermarket operating system with device-specific builds
  for selected phones and tablets.
category: Operating systems
tags: []
icon: lineageos.svg
mark: LO
repository: https://github.com/LineageOS/android
license: Multiple (component-specific)
dripsEligible: false
managedHosting: false
funding:
  custom:
  - label: Support LineageOS
    url: https://patreon.com/LineageOS
screenshot:
  credit: The LineageOS Project
  sourceUrl: https://commons.wikimedia.org/wiki/File:Lineage_OS_21_home_screen.png
  license: Apache-2.0
  commons: true
  alt: LineageOS 21 default home screen with phone, messages, browser, gallery and
    camera icons
  captionNote: Historical March 2024 LineageOS 21 home screen on a Pixel 6 Pro, resized
    and converted to WebP. Not the recorded project generation, a device-compatibility
    promise or our installation.
  src: lineageos-source.webp
  width: 738
  height: 1600
---

An Android-based aftermarket operating system with device-specific builds for selected phones and tablets.

This is an operating system for compatible Android hardware, not an Android app or an iPhone replacement. The source link is a manifest pointing to many repositories, not one binary or one license for the whole distribution.

The software combines open-source components under different licenses. Device firmware and vendor binaries can be proprietary and have their own terms. Consult the component source and the project's build instructions before redistribution; neither a logo license nor a manifest repository license covers the complete phone image. LineageOS is a project name/mark; this independent listing does not imply affiliation or endorsement.

The October 11, 2026 project announcement introduced LineageOS 24.0, but individual devices can remain on older supported branches. The project-generation snapshot is not an available build for every phone.

## Quick start

Researched against official instructions on November 12, 2026. We have not flashed a phone or run an installation.

### Device-specific installation

1. Choose the exact device on https://wiki.lineageos.org/devices/ . Confirm its model number, codename and whether the official build is currently maintained. Similar marketing names and different regional variants are not interchangeable.
2. Read that device's own installation guide from start to finish, including firmware requirements, downloads, recovery and known limitations. An unofficial community build is not official support.
3. Back up all data and account recovery material before unlocking or formatting anything. Follow only the exact supported device's instructions for bootloader, recovery and sideloading. Do not paste a universal flash command from a different phone's guide.
4. Do not apply GrapheneOS/CalyxOS relocking advice here: https://wiki.lineageos.org/faq warns that few devices allow relocking and even fewer work correctly afterwards; relocking can make a device unusable. Follow the exact device guidance and do not improvise.
5. After installation, complete setup, check updates and test calls, data, camera and other necessary functions before relying on the phone. Google apps are a separate optional software choice with separate licensing; do not silently include them.

## First use

Check the device's maintained status over time, set a screen lock, review permissions and plan ongoing backups. An OS update does not necessarily update unsupported proprietary firmware. Banking apps, integrity checks, DRM and device-specific functions can differ from stock Android.


## NixOS and desktop hosts

This phone OS is not a NixOS service or desktop application. A Linux/NixOS, Windows or macOS computer may be used as an installer host only when the project supports that exact browser/toolchain and USB setup. Installing adb or finding a Nix package is not evidence that a phone is supported. Use the project's host prerequisites rather than a generic NixOS rebuild recipe.

## Current builds

Use the official device download matrix to match your exact model, maintained status and channel. A project-generation/version snapshot below does not replace that check. Do not infer device support or firmware security updates from the existence of a source branch or old image.

## Documentation

- https://wiki.lineageos.org/devices/
- https://wiki.lineageos.org/faq
- https://download.lineageos.org/
- https://lineageos.org/Changelog-32/
