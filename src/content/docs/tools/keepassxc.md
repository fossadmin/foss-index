---
title: "KeePassXC"
description: "Offline password manager that keeps your passwords in an encrypted file you control."
category: Passwords
icon: keepassxc.svg
mark: KX
repository: https://github.com/keepassxreboot/keepassxc
license: "GPL-2.0 / GPL-3.0"
funding:
  githubSponsors: https://github.com/sponsors/droidmonkey
  openCollective: https://opencollective.com/keepassxc
  liberapay: https://liberapay.com/keepassxc
  custom:
    - label: "Donate"
      url: https://keepassxc.org/donate
managedHosting: false
screenshot:
  src: keepassxc.webp
  alt: "KeePassXC 2.7.10 with the group list on the left and a table of sample login entries"
  width: 1126
  height: 671
  credit: "VulcanSphere (software: KeePassXC Team)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:KeePassXC_2.7.10_entries_screenshot.webp
  license: "GPL"
  commons: true
  captionNote: "KeePassXC 2.7.10, August 2025, with sample entries."
---

KeePassXC is a community-driven, cross-platform port of KeePass. Your passwords live in a database file on your own devices, so there is no account and no server. It complements Vaultwarden for people who prefer a local file over a hosted vault.

The project's COPYING file offers the code under GPL version 2 or version 3, and the repository also carries license files for some bundled parts.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

From the same page:

Choose one of these. Do not run them all.

```bash
flatpak install --user flathub org.keepassxc.KeePassXC
sudo snap install keepassxc
sudo dnf install keepassxc
sudo pacman -S keepassxc
sudo zypper install keepassxc
```

For Ubuntu the page gives a PPA (`sudo add-apt-repository ppa:phoerious/keepassxc`, then `sudo apt update` and `sudo apt install keepassxc`). It also offers an AppImage with a PGP signature and checksum.

### Windows and macOS

Download the installer from [keepassxc.org/download](https://keepassxc.org/download/). On macOS, Homebrew also works (the project lists this on its page):

```bash
brew install --cask keepassxc
```

### NixOS

nixpkgs packages KeePassXC as `keepassxc` (source: [pkgs/by-name/ke/keepassxc/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/ke/keepassxc/package.nix)):

```nix
environment.systemPackages = [ pkgs.keepassxc ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch KeePassXC from the application menu.

## First steps

- Open KeePassXC and create a database (**Database > New Database**). Choose a name and a strong master password. You can add a key file as well.
- Save the `.kdbx` file somewhere you back up. There is no account and no recovery service: if you lose the master password and any key file, the data is gone.
- Add an entry for one site, then try the copy-username and copy-password buttons.
- Sync the database file between devices with any file sync tool you already trust.

Source: [KeePassXC getting started guide](https://keepassxc.org/docs/KeePassXC_GettingStarted).
