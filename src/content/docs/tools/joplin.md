---
title: "Joplin"
description: "Note-taking apps with sync, in Markdown."
category: Notes
mark: JP
repository: https://github.com/laurent22/joplin
license: AGPL-3.0-or-later
funding:
  githubSponsors: https://github.com/sponsors/laurent22
  custom:
    - label: "Patreon"
      url: https://www.patreon.com/joplin
    - label: "Donate"
      url: https://joplinapp.org/donate/
screenshot:
  src: joplin.webp
  alt: "Joplin desktop app with the welcome notebook open on a note about importing and exporting notes"
  width: 1280
  height: 730
  credit: Joplin
  own: true
  version: "3.7.22"
  captionNote: "The official 3.7.22 AppImage on first run, showing the built-in welcome notes; the first-run notice bar at the bottom is cropped out."
managedHosting: false
---

Joplin is a privacy-focused note-taking app for Windows, macOS, Linux and mobile, with sync to a service you choose.

This listing covers the Joplin apps. The repository's license file says code is AGPL-3.0-or-later unless a directory has its own license file, and `packages/server` has one: the Joplin Server Personal Use License, which is not an open-source license. Joplin Server is therefore not part of this listing.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows and macOS

Download from [joplinapp.org/help/install](https://joplinapp.org/help/install/). Windows also has a portable build you can copy to a USB key.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask joplin
```

### Linux

The project recommends its install script, which also sets up the desktop icon:

```bash
wget -O - https://raw.githubusercontent.com/laurent22/joplin/dev/Joplin_install_and_update.sh | bash
```

That pipes a script from the internet into your shell. If you prefer, download it first and read it.

## First steps

- Create a notebook, then a note in it, and write in Markdown.
- Notes stay on your device until you set up sync. Under the desktop app's options, choose a synchronisation target such as Nextcloud or Dropbox. Joplin supports several. See [Synchronisation](https://joplinapp.org/help/apps/sync/).
- The Web Clipper browser extension saves pages and screenshots into Joplin.
- If you sync, turn on end-to-end encryption in the options before adding a lot of notes.
