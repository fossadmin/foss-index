---
title: "Super Productivity"
description: "To-do list, time tracker and daily planner for focused personal work."
category: Productivity
icon: super-productivity.png
mark: SP
repository: https://github.com/super-productivity/super-productivity
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/johannesjo
managedHosting: false
screenshot:
  src: super-productivity.webp
  alt: "Super Productivity boards view with an Eisenhower matrix of four quadrants holding sample tasks"
  width: 1024
  height: 768
  credit: "the Super Productivity press kit"
  sourceUrl: https://super-productivity.com/images/screenshots/boards-light.png
  captionNote: "From the project press kit, which offers its product screenshots for press coverage and walkthroughs. Sample tasks. The release is not stated."
---

Super Productivity combines a task list, a time tracker and a daily planner. The README describes it as offline-first, says it collects no data and needs no account, and says you decide where your data is stored.

It can sync through Dropbox, WebDAV or the project's own SuperSync service, and it can import tasks from tools such as GitHub and Jira, per the README.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Desktop apps

Downloads and platform notes are on the [project's wiki](https://github.com/super-productivity/super-productivity), linked from its README.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask super-productivity
```

Flathub lists this app as verified by its publisher (checked on the Flathub API on November 9, 2026):

```bash
flatpak install flathub com.super_productivity.SuperProductivity
```

This needs Flatpak set up on your system first (see [flatpak.org/setup](https://flatpak.org/setup/)).

### Web app

The README links an open-in-browser web app. The project notes it has limits compared with the desktop app, listed in its web versus desktop comparison.

## First steps

- Add a task with the add-task bar, then give it a time estimate and start tracking.
- Group tasks with projects and tags.
- Sync is optional. The README lists SuperSync (the project's own end-to-end encrypted service), Dropbox and WebDAV.

The README describes the app as private and offline-first.
