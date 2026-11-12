---
title: "darktable"
description: "RAW photo workflow and developing application."
category: Photos
icon: darktable.svg
mark: DT
repository: https://github.com/darktable-org/darktable
license: GPL-3.0
managedHosting: false
screenshot:
  src: darktable.webp
  alt: "darktable 2.4.4 in the darkroom view with a photo of a shopping mall open and the module list on the right"
  width: 1280
  height: 696
  credit: "VulcanSphere (software: Johannes Hanika)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Darktable_2.4.4_screenshot.png
  license: "GPL-3.0"
  commons: true
  captionNote: "darktable 2.4.4 from 2018, an old release. The current interface looks different. The shown photo is part of the Commons upload."
---

darktable manages and develops RAW photos on your desktop without altering the original files. It pairs with [Immich](/tools/immich/): darktable is where you edit, Immich is where you store and browse.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The install page offers an AppImage for x86-64 and aarch64, and notes a Flatpak that does not include darktable's AI features. Distribution packages also exist; see the page for the project's notes.

### Windows and macOS

Installers are on the [darktable install page](https://www.darktable.org/install/). On macOS, if you see the warning that the app could not be verified, the project documents a fix on that page. It involves removing the quarantine flag from the app, so read the page first and only do it for a download you got from darktable.org.

### NixOS

nixpkgs packages darktable as `darktable` (source: [pkgs/by-name/da/darktable/package.nix](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/da/darktable/package.nix)):

```nix
environment.systemPackages = [ pkgs.darktable ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch darktable from the application menu.

## First steps

- Open darktable. It starts in the **lighttable** view, where you import photos.
- Use **import** to add a folder of pictures, double-click one to open it in the **darkroom** and adjust it with the modules on the right.
- darktable keeps edits in a sidecar `.xmp` file next to each original and in its own library, so your original files are not overwritten.
- Export edited copies from the lighttable's export panel.

Source: [darktable's user manual](https://docs.darktable.org/usermanual/stable/en/).
