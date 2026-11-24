---
title: "Ardour"
description: "Free digital audio workstation for recording, editing and mixing audio and MIDI."
added: 2026-11-23
category: Creative
tags:
- Audio
icon: ardour.png
mark: AR
repository: https://github.com/Ardour/ardour
license: GPL-2.0
funding:
  custom:
    - label: "Donate to Ardour Development"
      url: https://community.ardour.org/donate
managedHosting: false
screenshot:
  src: ardour.webp
  alt: "Ardour 6.7 with its editor, recorder and mixer windows open, showing audio tracks, MIDI regions, meters and a Calf reverb plugin"
  width: 1280
  height: 721
  credit: "Derwok"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Ardour_6.7_Recorder_Editor_Mixer.png
  license: "CC0"
  commons: true
  captionNote: "Ardour 6.7 from May 2021, an older major version. The current interface differs in places."
---

Ardour is a desktop digital audio workstation for recording, editing and mixing audio and MIDI. It offers unlimited tracks and busses, non-linear editing, flexible routing, and LV2, VST2, VST3, AU and LADSPA plug-in support.

The repository's COPYING file is the GPL version 2. The project funds development through paid ready-to-run downloads and donations; the source code is free. The GitHub repository is a mirror of the project's own git server.

## Quick start

*Checked against the project's own pages on November 22, 2026. Commands are copied from the project's pages, or from Flathub where the section says so.*

### Linux

The download page offers paid ready-to-run builds and the free source code. The Flathub package is community-provided and not verified by the project:

```bash
flatpak install flathub org.ardour.Ardour
```

### Windows and macOS

Ready-to-run builds are paid downloads on the [Ardour download page](https://ardour.org/download.html); the source code is free for those who don't want to or cannot pay for the pre-built versions.

### NixOS

nixpkgs packages Ardour as `ardour` (source: [pkgs/by-name/ar/ardour/package.nix](https://github.com/NixOS/nixpkgs/blob/2786a2a72088ecf32aea5b3ec52099e6a7cff78f/pkgs/by-name/ar/ardour/package.nix)):

```nix
environment.systemPackages = [ pkgs.ardour ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch Ardour from the application menu.

## First steps

- Create a session and add audio or MIDI tracks for your inputs.
- Connect your audio hardware in the audio/MIDI setup, then record-arm a track and record.
- Edit and arrange regions on the timeline, then mix with the mixer strips and plug-ins.
- Export the session to an audio file when you're done.

Source: [Ardour features](https://ardour.org/features.html) and the [Ardour manual](https://manual.ardour.org/).
