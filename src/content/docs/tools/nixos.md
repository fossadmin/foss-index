---
title: "NixOS"
description: "Declarative Linux distribution built on the Nix package manager, with atomic upgrades and rollbacks."
category: Operating systems
icon: nixos.svg
mark: NI
repository: https://github.com/NixOS/nixpkgs
license: Per-package licenses
funding:
  custom:
    - label: "Donate to the NixOS Foundation"
      url: https://opencollective.com/nixos
screenshot:
  src: nixos-26.05-installer-desktop.webp
  alt: "NixOS graphical installer at the desktop-selection step, with GNOME selected and other desktop choices listed"
  width: 914
  height: 515
  credit: "NixOS graphical installer"
  own: true
  version: "26.05"
  captionNote: "Captured by FOSSadmin in a virtual machine on November 10, 2026. This is the installer's desktop-selection step, not a default NixOS desktop. Cropped to the installer window and a small border; converted from the supplied JPEG to WebP."
---

NixOS is a Linux distribution built on the Nix package manager. System
configuration - packages, services, users and settings - is written
declaratively in the Nix language, starting from
`/etc/nixos/configuration.nix`, and upgrades are atomic: if something
breaks, the previous system is one boot-menu entry away.

The system is built from nixpkgs, the Nix package collection. The nixpkgs
repository itself is MIT-licensed, and each package it builds carries its
own license in its metadata.

## Quick start

*Checked against the project's documentation on November 10, 2026. We have
not run these steps ourselves.*

### Get the image

Download the graphical ISO image (64-bit Intel/AMD or ARM) from
https://nixos.org/download/ - it boots into a live desktop with the
graphical installer, which the NixOS manual recommends for desktop users.
The minimal ISO image is the console route for experienced users. SHA-256
checksums sit next to the images on the download page.

### Write it to a USB stick

The manual's installation chapter covers writing the image to a USB stick.
It points graphical users to balenaEtcher, noting that it reports errors
and usage statistics by default, and to USBImager, which does not connect
to the internet. The terminal method, `dd` to the whole device, is
documented alongside them.

### Try it, then install

Boot from the USB through your firmware's boot menu (often F12, F11 or
Esc). The live session is a full desktop; start the installer and follow
the steps - language, location, keyboard, user account, desktop (GNOME,
Plasma, others or none), partitioning (erase disk, with optional
encryption) - then install, about fifteen minutes, remove the stick and
reboot. From then on the system is managed by editing
`/etc/nixos/configuration.nix` and running `nixos-rebuild switch`.


## Installer welcome

<figure class="shot">
  <img src="/screenshots/nixos-26.05-installer-welcome.webp" alt="Welcome screen of the NixOS 26.05 graphical installer, showing the language selector and installer steps" width="914" height="515" loading="lazy" decoding="async" />
  <figcaption>Our own screenshot of the NixOS 26.05 graphical installer's welcome screen, captured by FOSSadmin in a virtual machine on November 10, 2026. Cropped to the installer window and a small border; converted from the supplied JPEG to WebP (<a href="/credits/screenshots/#nixos-26-05-installer-welcome-webp">image credits</a>).</figcaption>
</figure>
