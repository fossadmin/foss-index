---
title: "GIMP"
description: "Raster image editor for photo retouching, composition and illustration."
category: Creative
icon: gimp.svg
mark: GM
repository: https://gitlab.gnome.org/GNOME/gimp
license: GPL-3.0-or-later
funding:
  custom:
    - label: "Donate to GIMP"
      url: https://www.gimp.org/donating/
managedHosting: false
screenshot:
  src: gimp.webp
  alt: "GIMP 3 with a blank image open, the toolbox on the left and paintbrush options on the right"
  width: 1280
  height: 799
  credit: "the GIMP creators (screenshot by User:HappilyUnknown)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:GIMP-3.png
  license: "GPL-3.0"
  commons: true
  captionNote: "GIMP 3, March 2025, with a blank canvas."
---

GIMP is a long-running image editor for retouching photos, compositing and painting. It works with layers, masks and many file formats, and can be extended with plug-ins.

It overlaps with [Krita](/tools/krita/), which is built more for digital painting, and [darktable](/tools/darktable/), which is built for processing raw photos.

The project's own FAQ says GIMP is distributed under the GNU GPL version 3 and later.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The download page lists an AppImage, a Flatpak and a Snap for x86_64 and Aarch64. The Flathub listing is verified by its publisher:

```bash
flatpak install flathub org.gimp.GIMP
```

### Windows and macOS

Installers are on [gimp.org/downloads](https://www.gimp.org/downloads/).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask gimp
```

### NixOS

nixpkgs packages GIMP as `gimp` (source: [pkgs/applications/graphics/gimp/default.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/applications/graphics/gimp/default.nix)):

```nix
environment.systemPackages = [ pkgs.gimp ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch GIMP from the application menu.

## First steps

- Open an image with **File > Open** (Ctrl+O), or start a blank one with **File > New** (Ctrl+N).
- Edit it with the toolbox on the left.
- **File > Save** (Ctrl+S) writes GIMP's own `.xcf` format, which keeps layers. To produce a PNG or JPEG use **File > Export As** (Shift+Ctrl+E).

Sources: [GIMP's manual on opening images](https://docs.gimp.org/3.0/en/gimp-using-fileformats-opening.html) and its [keyboard reference](https://docs.gimp.org/en_GB/key-reference-file.html).
