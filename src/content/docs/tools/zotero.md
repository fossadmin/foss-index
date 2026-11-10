---
title: "Zotero"
description: "Reference manager for collecting, citing and sharing research."
category: Documents
icon: zotero.png
mark: ZO
repository: https://github.com/zotero/zotero
license: AGPL-3.0
managedHosting: false
screenshot:
  src: zotero.webp
  alt: "Zotero 7 library with a collection tree, an item list and an item pane with abstract and attachment"
  width: 1170
  height: 706
  credit: "the Zotero website"
  sourceUrl: https://www.zotero.org/
  captionNote: "Image from the Zotero home page, labeled Zotero 7.0 in its file name. Sample library items."
---

Zotero collects sources from web pages, stores PDFs and notes, and builds citations and bibliographies. This listing covers the desktop client; the repository's COPYING file states the AGPLv3.

Zotero's optional sync and storage service is run by the project and is a separate matter from the client code.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows and macOS

Download from [zotero.org/download](https://www.zotero.org/download/). On Windows run the setup program. On macOS open the `.dmg` and drag Zotero to Applications, per the [installation page](https://www.zotero.org/support/installation).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask zotero
```

### Linux

Download the tarball, extract it, and run `zotero` from that directory. The installation page also shows how to symlink the `zotero.desktop` file into `~/.local/share/applications/` so it appears in your menu.

## First steps

- Also install the **Zotero Connector** for your browser from the download page. It saves papers, pages and books to Zotero in one click.
- In the app, right-click **My Library** to make a collection. Use tags and attach files or notes to items.
- To add something, open a page in your browser and click the Connector button. A book or article icon adds one item. A folder icon opens a list to choose from.

Source: [Zotero quick start guide](https://www.zotero.org/support/quick_start_guide).
