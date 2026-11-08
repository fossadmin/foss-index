---
title: Caddy
description: Fast, extensible web server with automatic HTTPS. No manual certificate handling.
category: Infrastructure
icon: caddy.png
mark: CD
repository: https://github.com/caddyserver/caddy
license: Apache-2.0
funding:
  githubSponsors: https://github.com/sponsors/mholt
dripsEligible: true
nixosModule: services.caddy
managedHosting: true
screenshot:
  src: caddy.webp
  alt: "Caddy's default welcome page confirming the web server is working, with next steps for serving a site"
  width: 1337
  height: 859
  credit: Caddy
  version: "v2.11.9"
  own: true
---

Caddy is an open-source web server written in Go. Its headline feature is
automatic HTTPS: it obtains and renews TLS certificates from Let's Encrypt
without any configuration, which removes one of the most error-prone parts
of running a site. It serves static files, reverse-proxies to apps, and
handles HTTP/2 and HTTP/3 out of the box.

## Quick start

*Verified against Caddy's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

### Docker Compose

Save this as `compose.yaml`:

```yaml
services:
  caddy:
    image: caddy
    container_name: caddy
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./conf:/etc/caddy
      - caddy-data:/data
      - caddy-config:/config
volumes:
  caddy-data:
  caddy-config:
```

Put your Caddyfile at `./conf/Caddyfile` (mount the folder, not the file
itself), then `docker compose up -d`. The data volume keeps issued
certificates. Works on any host with Docker and the Compose plugin: on Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` covers both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### Ubuntu Server

Caddy's official apt repository:

```bash
sudo apt install --yes debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
sudo chmod o+r /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

The package sets Caddy up as a systemd service; `sudo systemctl enable
--now caddy` starts it. Until you write your own `/etc/caddy/Caddyfile`,
it serves a default page on port 80.

### Fedora / RHEL

Caddy's official COPR repository:

```bash
sudo dnf install dnf-plugins-core
sudo dnf copr enable @caddy/caddy
sudo dnf install caddy
```

Then `sudo systemctl enable --now caddy`; it serves a default page on
port 80 until you write `/etc/caddy/Caddyfile`. If firewalld is active,
allow web traffic:

```bash
sudo firewall-cmd --permanent --add-service=http --add-service=https
sudo firewall-cmd --reload
```

### NixOS

A Caddy reverse proxy is a few lines in `configuration.nix`:

```nix
services.caddy = {
  enable = true;
  virtualHosts."example.com".extraConfig = ''
    reverse_proxy localhost:8080
  '';
};
```

Then `sudo nixos-rebuild switch`.

## Why it's listed

The short configuration is easy to review. Automatic certificates remove
a manual maintenance step.
