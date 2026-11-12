---
title: "Parrot OS"
description: "Debian-based Linux distribution for cybersecurity, privacy and everyday development, in Security, Home and other editions."
category: Operating systems
icon: parrot.svg
iconLink: https://www.parrotsec.org/
mark: PA
repository: https://nest.parrot.sh
license: Per-package licenses
funding:
  custom:
    - label: "Donate to Parrot (crypto only)"
      url: https://www.parrotsec.org/donate/
screenshot:
  src: parrot-source.webp
  alt: "Parrot OS 5.0.1 live desktop with the Install Parrot launcher and a low-poly parrot wallpaper"
  width: 1366
  height: 768
  credit: "VARGUX"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Parrot_OS_5.0.1-Electro_Ara-04-05-2022.png
  license: "GPL"
  commons: true
  captionNote: "Parrot OS 5.0.1 live session, captured in 2022. Historical screenshot, not the current 7.4 release or our install. Resized and recompressed to WebP."
---

Parrot OS is a Debian-based Linux distribution from the Parrot Project. The
Security edition is a penetration testing and forensics platform; the Home
edition is a daily-use desktop with privacy tools and no preinstalled attack
tooling. HTB, IoT and cloud/container editions serve narrower uses. Use its
security tools only on systems you own or have explicit permission to test.

Parrot is derived from Debian and inherits its package licensing, so there is
no single license for the whole distribution. The project's
[download page](https://www.parrotsec.org/download/) states that the projects
maintained by the Parrot team are released under the GPL. Check each package's
copyright file for its own terms.

Parrot is the name and mark of the Parrot Project. This is an independent
listing, not an official Parrot resource or an endorsement.

## Quick start

*Researched from Parrot's download page and documentation on November 12,
2026. We have not downloaded, booted or installed an operating system.*

### Pick an edition

Use the [official download page](https://www.parrotsec.org/download/) and
choose an edition for your use case: Security for penetration testing (800+
tools, 4 GB RAM minimum, 8 GB recommended, 40 GB storage), Home for daily
use and development (2 GB RAM minimum), or the HTB, IoT and special images
where they fit. AMD64 and ARM64 ISOs are offered alongside VM images
(OVA, VMDK, QCOW2, Vagrant), WSL and Docker images.

### Verify and write the image

Each release publishes a file of hashes generated right after the images are
built, and the package repository is signed with the project's GPG key. Check
your downloaded image against the published hashes before writing it. Writing
an ISO overwrites the target USB drive: confirm the device and back up
anything you need first.

### Try live, then install

Boot the USB from your firmware's boot menu. Parrot runs in live mode so you
can test hardware and the desktop before deciding; live mode can also create a
persistent partition to keep data. Start the installer from the live session
when ready, and review its target disk before continuing - an installer can
erase data.

## First use

Run the system's package manager to update; Parrot's repositories periodically
synchronize with Debian's stable branch, with security-tool updates imported
by the Parrot team. The Security edition's tools come from the
`parrot-tools-full` metapackage, while the Home edition carries only the
everyday configuration. Confirm the edition and release you installed before
trusting it with work.

## NixOS compatibility

Parrot OS is an operating system, not a NixOS application or service. Try it
in a virtual machine or on separate hardware rather than expect a Nix package
to replace NixOS. Back up any system you intend to replace.

## Documentation

- [Parrot OS download](https://www.parrotsec.org/download/)
- [Parrot documentation](https://www.parrotsec.org/docs/)
- [Donate to Parrot](https://www.parrotsec.org/donate/)
- [Project source (GitLab)](https://nest.parrot.sh)
