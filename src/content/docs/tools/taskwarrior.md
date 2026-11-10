---
title: "Taskwarrior"
description: "Command-line task management."
category: Productivity
icon: taskwarrior.png
mark: TW
repository: https://github.com/GothenburgBitFactory/taskwarrior
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/GothenburgBitFactory
managedHosting: false
screenshot:
  src: taskwarrior.webp
  alt: "Terminal output of task add, task done and task list on sample tasks"
  width: 1147
  height: 622
  credit: task
  terminal: true
  version: "3.5.0"
  captionNote: "Our own run on sample tasks, built from the v3.5.0 source. Environment override notices and the upgrade hint are left out; the rest is unedited."
---

Taskwarrior manages to-do lists from the terminal, with tags, priorities, due dates and filters. It is a good fit if you prefer the keyboard. For a web interface with sharing, see [Vikunja](/tools/vikunja/).

## Quick start

*Checked against the project's own documentation on November 9, 2026. We have not run these installs ourselves. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Linux and macOS

Your distribution probably packages it. From the project's [download page](https://taskwarrior.org/download/): Debian and Ubuntu `sudo apt-get install taskwarrior`, Fedora `sudo dnf install task`, Arch `pacman -S task`, NixOS `nix-env -i taskwarrior3`. On macOS, Homebrew has it:

```bash
brew install task
```

To build from source, the [download page](https://taskwarrior.org/download/) gives:

```bash
tar xzvf task-3.5.0.tar.gz
cd task-3.5.0
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
sudo cmake --install build
```

The `task` program must be on your `PATH`.

### Windows

Taskwarrior no longer supports Cygwin. The project's download page says to use the Windows Subsystem for Linux, then install it the Linux way inside WSL.

## First steps

```bash
task add Buy milk
task add Prepare the first draft of the proposal due:friday
task list
task 1 done
```

On first run `task` asks whether to create its config file and data folder. See the [getting started page](https://taskwarrior.org/docs/start/).
