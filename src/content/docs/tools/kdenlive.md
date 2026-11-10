---
title: "Kdenlive"
description: "Free video editor built on the MLT Framework and KDE Frameworks."
category: Creative
icon: kdenlive.svg
mark: KD
repository: https://github.com/KDE/kdenlive
license: GPL-3.0
managedHosting: false
screenshot:
  src: kdenlive.webp
  alt: "Kdenlive 20.04.1 with a project open, the effects panel, a monitor and a multi-track timeline"
  width: 1280
  height: 696
  credit: "Ddeepeshkumar"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Kdenlive_20.04.1.png
  license: "CC BY-SA 4.0"
  commons: true
  captionNote: "Kdenlive 20.04.1 from 2020, an old release. The current interface differs. The video frames shown are part of the Commons upload."
---

Kdenlive is a desktop video editor for Linux, Windows and macOS. It handles multi-track editing on your own computer.

The repository's COPYING file is the GPL version 3. The GitHub repository is a mirror of the project's KDE repository.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The download page offers an AppImage and a Flatpak. The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.kde.kdenlive
```

### Windows and macOS

Installers are on the [Kdenlive download page](https://kdenlive.org/download/).

## First steps

- Make a folder for the project and put your video clips in it.
- Open Kdenlive and create a project with **File > New**.
- Add clips to the project bin and drag them onto the timeline, then trim and arrange them.
- Export with the Render dialog when you're done.

Source: [Kdenlive quick start](https://docs.kdenlive.org/en/getting_started/quickstart.html), which uses sample clips you can download.
