---
title: "Ledger"
description: "The original command-line double-entry accounting system, using plain text files."
category: Finance
icon: ledger.png
mark: LE
repository: https://github.com/ledger/ledger
license: BSD-3-Clause
funding:
  githubSponsors: https://github.com/sponsors/jwiegley
managedHosting: false
screenshot:
  src: ledger.webp
  alt: "Terminal output of ledger balance and ledger register on a small sample journal"
  width: 1147
  height: 412
  credit: ledger
  terminal: true
  version: "3.2.1"
  captionNote: "Our own run on a three-entry sample journal; the text is unedited. The listing tracks ledger 3.4.1."
---

Ledger is a double-entry accounting program for the Unix command line. You keep transactions in a text file and run reports on them. The project's site says it began in 2003, is written by John Wiegley, and has inspired ports in other languages, including [hledger](/tools/hledger/). [Beancount](/tools/beancount/) takes a different approach with its own file format.

The repository's LICENSE.md is the BSD 3-clause license. GitHub labels it "Other", but the text has the three clauses, including no endorsement.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux and macOS

Debian-family systems package `ledger`, and Homebrew has a `ledger` formula. Both are third-party packaging.

```bash
brew install ledger
```

### Windows and building

We didn't find an official Windows installer. The project's [README](https://github.com/ledger/ledger/blob/master/README.md) describes building from source, with Homebrew or MacPorts helping on macOS, and also mentions a Docker route. On Windows, WSL with the Linux package may work, but we haven't verified that against the project's docs.

### NixOS

nixpkgs packages Ledger as `ledger` (source: [pkgs/by-name/le/ledger/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/le/ledger/package.nix)):

```nix
environment.systemPackages = [ pkgs.ledger ];
```

Rebuild with `sudo nixos-rebuild switch`, then run `ledger bal` on your journal from a terminal.

## First steps

Create a plain-text journal, for example `journal.ledger`:

```
2026/11/01 Opening balance
    Assets:Checking        $1000.00
    Equity:Opening

2026/11/02 Groceries
    Expenses:Food            $25.00
    Assets:Checking
```

Then:

```bash
ledger -f journal.ledger balance
ledger -f journal.ledger register
```

The [Ledger 3 manual](https://ledger-cli.org/doc/ledger3.html) explains the file format and every report. Ledger and [hledger](/tools/hledger/) read very similar files.
