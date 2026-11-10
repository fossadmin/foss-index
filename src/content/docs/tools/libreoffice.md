---
title: "LibreOffice"
description: "Office suite for documents, spreadsheets and presentations."
category: Documents
icon: libreoffice.png
mark: LO
repository: https://github.com/LibreOffice/core
license: MPL-2.0
funding:
  custom:
    - label: "Donate"
      url: https://www.libreoffice.org/donate/
managedHosting: false
screenshot:
  src: libreoffice.webp
  alt: "LibreOffice Writer with a document open beside the Navigator sidebar showing a heading outline"
  width: 1024
  height: 768
  credit: "the LibreOffice website"
  sourceUrl: https://www.libreoffice.org/discover/libreoffice/
  captionNote: "Image from the LibreOffice product page showing Writer. The release is not stated."
---

LibreOffice is a desktop office suite for word processing, spreadsheets and presentations. It runs on your own computer; there is no server to set up.

The license is the Mozilla Public License 2.0, as stated on the project's [licenses page](https://www.libreoffice.org/licenses/). The GitHub repository is a read-only mirror, and GitHub labels it GPL-3.0, which does not match the project's own statement. Development happens on the project's Gerrit.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The download page offers deb and rpm archives. Many distributions also ship LibreOffice in their own repositories. The Flathub package is verified by its publisher:

```bash
flatpak install flathub org.libreoffice.LibreOffice
```

### Windows and macOS

Download from [libreoffice.org/download](https://www.libreoffice.org/download/download-libreoffice/). Pick the build for your processor: x86-64 or ARM64 on Windows, Apple Silicon or Intel on macOS.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask libreoffice
```

## First steps

- Open LibreOffice. The Start Center shows Writer (documents), Calc (spreadsheets), Impress (presentations), Draw and others.
- Open a Word or Excel file to see how it handles it, or start a new document.
- Save in the default OpenDocument format, or choose **Save As** and pick a Microsoft format when you need to share with Office users.
- **File > Export as PDF** makes a PDF.

The project's [Getting Started Guide](https://documentation.libreoffice.org/en/english-documentation/getting-started-guide/) is free.
