---
title: "UltiMaker Cura"
description: "Slicer that prepares 3D models for printing on FDM 3D printers."
category: Creative
icon: cura.svg
mark: CU
repository: https://github.com/Ultimaker/Cura
license: LGPL-3.0
managedHosting: false
screenshot:
  src: cura.webp
  alt: "UltiMaker Cura in the Preview stage showing a sliced 3D boat model in layer view"
  width: 1280
  height: 687
  credit: "Keanu Dölle"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Cura_previewing_sliced_3D_model.png
  license: "CC BY-SA 4.0"
  commons: true
  captionNote: "Taken in January 2022 with the model shown in layer view, so the interface may differ from Cura 5.14."
---

Cura turns a 3D model into instructions for a 3D printer. It sets layers, supports and print speed, and works with many printer brands.

The Cura application in the repository is under the GNU LGPL version 3. UltiMaker's cloud services and some bundled printer or marketplace content are separate from this repository and are not covered by this listing. See also [PrusaSlicer](/tools/prusaslicer/).

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux

The same page offers a Linux AppImage. Make it executable and run it:

```bash
chmod +x UltiMaker-Cura-*.AppImage
./UltiMaker-Cura-*.AppImage
```

### Windows and macOS

Download the installer from [UltiMaker's Cura page](https://ultimaker.com/software/ultimaker-cura/). The page lists a Windows installer (.exe or enterprise .msi, including ARM64) and macOS .dmg files for Intel and Apple Silicon.

Homebrew has a cask for it. That is Homebrew's packaging, not the project's own:

```bash
brew install --cask ultimaker-cura
```

## First steps

- On first start Cura asks you to add a printer. Choose your printer model from the list.
- Open a model file (an STL, for example) and check it sits on the build plate.
- Pick a material and print profile in the recommended panel, then slice.
- Save the sliced file to a drive or send it to the printer, depending on what your printer accepts.
- Cura's *custom* mode exposes every setting once the recommended mode isn't enough.

Source: [UltiMaker's getting-started article](https://support.ultimaker.com/s/article/1667337576882).
