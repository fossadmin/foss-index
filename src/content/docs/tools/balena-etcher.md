---
title: balenaEtcher
description: Write operating-system images to SD cards and USB drives with a simple desktop app.
added: 2026-11-15
category: Utilities
icon: balena-etcher.png
mark: BE
repository: https://github.com/balena-io/etcher
license: Apache-2.0
managedHosting: false
screenshot:
  src: balena-etcher.webp
  alt: "balenaEtcher start screen with Flash from file, Flash from URL and Clone drive options, and its anonymous-data notice"
  width: 800
  height: 480
  credit: balena
  own: true
  version: "2.1.9"
  captionNote: "Linux desktop app, before selecting an image or target. No drive was written. The app's anonymous-data notice is visible at the bottom."
---

balenaEtcher writes an image file to an SD card or USB drive, then validates
the written result. It is a graphical alternative to carefully composing a
`dd` command, useful for preparing a Raspberry Pi card or Linux installer.
The app runs on Linux, macOS and Windows.

It writes images rather than adapting them. A Windows installer ISO needs
special handling that Etcher does not provide, and Etcher does not add
persistent storage to a Linux live image. The app also collects anonymous
usage data by default; its settings provide an opt-out. Open source does
not mean no telemetry.

## Quick start

*Researched from the project's download page, release assets and user
documentation on November 15, 2026.*

### Linux, macOS and Windows

Download the matching build from [the official site](https://etcher.balena.io/)
or [GitHub releases](https://github.com/balena-io/etcher/releases/latest).
Choose the correct operating system and architecture. The current Linux
release provides a portable ZIP plus Debian and RPM packages; do not
follow an old AppImage command without checking the current assets.

For a Linux portable build, extract the ZIP and launch `balena-etcher`
inside the extracted directory. On macOS, open the matching DMG and follow
the normal app installation. On Windows, run the installer from the release.
Check the matching release's SHA256SUMS file before running a download.

Do not select a target drive until you have checked its model and capacity
and backed up anything you need from it. Etcher replaces the drive's contents.

## First use

1. Download the operating-system image from its publisher and verify that
   publisher's checksum or signature.
2. Choose **Flash from file** and select the image.
3. Choose **Select target**. Check the exact removable drive, not only its
   drive letter; unplug unrelated removable disks if that makes it clearer.
4. Only after confirming the target can be erased, choose **Flash!** and
   allow the write and validation to finish before ejecting it.

Validation checks the write, not whether the image publisher is trustworthy
or whether your hardware supports the operating system.

## Why it's listed

A small, inspectable tool for an easy-to-get-wrong task. The clear image,
target and write sequence helps, but it does not replace checking the disk
or having a backup. balena's separate fleet-management services are not
required to use Etcher.

## Documentation

- [Official download](https://etcher.balena.io/)
- [User documentation](https://github.com/balena-io/etcher/blob/master/docs/USER-DOCUMENTATION.md)
- [Release downloads and checksums](https://github.com/balena-io/etcher/releases)
- [Issue tracker](https://github.com/balena-io/etcher/issues)
