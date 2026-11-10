---
title: "Standard Notes"
description: "End-to-end encrypted notes app with a self-hostable sync server."
category: Notes
mark: SN
icon: standard-notes.png
repository: https://github.com/standardnotes/app
license: "AGPL-3.0 / GPL-3.0"
funding:
  githubSponsors: https://github.com/sponsors/standardnotes
managedHosting: false
screenshot:
  src: standard-notes.webp
  alt: "Standard Notes desktop app with a folder list, a note list and a note open with sample text"
  width: 1280
  height: 1047
  credit: "the Standard Notes press kit"
  sourceUrl: https://standardnotes.com/press
  captionNote: "From the project press kit linked at standardnotes.com/press (file Press/Screenshots/Desktop.png, dated December 2022), so it may not match the current app. Sample notes."
---

Standard Notes is an encrypted notes app. The source for the apps and for the sync server is public, and the project documents how to self-host the server.

The two repositories carry different licenses: the app repository (`standardnotes/app`) is the GNU AGPL version 3, and the server repository (`standardnotes/server`) is the GNU GPL version 3. The open source code does not mean every feature is free. The project's plans page lists paid plans, and its self-hosting documentation says that on a self-hosted server, premium server-side features need a subscription created by hand, while client-side premium features such as Super notes and nested tags need an offline plan.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Desktop apps

Download the app for macOS, Windows or Linux from [standardnotes.com/download](https://standardnotes.com/download). On Linux it's an AppImage:

```bash
chmod a+x standard-notes-*.AppImage
./standard-notes-*.AppImage
```

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask standard-notes
```

### Self-hosted server

The [Docker guide](https://standardnotes.com/help/self-hosting/docker) is the only supported self-hosting route and needs a Linux server with Docker. The first steps are: make a working folder, fetch `.env.sample` to `.env`, generate each key with `openssl rand -hex 32`, fetch the LocalStack bootstrap script and the example `docker-compose.yml` from the project's `server` repository, and change the database password. The guide has the exact commands and the remaining steps. The server doesn't include the web app, which is a separate project.

## First steps

- Create an account on the hosted service, or on your own server by pointing the app's sign-in at its address.
- Write a note. Install the app on a second device and sign in to check that sync works.
- Export a backup from the app before you rely on it.

The hosted service has paid plans. The license note above describes what is open source and what isn't.
