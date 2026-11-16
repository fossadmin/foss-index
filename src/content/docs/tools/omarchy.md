---
title: "Omarchy"
description: "Opinionated, installable Linux OS by DHH: a curated Arch and Hyprland desktop that sets up a finished system in minutes."
added: 2026-11-12
category: Operating systems
icon: omarchy.svg
iconLink: https://omarchy.org/
mark: OM
repository: https://github.com/omacom/omarchy
license: MIT
funding:
  custom:
    - label: "Omarchy patron program"
      url: https://omarchy.org/patrons/
screenshot:
  src: omarchy-source.webp
  alt: "Omarchy desktop in the Tokyo Night OLED theme with Neovim, system monitors and the power menu open"
  width: 1200
  height: 675
  credit: "Omarchy (omarchy.org theme preview)"
  sourceUrl: https://omarchy.org/themes/
  captionNote: "Official theme preview from omarchy.org showing a themed Omarchy desktop with editor and monitors. A project promotional image."
---

Omarchy is an opinionated Linux operating system from David Heinemeier
Hansson (DHH): an Arch base with a curated Hyprland desktop, fixed defaults
and themed tools, installed as a finished system rather than assembled by
hand. It began as a setup script for Arch and is now its own installable OS
with x86 and ARM64 ISOs and a native Apple Silicon installer.

The Omarchy source is [MIT-licensed](https://github.com/omacom/omarchy/blob/master/LICENSE);
like any distribution, the packages it ships carry their own licenses.
Omarchy is a project name and mark ("Omarchy™" on the project's site). This
is an independent listing, not an official Omarchy resource or an
endorsement.

## Quick start

*Researched from omarchy.org on November 12, 2026. We have not downloaded,
booted or installed an operating system.*

### Get the image

Use the [official site](https://omarchy.org/): the current release (4.5.0 at
our check) is offered as x86 and ARM64 ISOs with SHA-256 checksums and
signatures, alongside an installer that puts Omarchy next to macOS on Apple
Silicon Macs. ARM64 support is preliminary and limited to the specific
hardware the site names.

### Verify and write

Check the ISO against the published SHA-256 checksum (and signature where
offered) before writing it. Writing the image overwrites the target USB
stick: confirm the device and back up anything you need first.

### Install

Boot the USB and answer the installer's handful of questions; the project
describes full-disk or dual-boot installation that hands back a finished
desktop. Review the target disk before continuing - an installer can erase
data. A virtual machine image is offered if you want to try Omarchy first.

## First use

The system arrives themed and preconfigured; the Omarchy manual on the
project site covers the keybindings, the bundled tools and how to change
themes or defaults. Updates follow Arch's rolling model, so update regularly.

## NixOS compatibility

Omarchy is an operating system, not a NixOS application or service. Its
curated setup is a different philosophy from NixOS's declarative
configuration: try it in a virtual machine or on separate hardware. Back up
any system you intend to replace.

## Documentation

- [Omarchy site and downloads](https://omarchy.org/)
- [Omarchy manual](https://omarchy.org/manual/)
- [Source and releases (GitHub)](https://github.com/omacom/omarchy)
- [Sponsor Omacom](https://github.com/sponsors/omacom)
