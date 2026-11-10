---
title: "VLC media player"
description: "Free, cross-platform media player and framework that plays most media files."
category: Media
icon: vlc.svg
mark: VL
repository: https://github.com/videolan/vlc
license: GPL-2.0
managedHosting: false
screenshot:
  src: vlc.webp
  alt: "VLC media player playing a video in a window on Windows 11"
  width: 500
  height: 375
  credit: "the VideoLAN website"
  sourceUrl: https://www.videolan.org/vlc/
  captionNote: "Image from the VLC page on videolan.org, labeled 3.0.17 on Windows 11 in its file name. It is small (500 px wide)."
---

VLC plays most audio and video files, discs and network streams on your own computer. It is made by VideoLAN, a non-profit organization.

VideoLAN's legal page says its software is under the GNU GPL version 2 or the LGPL, and the repository's COPYING file is GPLv2. The GitHub repository is a mirror; the project's own repository is hosted by VideoLAN.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

VideoLAN's [Ubuntu page](https://www.videolan.org/vlc/download-ubuntu.html) says to search for vlc in the graphical software centre, or use:

```bash
sudo snap install vlc
```

Other distributions package VLC in their own repositories.

### Windows and macOS

Download from [videolan.org/vlc](https://www.videolan.org/vlc/).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask vlc
```

## First steps

- Open VLC and use **Media > Open File** to play a video or audio file.
- **Media > Open Network Stream** plays a stream from a URL. **Media > Open Disc** plays a disc.
- To play region-locked DVDs on Debian-family systems you need `libdvdcss2`; the Ubuntu page links the procedure.
