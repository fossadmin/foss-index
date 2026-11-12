---
title: "PrusaSlicer"
description: "Slicer for FDM and resin 3D printers, with many printer profiles."
category: Creative
icon: prusaslicer.svg
mark: PS
repository: https://github.com/prusa3d/PrusaSlicer
license: AGPL-3.0
managedHosting: false
screenshot:
  src: prusaslicer.webp
  alt: "PrusaSlicer 2.9.0 with an orange alpaca model on a print bed and the print settings on the right"
  width: 1280
  height: 896
  credit: "Majkluss"
  sourceUrl: https://commons.wikimedia.org/wiki/File:PrusaSlicer.png
  license: "CC BY-SA 4.0"
  commons: true
  captionNote: "PrusaSlicer 2.9.0 with a Czech interface, March 2025. The model shown is part of the Commons upload."
---

PrusaSlicer prepares 3D models for printing. It supports Prusa printers and many other makes, and handles multi-material and resin printing.

The repository's LICENSE file is the GNU AGPL version 3. See also [UltiMaker Cura](/tools/cura/).

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The same page covers Linux. The Flathub package is verified by its publisher:

```bash
flatpak install flathub com.prusa3d.PrusaSlicer
```

### Windows and macOS

Download from [Prusa's PrusaSlicer page](https://help.prusa3d.com/article/install-prusaslicer_1903).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask prusaslicer
```

### NixOS

nixpkgs packages PrusaSlicer as `prusa-slicer` (source: [pkgs/by-name/pr/prusa-slicer/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/pr/prusa-slicer/package.nix)):

```nix
environment.systemPackages = [ pkgs.prusa-slicer ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch PrusaSlicer from the application menu.

## First steps

- The first launch opens the **Configuration Wizard**. Pick your printer and filament there. You can reopen it later from the **Configuration** menu.
- Load a model (STL or 3MF), check its orientation on the bed, and choose a print profile.
- Slice, check the preview, then export the G-code or send it to the printer.

Source: [Prusa's Configuration Wizard article](https://help.prusa3d.com/article/configuration-wizard_1754).
