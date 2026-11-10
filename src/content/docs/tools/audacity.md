---
title: "Audacity"
description: "Multi-track audio editor and recorder."
category: Creative
icon: audacity.svg
mark: AU
repository: https://github.com/audacity/audacity
license: GPL-3.0
managedHosting: false
screenshot:
  src: audacity.webp
  alt: "Audacity 4.0 with a project open: the track list on the left and waveform tracks with clip and label tracks"
  width: 1280
  height: 627
  credit: "Zurel"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Audacity_version_4.0.png
  license: "GPL"
  commons: true
  captionNote: "Audacity 4.0 on its default theme, taken by a community contributor. The listing tracks Audacity 4.0.2."
---

Audacity records and edits audio on your computer. It is used for cleaning up recordings, cutting and mixing tracks, and exporting to common formats.

The project's LICENSE file says Audacity is released under the GNU GPL version 3, and that many source files are also available under version 2 or later.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows and macOS

Download the installer from [audacityteam.org/download](https://www.audacityteam.org/download/) and run it.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask audacity
```

### Linux

The project's [Linux download page](https://www.audacityteam.org/download/linux/) lists the supported packages for each distribution. Use the option it gives for yours.

## First steps

- Open Audacity. The project's built-in guide is under **Help > Quick Help**.
- To edit a file you already have, import it with **File > Import**, press Play on the toolbar, and select a part of the waveform to work on.
- To record, set the input level first and aim for peaks around -6 dB, then press the Record button on the Transport toolbar.
- Save your work as an Audacity project (**File > Save Project**). Export an MP3 or other audio file from the **File** menu when you're done.

Sources: the [Audacity manual's Quick Help](https://manual.audacityteam.org/quick_help.html) and [recording and editing tutorial](https://manual.audacityteam.org/man/basic_recording_editing_and_exporting.html).
