---
title: "draw.io Desktop"
description: "Desktop app for diagrams and flowcharts that works offline."
category: Creative
icon: drawio-desktop.svg
mark: DW
repository: https://github.com/jgraph/drawio-desktop
license: GPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/jgraph
managedHosting: false
screenshot:
  src: drawio-desktop.webp
  alt: "draw.io Desktop with an empty diagram, the shape library on the left and the format panel on the right"
  width: 1023
  height: 672
  credit: the draw.io Desktop repository
  sourceUrl: https://github.com/jgraph/drawio-desktop/blob/0623fb3c1523639b06600d5c33e3a127bf82aa1c/screenshot.png
  license: GPL-3.0
  captionNote: "Empty diagram. The project does not say which release this shows, so the interface may differ from the current version."
---

draw.io Desktop draws flowcharts, network maps and other diagrams, and saves files on your computer. It is the desktop build of the draw.io editor.

This listing covers the desktop app repository, whose LICENSE file is the GNU GPL version 3. The draw.io web editor is a separate repository ([jgraph/drawio](https://github.com/jgraph/drawio)) under the Apache License 2.0.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux, Windows and macOS

Pick the installer for your system on the [releases page](https://github.com/jgraph/drawio-desktop/releases). draw.io's own docs send desktop users to that page.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask drawio
```

### Offline use

The desktop app works without an internet connection, which draw.io's [offline guide](https://www.drawio.com/docs/manual/editor/offline/) recommends when data protection matters. The web editor is a separate, online route.

### NixOS

nixpkgs packages draw.io as `drawio` (source: [pkgs/by-name/dr/drawio/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/dr/drawio/package.nix)):

```nix
environment.systemPackages = [ pkgs.drawio ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch draw.io from the application menu.

## First steps

- Start draw.io Desktop and choose to create a new diagram (or open a `.drawio` file).
- Drag shapes from the library on the left onto the page and connect them with arrows.
- Use **File > Save As** to write the diagram to a file on your own disk.
- Export to PNG, SVG or PDF from the **File** menu.

Source: [draw.io's manual](https://www.drawio.com/docs/manual/new-diagram/).
