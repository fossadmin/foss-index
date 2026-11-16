---
title: "hledger"
description: "Plain-text accounting with command-line, terminal and web interfaces."
added: 2026-11-10
category: Finance
tags:
- Plain text accounting
icon: hledger.svg
mark: HL
repository: https://github.com/simonmichael/hledger
license: GPL-3.0-or-later
funding:
  githubSponsors: https://github.com/sponsors/simonmichael
  custom:
    - label: "Sponsor hledger"
      url: https://hledger.org/sponsor.html
managedHosting: false
screenshot:
  src: hledger.webp
  alt: "hledger-web showing the demo journal with an expenses account chart and its transaction register"
  width: 1400
  height: 758
  credit: the hledger repository
  sourceUrl: https://github.com/simonmichael/hledger/blob/972bf9099b2403c38a967618c45da3a6331ae501/.sandstorm/screenshot2.png
  license: GPL-3.0
  captionNote: "The project's own demo journal, not our data. The project does not say which release this shows, so the interface may differ from the current version."
---

hledger keeps accounts in a plain-text journal and reports from it on the command line. It also has a terminal interface (hledger-ui) and a web interface (hledger-web). It ships as a single binary, and reads the Ledger-style journal format as well as its own.

We list three plain-text accounting tools so you can pick the one that suits you. [Ledger](/tools/ledger/) is the original, a C++ command-line program. [Beancount](/tools/beancount/) is written in Python, and [Fava](/tools/fava/) gives it a web view. hledger's home page says it is Free Software and has been released since 2007.

The repository's README shows a GPLv3+ badge and its LICENSE file is the GPL version 3.

## Quick start

*Checked against the project's own documentation on November 9, 2026. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux and macOS

On Debian-family systems the project lists `apt install hledger hledger-ui hledger-web`, on Fedora `dnf install hledger`, and on Arch `pacman -Sy hledger hledger-ui hledger-web`. Distribution versions can lag. Homebrew has a formula too:

```bash
brew install hledger
```

The [install page](https://hledger.org/install.html) also offers official binaries from GitHub for Linux, macOS and Windows.

### Windows

```powershell
scoop install hledger
```

The install page also lists a WinGet package and the official Windows binaries.

### NixOS

nixpkgs packages hledger as `hledger` (source: [pkgs/top-level/all-packages.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/top-level/all-packages.nix)):

```nix
environment.systemPackages = [ pkgs.hledger ];
```

Rebuild with `sudo nixos-rebuild switch`, then run `hledger bal` on your journal from a terminal.

## First steps

Make a journal file, for example `~/.hledger.journal`, which hledger reads by default:

```
2026-11-01 opening balance
    assets:checking      $1000
    equity:opening

2026-11-02 groceries
    expenses:food          $25
    assets:checking
```

Then:

```bash
hledger balance
hledger register
hledger-web
```

`hledger-web` serves the journal in your browser. The sample follows the plain-text journal format described in hledger's [journal docs](https://hledger.org/journal.html).
