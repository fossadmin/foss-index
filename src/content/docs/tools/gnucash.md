---
title: "GnuCash"
description: "Double-entry accounting for personal and small-business books."
category: Finance
icon: gnucash.svg
mark: GC
repository: https://github.com/Gnucash/gnucash
license: "GPL-2.0 / GPL-3.0"
managedHosting: false
screenshot:
  src: gnucash.webp
  alt: "GnuCash with a transaction register open and a context menu showing split and enter transaction options"
  width: 1049
  height: 590
  credit: "the GnuCash website"
  sourceUrl: https://www.gnucash.org/images/features/feature_register_lg.png
  captionNote: "Image from the GnuCash features page, last modified February 2014, so it shows an old 2.x interface that differs from current releases. Sample data."
---

GnuCash is a desktop double-entry accounting program. It keeps accounts, transactions and reports in a file on your computer.

The project's LICENSE file says the software is licensed under the GNU GPL version 2 or, at your option, version 3, with some files under compatible licenses. Unlike [Actual Budget](/tools/actual-budget/), which is envelope budgeting, GnuCash is a ledger-style accounting tool.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

Use your distribution's software manager, or the Flatpak the download page mentions for newer versions:

```bash
flatpak install flathub org.gnucash.GnuCash
```

### Windows and macOS

Download from [gnucash.org/download.phtml](https://www.gnucash.org/download.phtml).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask gnucash
```

### NixOS

nixpkgs packages GnuCash as `gnucash` (source: [pkgs/by-name/gn/gnucash/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/gn/gnucash/package.nix)):

```nix
environment.systemPackages = [ pkgs.gnucash ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch GnuCash from the application menu.

## First steps

- On first start choose **File > New File**. The assistant asks for a currency and lets you pick a starter set of accounts.
- Save the file. GnuCash can store data as XML or SQLite3 (or in MySQL or PostgreSQL) and asks which format when you save.
- Enter your opening balances as transactions against an equity account, then record a few real transactions in each account's register.
- Back up the data file before importing bank data.

Source: [GnuCash tutorial and concepts guide](https://www.gnucash.org/docs/v5/C/gnucash-guide/index.html).
