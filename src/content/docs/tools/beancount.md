---
title: "Beancount"
description: "Double-entry accounting from plain text files."
category: Finance
icon: beancount.png
mark: BC
repository: https://github.com/beancount/beancount
license: GPL-2.0
funding:
  githubSponsors: https://github.com/sponsors/blais
managedHosting: false
screenshot:
  src: beancount.webp
  alt: "Terminal text of bean-check and bean-query printing account balances from a three-line sample ledger"
  width: 1375
  height: 310
  credit: Beancount
  own: true
  terminal: true
  version: "3.2.3"
  captionNote: "Our own run on a made-up ledger; the text is unedited."
---

Beancount keeps your accounts in a plain-text ledger and checks them with a command-line tool. Because the books are ordinary text files, they work with version control and any editor.

The project's pyproject.toml declares GPL-2.0-only. [Fava](/tools/fava/) adds a web view on top. If you want a different tool for the same job, see [hledger](/tools/hledger/) and [Ledger](/tools/ledger/).

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### pip (Linux, Windows, macOS)

Beancount is a Python package and needs a working Python 3 (the [install guide](https://beancount.github.io/docs/installing_beancount/) names the minimum version):

```bash
pip install beancount
```

### Distro packages and Homebrew

Debian and Ubuntu have a `beancount` package, and Homebrew has a `beancount` formula. Both are third-party packaging and can lag behind the project's own release.

```bash
brew install beancount
```

### NixOS

nixpkgs packages Beancount as `beancount` (source: [pkgs/development/python-modules/beancount/default.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/development/python-modules/beancount/default.nix)):

```nix
environment.systemPackages = [ pkgs.beancount ];
```

Rebuild with `sudo nixos-rebuild switch`, then run `bean-check` on your ledger file from a terminal.

## First steps

Create a text file called `first.beancount` with the project's minimal example (two accounts and one transaction):

```
2014-01-01 open Assets:Checking
2014-01-01 open Equity:Opening-Balances

2014-01-02 * "Deposit"
  Assets:Checking           100.00 USD
  Equity:Opening-Balances
```

Check it:

```bash
bean-check first.beancount
```

No output means the file loads without errors. To look at realistic sample data before you enter your own, run `bean-example > example.beancount`. To browse a ledger in a web page, pair Beancount with [Fava](/tools/fava/).

Sources: the [getting started guide](https://beancount.github.io/docs/getting_started_with_beancount/) and the [example file generator](https://beancount.github.io/docs/tutorial_example/).
