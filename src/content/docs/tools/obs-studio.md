---
title: "OBS Studio"
description: "Free software for screen recording and live streaming."
added: 2026-11-10
category: Creative
tags:
- Video
icon: obs-studio.svg
mark: OB
repository: https://github.com/obsproject/obs-studio
license: GPL-2.0
funding:
  openCollective: https://opencollective.com/obsproject
  custom:
    - label: "Patreon"
      url: https://www.patreon.com/obsproject
managedHosting: false
screenshot:
  src: obs-studio.webp
  alt: "OBS Studio with a scene list, sources, audio mixer and controls around a preview of a color bar test pattern"
  width: 1280
  height: 1018
  credit: "the OBS Studio website"
  sourceUrl: https://obsproject.com/
  captionNote: "Marketing image from the OBS home page showing the OBS Studio window. The preview shows the OBS website. Its title bar reads OBS 32.1.1."
---

OBS Studio records your screen, windows and cameras to a file or streams them live. It runs on your own computer and is the usual tool for recording tutorials and demos.

## Quick start

*Checked against the project's own documentation on November 9, 2026. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

OBS says it is officially distributed as a Flatpak on Flathub, and as a PPA for Ubuntu 26.04 and newer:

Choose one: the Flatpak line, or the three PPA lines together. Do not run both.

```bash
flatpak install flathub com.obsproject.Studio

sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt update
sudo apt install obs-studio
```

### Windows and macOS

Download the installer from [obsproject.com/download](https://obsproject.com/download).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask obs
```

### NixOS

nixpkgs packages OBS Studio as `obs-studio` (source: [pkgs/applications/video/obs-studio/default.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/applications/video/obs-studio/default.nix)):

```nix
environment.systemPackages = [ pkgs.obs-studio ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch OBS Studio from the application menu.

## First steps

- Run the **Auto-Configuration Wizard** when OBS offers it. It picks settings for recording or streaming.
- Add **sources** to the default scene: a display capture, a window, a camera.
- Check the audio mixer. By default OBS captures desktop audio and the microphone.
- Press **Start Recording** for a short test and play the file back before a real session.

Source: [OBS quick start guide](https://obsproject.com/kb/quick-start-guide).
