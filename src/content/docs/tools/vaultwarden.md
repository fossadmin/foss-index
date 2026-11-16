---
title: Vaultwarden
description: Lightweight, self-hosted server compatible with Bitwarden clients. Written in Rust.
added: 2026-10-21
category: Passwords
tags:
- Self-hosted
- NixOS module
icon: vaultwarden.svg
iconDark: vaultwarden-dark.svg
mark: VW
repository: https://github.com/dani-garcia/vaultwarden
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/dani-garcia
  liberapay: https://liberapay.com/dani-garcia
dripsEligible: true
nixosModule: services.vaultwarden
managedHosting: true
screenshot:
  src: vaultwarden.webp
  alt: "Vaultwarden web vault login screen with email field and create account link"
  width: 1400
  height: 875
  credit: Vaultwarden
  version: "web-vault build v2026.10.1"
  own: true
  captionNote: "Login screen of the official Vaultwarden web-vault build, served locally just for this capture. No account created and no server configured."
---

Vaultwarden is a self-hosted password manager server that works with the
official Bitwarden apps and browser extensions. Written in Rust, it's far
lighter than the official Bitwarden server and runs comfortably on a
small VPS or a home server.

## Quick start

*Verified against Vaultwarden's own documentation on November 8, 2026.*

Vaultwarden ships as a container image; there is no native Ubuntu
package, so on Ubuntu use Docker. The NixOS module is maintained in
nixpkgs.

### Docker Compose

Save this as `compose.yaml`:

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true" # set "false" after creating your account
    volumes:
      - ./vw-data:/data
    ports:
      - 8222:80
```

Then `docker compose up -d`, open http://localhost:8222 and create your
account; after that, set `SIGNUPS_ALLOWED` to `"false"` and recreate the
container. There is no default account; whoever signs up first owns the
first vault. Vault data persists in `./vw-data`. Bitwarden clients expect
HTTPS, so put it behind a reverse proxy with TLS for anything beyond
local testing. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.vaultwarden = {
  enable = true;
  config = {
    DOMAIN = "https://vault.example.com";
    SIGNUPS_ALLOWED = true; # set false after creating your account
  };
};
```

Then `sudo nixos-rebuild switch`. Data is stored in SQLite and the
service listens on 127.0.0.1 port 8222, so put a reverse proxy with TLS
in front (Bitwarden clients expect HTTPS). Create your account first,
then set `SIGNUPS_ALLOWED` to `false` and rebuild again.

## Why it's listed

Passwords are the one thing nobody should hand to a third party without
thinking. Vaultwarden lets a family or a small team keep their vaults on
hardware they control while keeping the polished Bitwarden clients.
