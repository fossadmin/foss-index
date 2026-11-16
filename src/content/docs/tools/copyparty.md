---
title: Copyparty
description: Portable single-file file server with a web UI - uploads, downloads, search, media players and sharing over HTTP, WebDAV, FTP, SFTP and SMB.
added: 2026-11-12
category: File Sync
tags:
- Self-hosted
icon: copyparty.svg
iconLink: https://github.com/9001/copyparty
mark: CY
repository: https://github.com/9001/copyparty
license: MIT
screenshot:
  src: copyparty-source.webp
  alt: "Copyparty web interface browsing a music folder with album art, file table and an audio player bar"
  width: 1383
  height: 525
  credit: copyparty (9001)
  sourceUrl: https://github.com/9001/copyparty/blob/hovudstraum/README.md
  license: MIT
  captionNote: "Official README screenshot of the copyparty web UI."
---

Copyparty is an MIT-licensed portable file server packed into a single
Python file: point it at a folder and you get a fast web UI for uploads,
downloads, thumbnails, full-text and media search, plus WebDAV, FTP, SFTP
and SMB from the same process. It runs almost anywhere Python does, needs
no database for a basic share, and scales from tossing a file to a phone to
serving a whole media library.

The name and logo belong to the project. This is an independent listing,
not an official copyparty resource or an endorsement.

## Quick start

*Researched from copyparty's README and documentation on November 12, 2026.
We have not installed or run it.*

### Linux / macOS / Windows

The README's quickest route is the single-file script with Python 3:

```sh
python3 copyparty-sfx.py -v /path/to/share:/mnt/share:r
```

then open `http://127.0.0.1:3923`. The `:r` makes the share read-only; use
`:rw` for uploads, and add accounts before anything writable or reachable
beyond your machine - by default a share is accessible to anyone who can
reach the port. PyPI (`pip install copyparty`) and a Docker image are the
other documented routes.

### NixOS

Copyparty is packaged in nixpkgs as `copyparty`. For a quick share:

```sh
nix run nixpkgs#copyparty -- -v /path/to/share:/mnt/share:r
```

There is no NixOS service module at check time; for a permanent service,
wrap the package in your own systemd unit.

## First use

Lock down permissions before exposing a port: read the accounts and
volume-flag sections of the README, prefer read-only shares by default, and
put it behind TLS (a reverse proxy or its own flags) outside a trusted LAN.

## Documentation

- [GitHub repository](https://github.com/9001/copyparty)
- [README and guides](https://github.com/9001/copyparty/blob/hovudstraum/README.md)
