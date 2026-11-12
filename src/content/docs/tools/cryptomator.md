---
title: "Cryptomator"
description: "Client-side encryption for files you keep in cloud storage."
category: Security
icon: cryptomator.svg
mark: CY
repository: https://github.com/cryptomator/cryptomator
license: GPL-3.0
managedHosting: false
screenshot:
  src: cryptomator.webp
  alt: "Cryptomator on Linux with the vault list and a password prompt to unlock a vault"
  width: 729
  height: 515
  credit: "Kinetic2352"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Cryptomator-Linux-Desktop.png
  license: "CC0"
  commons: true
  captionNote: "Linux desktop, January 2025, taken by a community contributor. Version not stated; the interface may differ from the current release."
---

Cryptomator is a desktop app for Windows, macOS and Linux that encrypts files on your computer before they sync to a cloud folder. It works alongside a sync service such as Nextcloud or Syncthing rather than replacing it.

This listing covers the desktop app in this repository. The README says the project is dual-licensed: GPL-3.0 for free and open-source use, plus a commercial license for software vendors and resellers. The project's mobile apps are separate products and are not covered here.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux, Windows and macOS

The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.cryptomator.Cryptomator
```

Or download the installer for your system from [cryptomator.org/downloads](https://cryptomator.org/downloads/) and run it. Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask cryptomator
```

### What it does

Cryptomator makes an encrypted vault folder inside a folder you choose (for example one your cloud storage app already syncs). When you unlock it, Cryptomator shows the decrypted contents as a virtual drive. Whatever you put on that drive is stored encrypted in the vault folder.

### NixOS

nixpkgs packages Cryptomator as `cryptomator` (source: [pkgs/by-name/cr/cryptomator/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/cr/cryptomator/package.nix)):

```nix
environment.systemPackages = [ pkgs.cryptomator ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch Cryptomator from the application menu.

## First steps

- Open Cryptomator and choose **Add Vault > Create New Vault**.
- The wizard asks for a vault name, where to store it, and a password. It can also show a recovery key. The recovery key lets you set a new password if you forget the old one, so store it as carefully as the password.
- Unlock the vault and copy a test file onto the new drive. Lock it and confirm the file is no longer visible.
- Don't put your only copy of anything in a new vault until you've unlocked it again and read the file back.

Sources: [adding vaults](https://docs.cryptomator.org/desktop/adding-vaults/) and [password and recovery key](https://docs.cryptomator.org/desktop/password-and-recovery-key/).
