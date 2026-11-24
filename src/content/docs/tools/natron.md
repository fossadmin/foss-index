---
title: "Natron"
description: "Free node-based compositor for visual effects and motion graphics."
added: 2026-11-23
category: Creative
tags:
- Video
icon: natron.svg
mark: NT
repository: https://github.com/NatronGitHub/Natron
license: GPL-2.0
managedHosting: false
screenshot:
  src: natron.webp
  alt: "Natron's interface with a viewer showing a mech character shot, the node graph with grouped nodes, and properties panels"
  width: 1280
  height: 720
  credit: "Sunderland93"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Natron-screenshot-20180619.png
  license: "CC BY-SA 4.0"
  commons: true
  captionNote: "Natron from June 2018, an old capture. The current interface differs in places. The footage shown is part of the Commons upload."
---

Natron is a desktop compositor for visual effects and motion graphics. It works with a node graph like Nuke, with OpenFX plug-in support, 2D tracking, rotoscoping and keying, and it can render headless on a render farm.

The repository's COPYING file is the GPL version 2. The latest stable release is 2.5.0 from November 2022; development continues on the project's 2.6 branch.

## Quick start

*Checked against the project's own pages on November 22, 2026. Commands are copied from the project's pages, or from Flathub where the section says so.*

### Linux

The download page offers an installer, a portable archive and a Flatpak link. The Flathub package is community-provided and not verified by the project:

```bash
flatpak install flathub fr.natron.Natron
```

### Windows and macOS

Installers are on the [Natron download page](https://natrongithub.github.io/#download). The stable macOS build is Intel-only; on Apple Silicon it runs via Rosetta 2, and the project offers an alpha native build.

### NixOS

nixpkgs packages Natron as `natron` (source: [pkgs/by-name/na/natron/package.nix](https://github.com/NixOS/nixpkgs/blob/2786a2a72088ecf32aea5b3ec52099e6a7cff78f/pkgs/by-name/na/natron/package.nix)):

```nix
environment.systemPackages = [ pkgs.natron ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch Natron from the application menu.

## First steps

- Create a project and check the output format and frame rate in the project settings.
- Add a Read node to load your footage, then connect nodes in the node graph; the Viewer shows the node you select.
- Add a Write node, set the output location, and start the render.

Source: [Natron documentation, Getting started](https://natron.readthedocs.io/en/rb-2.5/guide/getstarted.html).
