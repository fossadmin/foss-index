---
dripsEligible: false
title: Thunderbird
description: Email, calendars, contacts and feeds in a desktop client you control.
category: Communication
icon: thunderbird.png
mark: TB
repository: https://hg.mozilla.org/comm-central/
license: MPL-2.0
funding:
  custom:
  - label: Donate to Thunderbird
    url: https://www.thunderbird.net/en-US/donate
screenshot:
  src: thunderbird-source.webp
  alt: Thunderbird mail view with folders, message list and a welcome message
  width: 1440
  height: 902
  credit: Thunderbird
  sourceUrl: https://github.com/thunderbird/flatpak-screenshots/blob/0d6ce3118609b042a1f091eb66d0c77471a03902/image_1.png
  license: CC0-1.0
  captionNote: Project-published Thunderbird 140 sample interface. It predates the
    recorded release; not our install.
---

Thunderbird brings email, calendars, contacts and RSS feeds together without
requiring a proprietary desktop suite. It connects to accounts you already
have: it is a client, not a mail hosting service or a mail server.

The desktop code is MPL-2.0. The Thunderbird name and logo are Mozilla
Foundation trademarks, used here to identify the software, not to imply endorsement.

## Quick start

*Researched against upstream documentation on November 11, 2026. We have not
installed Thunderbird or run these steps as part of this listing.*

### Linux

Thunderbird's [official Linux download page](https://www.thunderbird.net/en-US/download/linux/)
links to its verified Flatpak. With Flatpak and the Flathub remote already set up:

```sh
flatpak install flathub org.mozilla.Thunderbird
flatpak run org.mozilla.Thunderbird
```

In the account setup screen enter your name, existing email address and
password. Let Thunderbird look up the provider settings; review them before
continuing. Some providers open a browser to sign in with OAuth. If automatic
setup fails, use your provider's documented IMAP and SMTP settings rather than
guessing server names. Adding an account does not create a new email address.

### Windows and macOS

Download the recommended Release installer for your system from the
[official downloads](https://www.thunderbird.net/en-US/download/), run it,
then add an existing email account as described in the Linux steps.
For an open-source operating system too, explore the Index's Linux listings.

### NixOS

The nixpkgs Thunderbird module provides a desktop launcher:

```nix
programs.thunderbird.enable = true;
```

Rebuild with `sudo nixos-rebuild switch`, launch Thunderbird from your desktop
menu, then complete the account setup above. The version follows your pinned
nixpkgs channel and may differ from the recorded upstream release.

## First use

Send a test message to an address you control and check that you can receive
its reply. Back up your Thunderbird profile before moving an existing setup;
copying a profile can include mail, contacts and credentials. Calendar and
contact sync depend on your provider's supported protocols.

## Documentation

- [Install Thunderbird on Linux](https://support.mozilla.org/en-US/kb/installing-thunderbird-linux)
- [Thunderbird help](https://support.mozilla.org/products/thunderbird/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/programs/thunderbird.nix)
