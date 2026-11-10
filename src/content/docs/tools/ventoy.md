---
title: "Ventoy"
description: "Make one USB drive that boots many ISO, WIM, IMG, VHD and EFI files from a menu."
category: Utilities
icon: ventoy.png
mark: VT
repository: https://github.com/ventoy/Ventoy
license: GPL-3.0-or-later
funding:
  liberapay: https://liberapay.com/Ventoy
  openCollective: https://opencollective.com/ventoy
managedHosting: false
screenshot:
  src: ventoy.webp
  alt: "The Ventoy boot menu on a USB drive listing several ISO files"
  width: 1024
  height: 768
  credit: "Fedkad"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Ventoy-1.0.png
  license: "GPL-3.0"
  commons: true
  captionNote: "The Ventoy boot menu from a 1.0.x release, March 2021. Newer releases may look different."
---

Ventoy writes a small boot loader to a USB drive once. After that you copy ISO and other image files onto the drive and pick one from a boot menu. There is no need to reformat the drive for each image. It supports legacy BIOS and UEFI, and x86, ARM64 and MIPS64EL machines.

## License and what is bundled

Ventoy's own code is GPLv3 or later, per the project's [license file](https://github.com/ventoy/Ventoy/blob/master/License/license-ventoy.txt). It also builds on other open source projects such as GRUB, EDK2, BusyBox and 7-Zip. Their code keeps their own licenses, and some are included as prebuilt binaries. The project lists every bundled binary, with build steps or an upstream download in its [blob list](https://github.com/ventoy/Ventoy/blob/master/BLOB_List.md) and [build guide](https://github.com/ventoy/Ventoy/blob/master/DOC/BuildVentoyFromSource.txt). We have not rebuilt the release downloads or compared their hashes.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

**Installing Ventoy erases the USB drive.** Identify the drive carefully first, for example with `lsblk`, and make sure it is the USB stick and not an internal disk.

Download `ventoy-x.x.xx-linux.tar.gz`, extract it, and run as root:

```bash
sudo sh Ventoy2Disk.sh -i /dev/sdX
```

`-i` installs and fails if Ventoy is already on the disk. `-u` updates an existing install and keeps your files. The guide also describes a GTK or Qt app and a web interface for Linux.

### Windows

**Installing Ventoy erases the USB drive it is installed to.** Back up anything on it first and double-check which drive you pick.

Per the [install guide](https://www.ventoy.net/en/doc_start.html): download `ventoy-x.x.xx-windows.zip` from the project, unzip it, run `Ventoy2Disk.exe`, select your USB device and click Install. By default it lists only USB drives, to prevent mistakes.

### macOS

We found no macOS installer in the project's install guide, which covers Windows and Linux. Prepare the drive on one of those.

## First steps

- After install, the large partition on the stick looks like a normal drive. Copy ISO files (or WIM, IMG, VHD, EFI files) onto it. You don't need to reformat it for each image.
- Boot a computer from the USB stick. Ventoy shows a menu of the files you copied. Pick one to boot it.
- To update Ventoy on the same stick later, use the update option in the installer, not a fresh install.

The project recommends checking the SHA-256 hash of the download.
