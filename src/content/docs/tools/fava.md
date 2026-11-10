---
title: "Fava"
description: "Web interface for Beancount plain-text accounting, run on your own computer."
category: Finance
icon: fava.svg
mark: FV
repository: https://github.com/beancount/fava
license: MIT
managedHosting: false
screenshot:
  src: fava.webp
  alt: "Fava income statement with a bar chart by month and expense and income account trees from Beancount's example file"
  width: 1440
  height: 960
  credit: Fava
  own: true
  version: "1.30.16"
  captionNote: "Our own run on the sample file that bean-example generates, with Beancount 3.2.3. Generated data, not real accounts."
---

Fava shows reports, charts and an editor for a [Beancount](/tools/beancount/) ledger in your browser. You run it locally against your own text files; it is not a hosted service.

Fava needs Beancount, which is listed separately.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### pip (Windows, macOS, Linux)

Fava needs Python 3 and pulls in Beancount with it:

```bash
pip3 install fava
```

The project's [install notes](https://beancount.github.io/fava/usage.html) also describe installing it in an isolated environment with `uv`.

### Homebrew and distro packages

Homebrew has a `fava` formula, and Debian and Ubuntu have a `fava` package. These are third-party packaging and can lag behind the project's release.

```bash
brew install fava
```

## First steps

Point Fava at a Beancount file (you can use the one from the [Beancount](/tools/beancount/) first steps):

```bash
fava first.beancount
```

Then open http://localhost:5000 in a browser. The project also runs an online demo, linked from its [documentation](https://beancount.github.io/fava/), if you want to look before installing.
