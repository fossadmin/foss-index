---
title: "Shotcut"
description: "Free video editor with wide format support, built on MLT and FFmpeg."
added: 2026-11-23
category: Creative
tags:
- Video
icon: shotcut.svg
mark: SC
repository: https://github.com/mltframework/shotcut
license: GPL-3.0
managedHosting: false
screenshot:
  src: shotcut.webp
  alt: "Shotcut's editing layout playing a black-and-white film in the preview monitor, with the menu bar and layout tabs"
  width: 1280
  height: 728
  credit: "Meltytech, LLC"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Shotcut_at_2024-07-10_15-28-45.png
  license: "GPL-3.0"
  commons: true
  captionNote: "Shotcut from July 2024. The film frame shown is part of the Commons upload."
---

Shotcut is a desktop video editor for Linux, Windows and macOS. It edits natively without importing, supports hundreds of formats through FFmpeg, and handles multi-format timelines and resolutions up to 4K.

The repository's COPYING file is the GPL version 3. New versions arrive about every two months, and you choose when to update.

## Quick start

*Checked against the project's own pages on November 22, 2026. Commands are copied from the project's pages, or from Flathub where the section says so.*

### Linux

The download page offers an AppImage and a portable tar archive. The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.shotcut.Shotcut
```

A Snap is also available: `snap install shotcut --classic`.

### Windows and macOS

Installers are on the [Shotcut download page](https://www.shotcut.org/download/): Windows 10/11 on Intel/AMD or ARM, and a universal build for 64-bit macOS 12 and later. The page lists the last release that supports older systems.

### NixOS

nixpkgs packages Shotcut as `shotcut` (source: [pkgs/by-name/sh/shotcut/package.nix](https://github.com/NixOS/nixpkgs/blob/2786a2a72088ecf32aea5b3ec52099e6a7cff78f/pkgs/by-name/sh/shotcut/package.nix)):

```nix
environment.systemPackages = [ pkgs.shotcut ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch Shotcut from the application menu.

## First steps

- Open files by dragging them into Shotcut, or from the menu and toolbar.
- Use J, K and L to control playback speed and direction, and I and O to set in and out points.
- Add clips to the playlist, drag them onto the timeline, then trim and arrange them.
- Export from the Export panel when you're done.

Source: the Quickstart on the [Shotcut home page](https://www.shotcut.org/) and its [tutorials](https://www.shotcut.org/tutorials/).
