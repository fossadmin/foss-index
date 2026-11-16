---
title: "Tails"
description: "Amnesic live operating system on a USB stick: routes connections through Tor and leaves no trace on the computer by default."
added: 2026-11-12
category: Operating systems
icon: tails.svg
iconLink: https://tails.net/
mark: TA
repository: https://gitlab.tails.boum.org/tails/tails
license: Per-package licenses
funding:
  custom:
    - label: "Donate via the Tor Project"
      url: https://tails.net/donate/
screenshot:
  src: tails-source.webp
  alt: "Tails 6.13 desktop with the About Tails dialog and Tor Browser showing its private-browsing start page"
  width: 1920
  height: 1080
  credit: "OS: The Tails Project; Tor Browser: Tor Project; screenshot: Paowee"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Tails_screenshot_6.x.png
  license: "GPL-3.0"
  commons: true
  captionNote: "Tails 6.13 desktop, captured in 2025. Historical screenshot, not the current 7.x release or our install. Resized and recompressed to WebP."
---

Tails is a live operating system you start from a USB stick instead of
installing. It routes connections through the Tor network, leaves no trace on
the computer by default, and offers an encrypted persistent storage for what
you choose to keep. It aims to protect against surveillance and censorship on
hardware you do not control.

Tails' own source code is
[released under the GNU GPL, version 3 or above](https://tails.net/doc/about/license/),
while most included software comes from Debian packages under their own
licenses; Tails also ships closed-source binary firmware so it works on more
hardware. Tails is a registered trademark of The Tor Project, Inc. This is an
independent listing, not an official Tails resource or an endorsement.

## Quick start

*Researched from Tails' install documentation on November 12, 2026. We have
not downloaded, written or booted an operating system.*

### Download and verify

Follow the [official install page](https://tails.net/install/) and download
the USB image (version 7.17 at our check). Verify the download with the
project's browser verification or the documented GnuPG method - verification
matters more for a privacy tool, not less.

### Write the USB

Write the verified image to a USB stick of sufficient size with the tool the
install guide names for your system. Writing the image overwrites the whole
USB stick: confirm the device and back up anything you need first.

### Boot and try

Boot the computer from the USB stick (PC or Mac; Tails does not work on
smartphones or tablets, because their hardware differs from computers).
Everything runs from the stick: you can use Tails without changing the
computer's own system, and remove it by shutting down and unplugging.

## First use

Connect to the network and let the Tor Connection assistant establish a
connection before browsing. Set up an encrypted persistent storage only for
what you genuinely need to keep. Apply Tails upgrades when the project offers
them; read the release notes on the install page for any manual steps.

## NixOS compatibility

Tails is a live operating system, not a NixOS application or service. Run it
from its own USB stick rather than expect a Nix package to reproduce it.

## Documentation

- [Install Tails](https://tails.net/install/)
- [Tails license and source code](https://tails.net/doc/about/license/)
- [Tails documentation](https://tails.net/doc/)
- [Donate via the Tor Project](https://tails.net/donate/)
