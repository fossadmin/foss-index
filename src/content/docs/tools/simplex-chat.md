---
title: "SimpleX Chat"
description: "Messenger with no user identifiers of any kind."
category: Communication
mark: SX
repository: https://github.com/simplex-chat/simplex-chat
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/simplex-chat
  openCollective: https://opencollective.com/simplex-chat
managedHosting: false
---

SimpleX Chat is a messaging app that does not assign user identifiers. The README says an implementation security assessment by Trail of Bits is linked from the project; read it and the project's own documentation before trusting it with anything sensitive.

The repository is licensed under the AGPL-3.0. The README adds that the SimpleX and SimpleX Chat names, logos and branding are not covered by that license. The protocols are described as open and in the public domain.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Windows, macOS and Linux

Download from [simplex.chat/downloads](https://simplex.chat/downloads/). The page lists a Windows x86_64 build, macOS builds for Apple Silicon and Intel, and a Linux AppImage for x86_64 and aarch64.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask simplex
```

### Linux Flatpak

The Flathub package is verified by its publisher:

```bash
flatpak install flathub chat.simplex.simplex
```

## First steps

- Open the app and choose **Create your profile** on desktop. Enter a profile name. It is stored on your device.
- You have no account or ID on the network, so nobody can contact you until you share a one-time invitation link or a contact address.
- Create a one-time link for each person, send it to them over any channel, and they connect with it.

Sources: [SimpleX guide](https://simplex.chat/docs/guide/readme.html) and [making connections](https://simplex.chat/docs/guide/making-connections.html).
