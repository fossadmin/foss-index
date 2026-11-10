---
title: "Krita"
description: "Free painting and illustration program."
category: Creative
icon: krita.png
mark: KR
repository: https://github.com/KDE/krita
license: GPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/kde
managedHosting: false
screenshot:
  src: krita.webp
  alt: "Krita 5.0.0 with a painted character on the canvas, the toolbox on the left and the color selector and layers docks on the right"
  width: 1280
  height: 782
  credit: "VulcanSphere (software: KDE, artwork: Tyson Tan)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Krita_5.0.0_screenshot.png
  license: "CC BY-SA 4.0"
  commons: true
  captionNote: "Krita 5.0.0 from December 2021. The artwork shown is by Tyson Tan and is part of the Commons upload."
---

Krita is a desktop program for digital painting and illustration, made by a community of artists and developed under KDE. The project's site states it is licensed under the GNU GPL.

The GitHub repository is a mirror; the project's own repository is on KDE's infrastructure.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The download page links the AppImage and the source tarball. The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.kde.krita
```

### Windows and macOS

Download from [krita.org/en/download](https://krita.org/en/download/). The paid Microsoft Store and Steam versions are optional ways to support development.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask krita
```

## First steps

- On first start Krita opens with no document. Use **File > New** (Ctrl+N), open the **Custom Document** section and pick a size such as A4 at 300 ppi.
- Draw on the canvas. The brush tool is selected by default. Change colour from the colour selector docker.
- Save with **File > Save**.

Source: [Krita manual, starting Krita](https://docs.krita.org/en/user_manual/getting_started/starting_krita.html).
