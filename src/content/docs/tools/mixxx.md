---
title: "Mixxx"
description: "DJ software for mixing tracks with controllers or a keyboard."
category: Creative
icon: mixxx.svg
mark: MX
repository: https://github.com/mixxxdj/mixxx
license: GPL-2.0-or-later
funding:
  custom:
    - label: "Donate to Mixxx"
      url: https://mixxx.org/donate
managedHosting: false
screenshot:
  src: mixxx.webp
  alt: "Mixxx 2.3.0 with two decks and waveforms, a mixer in the middle and the track library below"
  width: 1280
  height: 720
  credit: "Mixxx contributors"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Mixxx_2.3.0_screenshot.png
  license: "GPL-2.0-or-later"
  commons: true
  captionNote: "Mixxx 2.3.0 with the LateNight theme, published by the project on its site. The listing tracks a newer release."
---

Mixxx is DJ software. It supports DJ controllers, effects, beat matching and recording, and can run live sets from a music library.

The repository's LICENSE file says Mixxx is under the GNU GPL version 2 or any later version.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows and macOS

Download from [mixxx.org/download](https://mixxx.org/download/). The page recommends the stable 2.5.6 release for live use.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask mixxx
```

### Linux

The download page lists the Linux options. The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.mixxx.Mixxx
```

## First steps

- Open Mixxx and import your music into the library. Go to **Preferences > Library** and click **Add** to choose your music directory. Mixxx watches that folder for new tracks.
- Load a track onto a deck by dragging it from the library, then use the play and sync controls.
- If you have a DJ controller, enable it in the Controllers section of Preferences.

Sources: [Mixxx manual, getting started](https://manual.mixxx.org/2.5/en/chapters/getting_started) and [library preferences](https://manual.mixxx.org/2.5/en/chapters/preferences/library).
