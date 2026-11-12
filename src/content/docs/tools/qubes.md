---
title: "Qubes OS"
description: "Security-focused desktop operating system that isolates your work into separately trusted virtual machines called qubes."
category: Operating systems
icon: qubes.png
iconLink: https://www.qubes-os.org/
mark: QU
repository: https://github.com/QubesOS
license: Per-package licenses
funding:
  custom:
    - label: "Donate to Qubes OS"
      url: https://www.qubes-os.org/donate/
screenshot:
  src: qubes-source.webp
  alt: "Qubes OS 4.1.2 desktop with Fedora and Debian terminal qubes and a Whonix Tor Browser qube side by side"
  width: 1920
  height: 1080
  credit: "The Qubes OS Project, Invisible Things Labs, Joanna Rutkowska"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Qubes_OS_ws_4-1-2.png
  license: "GPL"
  commons: true
  captionNote: "Qubes OS 4.1.2 workspace from 2023 showing several qubes at once. Historical screenshot, not the current 4.3.2 release or our install. Resized and recompressed to WebP."
---

Qubes OS is a security-focused operating system that isolates different parts
of your digital life into separate virtual machines, called qubes, so a
compromise in one stays contained. It is endorsed by organizations such as
the Freedom of the Press Foundation and Let's Encrypt for sensitive work.

Qubes is free and open-source software. It is built from many components
under their own licenses (the core administration component, for example, is
LGPL-2.1), so there is no single license for the whole system. Qubes is a
mark of the project. This is an independent listing, not an official Qubes
resource or an endorsement.

## Quick start

*Researched from Qubes' download page, installation documentation and system
requirements on November 12, 2026. We have not downloaded, booted or
installed an operating system.*

### Check hardware first

Qubes needs a 64-bit Intel or AMD machine with hardware virtualization:
minimum 6 GB RAM and 32 GB storage with VT-x/EPT (or AMD-V) and VT-d (or
AMD-Vi). The recommended target is 16 GB RAM, a 128 GB SSD and Intel
integrated graphics. Consult the
[system requirements](https://doc.qubes-os.org/en/latest/user/hardware/system-requirements.html)
and the hardware compatibility list before choosing a machine - meeting the
minimums does not guarantee a successful install.

### Download and verify

Get the current ISO (Qubes OS 4.3.2 at our check) from the
[official downloads page](https://www.qubes-os.org/downloads/). Verify it with
the detached PGP signature and release signing key linked beside the image;
the project documents this verification as part of installation security.
Third-party mirrors are outside the project's control, which is exactly why
the signature check matters.

### Write and install

Write the verified ISO to a USB drive (this overwrites the target drive -
confirm the device and back up first), boot it, and follow the installation
guide. The installer sets up disk encryption and your initial qubes.

## First use

Review the default qubes (work, personal, untrusted and the disposable
templates) and update dom0 and templates through the Qubes Update tool. Move
existing data carefully; qubes are isolated by design, so copying between
them uses the project's own mechanisms.

## NixOS compatibility

Qubes OS is an operating system built on the Xen hypervisor, not a NixOS
application or service. Test it in a spare machine or a supported virtual
setup rather than expect a Nix package to replace NixOS. Back up any system
you intend to replace.

## Documentation

- [Download Qubes OS](https://www.qubes-os.org/downloads/)
- [Installation guide and documentation](https://doc.qubes-os.org/)
- [System requirements](https://doc.qubes-os.org/en/latest/user/hardware/system-requirements.html)
- [Donate to Qubes OS](https://www.qubes-os.org/donate/)
