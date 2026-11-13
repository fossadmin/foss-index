---
title: Syncthing
description: Continuous file synchronization between your devices, with no cloud copy in the middle.
category: File Sync
tags:
- Self-hosted
icon: syncthing.svg
mark: SY
repository: https://github.com/syncthing/syncthing
license: MPL-2.0
funding:
  githubSponsors: https://github.com/sponsors/syncthing
  custom:
    - label: Donation options
      url: https://syncthing.net/donations/
dripsEligible: true
nixosModule: services.syncthing
managedHosting: true
screenshot:
  src: syncthing.webp
  alt: "Syncthing web GUI with three folders, the Documents folder expanded to show its state and details"
  width: 1337
  height: 859
  credit: Syncthing
  version: "v2.1.7"
  own: true
  captionNote: "Folders hold fictional sample files. Test install only, not a production setup."
---

Syncthing keeps folders in sync between your devices directly - laptop,
phone, server - without storing anything on a third party's servers.
Devices pair by exchanging keys, traffic is encrypted end to end, and
file versioning options protect you against accidental deletes and
overwrites.

## Quick start

*Verified against Syncthing's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

All three routes are first-class: an official Docker image, an official
Debian/Ubuntu repository, and a nixpkgs module.

### Docker Compose

Save this as `compose.yaml`, from the project's Docker README:

```yaml
services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    hostname: my-syncthing
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - ./sync:/var/syncthing
    network_mode: host
    restart: unless-stopped
```

Then `docker compose up -d` and open the web GUI at
http://localhost:8384. `network_mode: host` is deliberate: local device
discovery needs to see real LAN addresses, which Docker's default
bridge networking hides. Synced files land in `./sync`; add more folder
volumes as you need them. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### Ubuntu Server

Syncthing maintains its own apt repository:

```bash
sudo mkdir -p /etc/apt/keyrings
sudo curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable-v2" | sudo tee /etc/apt/sources.list.d/syncthing.list
sudo apt-get update
sudo apt-get install syncthing
```

Run it under your user with the packaged systemd unit:
`sudo systemctl enable --now syncthing@$USER`. The web GUI is on
http://127.0.0.1:8384.

### NixOS

```nix
services.syncthing = {
  enable = true;
  openDefaultPorts = true;
};
```

Then `sudo nixos-rebuild switch`. `openDefaultPorts` opens the transfer
ports (TCP/UDP 22000) and local discovery (UDP 21027); the web GUI
stays on http://127.0.0.1:8384. Devices and folders can be declared
under `services.syncthing.settings` or managed in the GUI.

## Why it's listed

It's the private answer to Dropbox: no account, no quota, no copy of
your files on someone else's infrastructure. Mature, quiet, and it
pairs well with nearly everything else in this directory.
