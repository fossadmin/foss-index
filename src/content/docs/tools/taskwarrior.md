---
title: "Taskwarrior"
description: "Command-line task management."
added: 2026-11-10
category: Productivity
tags:
- NixOS module
icon: taskwarrior.png
mark: TW
repository: https://github.com/GothenburgBitFactory/taskwarrior
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/GothenburgBitFactory
managedHosting: false
nixosModule: services.taskchampion-sync-server
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

*Checked against the project's own documentation on November 9, 2026. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

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

### NixOS

On NixOS the client installs with `nix profile install nixpkgs#taskwarrior3`. nixpkgs also carries a module for Taskwarrior 3's own sync server (source: [nixos/modules/services/misc/taskchampion-sync-server.nix](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/misc/taskchampion-sync-server.nix)):

```nix
services.taskchampion-sync-server = {
  enable = true;
  host = "0.0.0.0"; # default serves 127.0.0.1 only
  port = 10222;
};
```

Apply with `sudo nixos-rebuild switch`, then point clients at it with `task config sync.server.url http://your-host:10222` and create a client ID per the module's documentation. The older `services.taskserver` module is for the deprecated Taskwarrior 2 protocol and does not apply to Taskwarrior 3.

## First steps

```bash
task add Buy milk
task add Prepare the first draft of the proposal due:friday
task list
task 1 done
```

On first run `task` asks whether to create its config file and data folder. See the [getting started page](https://taskwarrior.org/docs/start/).
