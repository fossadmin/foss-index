---
title: "Logseq"
description: "Privacy-first knowledge management with outlines and linked notes."
category: Notes
icon: logseq.png
mark: LQ
repository: https://github.com/logseq/logseq
license: AGPL-3.0
funding:
  openCollective: https://opencollective.com/logseq
managedHosting: false
screenshot:
  src: logseq.webp
  alt: "Logseq with the sidebar open and a journal page holding a nested outline of tasks and notes"
  width: 1280
  height: 773
  credit: Logseq
  own: true
  version: "2.0.2"
  captionNote: "Our own capture of a fresh graph with a sample journal and outline."
---

Logseq is a knowledge management and collaboration platform that stores notes as local files and links them into a graph. The repository's LICENSE.md is the GNU AGPL version 3.

There are two versions. The file-based version is the established one. The README describes a newer Database version with DB graphs as beta, with a warning that data loss is possible and a recommendation for automated backups; its mobile app and real-time collaboration are alpha. Back up your graphs either way.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows and macOS

Download from [logseq.com/downloads](https://logseq.com/downloads).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask logseq
```

### Linux

The download page offers an AppImage and recommends AppImageLauncher for desktop integration. The Flathub package is verified by its publisher:

```bash
flatpak install flathub com.logseq.Logseq
```

## First steps

- On first start Logseq asks you to create a *graph*, which is a folder on your disk holding your pages as plain files. Pick or create the folder yourself, in a place you back up.
- Start on the **Journals** page: type a bullet, press Tab to indent, and link pages with `[[double brackets]]`.
- To bring in existing Markdown notes, the docs describe creating a graph from existing Markdown files.

Source: [Logseq docs](https://docs.logseq.com/).
