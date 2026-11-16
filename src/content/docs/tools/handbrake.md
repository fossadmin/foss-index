---
title: "HandBrake"
description: "Open-source video transcoder."
added: 2026-11-10
category: Creative
tags:
- Video
icon: handbrake.png
mark: HB
repository: https://github.com/HandBrake/HandBrake
license: GPL-2.0
managedHosting: false
screenshot:
  src: handbrake.webp
  alt: "HandBrake 1.0.0 on macOS with the source, destination and video settings and the preset list on the right"
  width: 1187
  height: 758
  credit: "HandBrake community"
  sourceUrl: https://commons.wikimedia.org/wiki/File:HandBrake_Screenshot.png
  license: "GPL-2.0"
  commons: true
  captionNote: "HandBrake 1.0.0 on macOS from 2016, an old release. The current interface differs."
---

HandBrake converts video files between formats on your own computer.

The project's LICENSE file says most files are GPLv2, some are GPLv2-or-later, LGPL or BSD/MIT style, and a compiled HandBrake build is licensed under GPLv2. It also notes the Fraunhofer AAC library (fdk-aac) is incompatible with the GPL, so binaries that include it are not distributed.

## Quick start

*Checked against the project's own documentation on November 9, 2026. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The project's [download page](https://handbrake.fr/docs/en/latest/get-handbrake/download-and-install.html) covers Linux. The Flathub package is verified by its publisher:

```bash
flatpak install flathub fr.handbrake.ghb
```

### Windows and macOS

Download from [handbrake.fr](https://handbrake.fr/), which the project calls its only official download source. It publishes checksums so you can verify the file.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask handbrake-app
```

### NixOS

nixpkgs packages HandBrake as `handbrake` (source: [pkgs/by-name/ha/handbrake/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/ha/handbrake/package.nix)):

```nix
environment.systemPackages = [ pkgs.handbrake ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch HandBrake from the application menu.

## First steps

- Start HandBrake and choose **Open Source** to pick a video file (or drag one onto the window).
- Pick a **Preset** that matches where the video will play. HandBrake ships official presets for common devices and the web.
- Choose a destination file name, then start the encode.
- HandBrake writes a new file; your source video isn't changed.

Source: [HandBrake quick start](https://handbrake.fr/docs/en/latest/introduction/quick-start.html).
