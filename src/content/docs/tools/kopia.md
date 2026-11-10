---
title: "Kopia"
description: "Cross-platform backup tool with fast, incremental backups and both a GUI and a command line."
category: Backup
icon: kopia.svg
iconDark: kopia-dark.svg
mark: KP
repository: https://github.com/kopia/kopia
license: Apache-2.0
managedHosting: false
screenshot:
  src: kopia.webp
  alt: "Terminal output of kopia snapshot create and snapshot list on a small sample folder"
  width: 1147
  height: 400
  credit: Kopia
  own: true
  terminal: true
  version: "0.23.1"
  captionNote: "Our own run on a repository made beforehand, with sample files. Kopia's routine maintenance lines are left out and the sample path is shortened; the rest is unedited apart from line wrapping."
---

Kopia backs up folders to local disks, network storage or cloud storage with incremental snapshots. The same data can be managed from the command line or the desktop app.

It is one of two backup listings. [restic](/tools/restic/) is a command-line-first alternative.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows and macOS

```powershell
winget install Kopia.KopiaCLI
winget install Kopia.KopiaUI
```

The [installation guide](https://kopia.io/docs/installation/) also offers Scoop (`scoop bucket add kopia https://github.com/kopia/scoop-bucket.git` then `scoop install kopia`), a `KopiaUI-Setup` installer for Windows, and Homebrew on macOS (`brew install kopia` for the CLI, `brew install --cask kopiaui` for the app).

### Linux

The guide lists an APT repository for Debian and Ubuntu (it covers both the command line tool and KopiaUI) and Docker images. Follow its Linux section for the repository setup. We don't copy those steps here so they stay current.

## First steps

Before anything else you need somewhere to store the backup. Kopia doesn't provide storage, so pick a folder on another drive, a NAS, or a cloud bucket you already pay for.

With the command line, from the project's [getting started guide](https://kopia.io/docs/getting-started/):

```bash
kopia repository create filesystem --path /path/to/backup-folder
```

It asks for a password that encrypts everything. Keep that password safe, because without it the backup can't be read. Then back up one folder and list what you have:

```bash
kopia snapshot create ~/Documents
kopia snapshot list
```

In KopiaUI, create the repository in the setup screen, then add a policy for the folder in the Policies tab. Browse a snapshot to restore single files. Test a restore of one file before relying on it.
