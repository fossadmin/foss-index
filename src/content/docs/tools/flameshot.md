---
title: "Flameshot"
description: "Screenshot tool with annotations: arrows, text, blur and highlights."
category: Utilities
icon: flameshot.svg
mark: FL
repository: https://github.com/flameshot-org/flameshot
license: GPL-3.0
managedHosting: false
screenshot:
  src: flameshot.webp
  alt: "Flameshot capture editor with drawing tools around a selected area holding sample shapes and an arrow"
  width: 803
  height: 518
  credit: "the Flameshot website"
  sourceUrl: https://flameshot.org/img/flameshot-hero.jpg
  captionNote: "Image from the project home page. It shows the capture editor on sample shapes, not a full desktop. The release is not stated."
---

Flameshot takes screenshots and lets you mark them up before you save or share them, with arrows, boxes, text, blur and highlights. It runs on Linux, Windows and macOS.

The repository's LICENSE file is the GNU GPL version 3.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

Flameshot's [Linux install page](https://flameshot.org/docs/installation/installation-linux/) gives one command per distribution. For example:

Pick the one line for your distribution. Do not run them all.

```bash
sudo apt install flameshot    # Debian 10+, Ubuntu 18.04+
sudo dnf install flameshot    # Fedora
sudo pacman --sync flameshot  # Arch
sudo zypper install flameshot # openSUSE
```

Flathub lists this app as verified by its publisher (checked on the Flathub API on November 9, 2026):

```bash
flatpak install flathub org.flameshot.Flameshot
```

This needs Flatpak set up on your system first (see [flatpak.org/setup](https://flatpak.org/setup/)).

### Windows and macOS

The project has an install page for each: [Windows](https://flameshot.org/docs/installation/installation-windows/) and [macOS](https://flameshot.org/docs/installation/installation-macos/). Follow the route it gives. On Windows, the command-line tool is called `flameshot-cli` instead of `flameshot`.

## First steps

- Run `flameshot gui` (on Windows, `flameshot-cli gui`). Your screen freezes and you drag a box over the part you want.
- Annotate with the toolbar: pencil, arrow, rectangle, text, blur or pixelate, and a numbered counter. Keyboard shortcuts such as `a` for arrow, `r` for rectangle and `t` for text work in this mode.
- Save or copy the result with the buttons on the toolbar.
- `flameshot gui --path ~/Pictures` sets the save folder and `flameshot gui --delay 2000` waits two seconds first.

Sources: [command-line options](https://flameshot.org/docs/advanced/commandline-options/) and [key bindings](https://flameshot.org/docs/guide/key-bindings/).
