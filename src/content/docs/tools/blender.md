---
title: "Blender"
description: "3D creation suite for modeling, animation, rendering, video editing and compositing."
category: Creative
icon: blender.svg
mark: BL
repository: https://projects.blender.org/blender/blender
license: GPL-2.0-or-later
funding:
  custom:
    - label: "Blender Development Fund"
      url: https://fund.blender.org
managedHosting: false
screenshot:
  src: blender.webp
  alt: "Blender 4.3.2 default layout with the 3D viewport, a Suzanne monkey mesh, the outliner and the properties panel"
  width: 1280
  height: 720
  credit: "UnnecessaryDecision"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Blender_4.3.2_screenshot.png
  license: "CC0"
  commons: true
  captionNote: "Blender 4.3.2 with the built-in Suzanne mesh, March 2025. The current release is newer and the interface may differ."
---

Blender covers 3D modeling, sculpting, animation, rendering, compositing and video editing in one program. It also has a Python scripting interface.

Blender's license page says its source is licensed GNU GPL version 2 or later by default, and that some modules use more permissive licenses, for example the Cycles renderer under Apache 2.0.

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

Blender's [Linux install page](https://docs.blender.org/manual/en/latest/getting_started/installing/linux.html) says to download the Linux build from blender.org, decompress it where you want it (for example `~/software`), and start the `blender` executable. This way you can keep several versions side by side. Some distributions also package Blender, and the same page notes that.

### Windows and macOS

Download the installer for your system from [blender.org/download](https://www.blender.org/download/).

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask blender
```

## First steps

- Start Blender. The splash screen's **New File** option starts a project from a template. To skip it, click outside the splash or press **Esc**. The Blender icon in the top bar reopens it.
- New projects open in Object Mode, where the manual says every object can be moved, rotated and scaled. These are the three basic transforms.
- Use **Render > Render Image** (**F12**) in the top bar to render the current frame.
- Save with **Ctrl-S**. The manual's default keymap lists it as "Save file".

Everything above is taken from Blender's [splash screen](https://docs.blender.org/manual/en/latest/interface/window_system/splash.html), [top bar](https://docs.blender.org/manual/en/latest/interface/window_system/topbar.html), [default keymap](https://docs.blender.org/manual/en/latest/interface/keymap/blender_default.html) and [transform](https://docs.blender.org/manual/en/latest/scene_layout/object/editing/transform/introduction.html) pages. Blender's [manual](https://docs.blender.org/manual/en/latest/) has the full beginner section.
