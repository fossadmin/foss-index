---
title: "Signal"
description: "Private messaging and calls, with phone apps and a linked desktop client."
category: Communication
icon: signal-desktop.svg
iconTile: true
mark: SG
repository: https://github.com/signalapp/Signal-Desktop
license: AGPL-3.0
funding:
  custom:
    - label: "Donate"
      url: https://signal.org/donate/
managedHosting: false
screenshot:
  src: signal-desktop.webp
  alt: "Signal Desktop on macOS with the chat list and a conversation open"
  width: 804
  height: 490
  credit: "the Signal website"
  sourceUrl: https://signal.org/download/
  captionNote: "Image from the Signal download page, showing Signal Desktop on macOS with the project's own sample chats. The page states no reuse terms."
---

Signal is a private messenger with open-source phone and desktop apps. This page keeps the existing desktop setup instructions and source link; the platform section links the Android and iOS clients separately. Signal Desktop links to your Signal account on a phone.

The client code is open source. The messaging service it connects to is run by Signal, so using the app means using their service.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Debian and Ubuntu

From [signal.org/download/linux](https://signal.org/download/linux/), for 64-bit Debian-based systems:

```bash
curl https://updates.signal.org/desktop/apt/keys.asc | gpg --dearmor > signal-desktop-keyring.gpg
cat signal-desktop-keyring.gpg | sudo tee /usr/share/keyrings/signal-desktop-keyring.gpg > /dev/null
curl -o signal-desktop.sources https://updates.signal.org/static/desktop/apt/signal-desktop.sources
cat signal-desktop.sources | sudo tee /etc/apt/sources.list.d/signal-desktop.sources > /dev/null
sudo apt update && sudo apt install signal-desktop
```

The page also offers an AppImage with a signing key for other distributions.

### Windows and macOS

Signal Desktop is linked to the Signal app on your phone, so install Signal on your phone first. Then download the desktop app from [signal.org/download](https://signal.org/download/).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask signal
```

### NixOS

nixpkgs packages Signal as `signal-desktop` (source: [pkgs/by-name/si/signal-desktop/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/si/signal-desktop/package.nix)):

```nix
environment.systemPackages = [ pkgs.signal-desktop ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch Signal from the application menu and link your phone.

## First steps

- Open Signal Desktop. It shows a QR code.
- On your phone, open Signal and scan the code with its linked devices screen. See Signal's [Linked Devices article](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices).
- Your messages then show on both devices.
