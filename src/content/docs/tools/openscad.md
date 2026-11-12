---
title: "OpenSCAD"
description: "Script-based 3D CAD for making parametric models, often for 3D printing."
category: Creative
icon: openscad.png
mark: OS
repository: https://github.com/openscad/openscad
license: GPL-2.0
funding:
  githubSponsors: https://github.com/sponsors/openscad
  openCollective: https://opencollective.com/openscad
managedHosting: false
screenshot:
  src: openscad.webp
  alt: "OpenSCAD with a code editor on the left and a 3D preview of a fan shape on the right"
  width: 1000
  height: 501
  credit: "the OpenSCAD website"
  sourceUrl: https://openscad.org/
  captionNote: "Image from the OpenSCAD home page. Its status bar reads OpenSCAD 2015.03, so it shows an old interface."
---

OpenSCAD makes 3D models from text. You describe a shape in code, and change its dimensions by changing numbers, so designs are easy to version and repeat. It is used for mechanical parts and 3D printing.

The repository's COPYING file is the GNU GPL version 2, with an added exception that allows linking with the CGAL library.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The downloads page shows `sudo apt-get install openscad` for Debian-family systems and offers AppImages for x86-64 and ARM64. The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.openscad.OpenSCAD
```

### Windows and macOS

Installers (exe, zip, dmg) are on [openscad.org/downloads](https://openscad.org/downloads.html). The page also mentions Homebrew for snapshots:

```bash
brew install openscad@snapshot
```

### NixOS

nixpkgs packages OpenSCAD as `openscad` (source: [pkgs/by-name/op/openscad/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/op/openscad/package.nix)):

```nix
environment.systemPackages = [ pkgs.openscad ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch OpenSCAD from the application menu.

## First steps

OpenSCAD models are code. Type this in the editor:

```
cube([10, 20, 30]);
translate([20, 0, 0]) sphere(r = 8);
```

- Press **F5** for a quick preview and **F6** for a full render.
- After rendering with F6, use the **File > Export** menu. It offers STL and other formats.
- Save the `.scad` file. That is your real source.

These keys and menus come from the [OpenSCAD user interface](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/The_OpenSCAD_User_Interface) and [STL export](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/STL_Export) manual pages. More at the [OpenSCAD documentation](https://openscad.org/documentation.html).
