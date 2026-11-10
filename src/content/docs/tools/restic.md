---
title: "restic"
description: "Fast, secure command-line backup program."
category: Backup
icon: restic.png
mark: RS
repository: https://github.com/restic/restic
license: BSD-2-Clause
managedHosting: false
screenshot:
  src: restic.webp
  alt: "Terminal output of restic init, backup and snapshots on a small sample folder"
  width: 1100
  height: 730
  credit: restic
  own: true
  terminal: true
  version: "0.19.1"
  captionNote: "Our own run with a throwaway repository and sample files; the text is unedited."
---

restic is a command-line backup program that stores encrypted, deduplicated snapshots in a local folder or on a remote backend. It is a single binary and fits scripts and scheduled jobs.

Choose [Kopia](/tools/kopia/) instead if you want a graphical app.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### macOS and Linux

From the [installation docs](https://restic.readthedocs.io/en/stable/020_installation.html). Choose the one line for your system. Do not run them all:

```bash
brew install restic      # macOS
apt-get install restic   # Debian
dnf install restic       # Fedora
pacman -S restic         # Arch
zypper install restic    # openSUSE
```

Distribution packages can be older than the current release. The page also covers a Docker image and downloading the binary.

### Windows

Choose one of these. Do not run them all.

```powershell
scoop install restic
winget install --exact --id restic.restic --scope Machine
```

The docs recommend `--scope Machine` with WinGet for system-wide backups.

## First steps

Create a repository somewhere other than the disk you're backing up. restic asks for a password and encrypts everything with it. If you lose the password the backup can't be read.

```bash
restic -r /path/to/repo init
restic -r /path/to/repo backup ~/work
restic -r /path/to/repo snapshots
```

Test a restore into a new, empty folder, never over your live files:

```bash
restic -r /path/to/repo restore --target /tmp/restore-work SNAPSHOT_ID
restic -r /path/to/repo check
```

Don't use `forget` or `prune` until you've read the [documentation](https://restic.readthedocs.io/en/stable/010_introduction.html), because they delete backup data.
