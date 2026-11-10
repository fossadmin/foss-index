---
title: "digiKam"
description: "Photo manager with tagging, face recognition, metadata editing and a raw workflow."
category: Photos
icon: digikam.png
mark: DK
repository: https://invent.kde.org/graphics/digikam
license: GPL-2.0-or-later
funding:
  custom:
    - label: "Donate to digiKam"
      url: https://www.digikam.org/donate/
managedHosting: false
screenshot:
  src: digikam.webp
  alt: "digiKam 7.6.0 with the album tree on the left, a photo preview and the metadata panel on the right"
  width: 1280
  height: 799
  credit: "VulcanSphere (software: KDE)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:DigiKam_7.6.0_screenshot.png
  license: "CC BY 4.0"
  commons: true
  captionNote: "digiKam 7.6.0 from 2022. The current release looks different. The sample photos are part of the Commons upload."
---

digiKam organizes large photo collections on your own computer. It handles tagging, ratings, albums, face recognition and metadata, and includes basic editing and raw support. It is a KDE project.

It differs from [darktable](/tools/darktable/), which is built around developing raw photos, and from [Immich](/tools/immich/), which is a self-hosted photo server you reach from a browser or phone.

The repository's COPYING file points to the GPL version 2 or later text, and individual source files carry their own license notices. This listing follows that file.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The download page offers an Intel AppImage (it needs glibc 2.31 or newer) and suggests AppImageLauncher for desktop integration.

Flathub lists this app as verified by its publisher (checked on the Flathub API on November 9, 2026):

```bash
flatpak install flathub org.kde.digikam
```

This needs Flatpak set up on your system first (see [flatpak.org/setup](https://flatpak.org/setup/)).

### Windows and macOS

Installers are on the [digiKam download page](https://www.digikam.org/download/). The page also lists weekly pre-release snapshots; use the stable download unless you want to test.

## First steps

- On first start digiKam asks a short series of setup questions. The first is where your photos live. Pick any local, removable or network folder. You can change every answer later.
- Each folder you register is a *collection*; its subfolders are albums. Add more under **Settings > Configure digiKam > Collections**.
- With the default SQLite setup, digiKam stores its databases in the collection folder, so keep that folder on storage you back up.

Sources: [digiKam quick start](https://docs.digikam.org/en/getting_started/quick_start.html) and [collection settings](https://docs.digikam.org/en/setup_application/collections_settings.html).
