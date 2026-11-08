---
title: Uptime Kuma
description: Self-hosted uptime monitoring and status pages, with alerts when a service stops responding.
category: Monitoring
mark: UK
repository: https://github.com/louislam/uptime-kuma
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/louislam
  openCollective: https://opencollective.com/uptime-kuma
dripsEligible: true
nixosModule: services.uptime-kuma
managedHosting: true
screenshot:
  src: uptime-kuma.webp
  alt: "Uptime Kuma dashboard in dark mode with demo monitors, uptime bars and response-time chart"
  width: 1024
  height: 641
  credit: Uptime Kuma
  sourceUrl: https://github.com/louislam/uptime-kuma-website/blob/d8d3c735e8996b1bfce521d319ac3aa0b3011a51/frontend/public/img/dark.jpg
  license: MIT
---

Uptime Kuma checks websites, ports and other services on a schedule,
records their response times, and sends alerts through services such as
Gotify. Its status pages give other people a place to check for outages
without access to the monitoring dashboard.

It is an availability monitor, not a replacement for backups or a full
metrics system. Run it somewhere independent of the services you monitor
if you want to hear about a whole-server or internet outage.

## Quick start

*Verified against Uptime Kuma's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Docker is an upstream-supported route. The NixOS module is maintained
in nixpkgs; its packaged version can differ from the recorded upstream
release above. These examples keep the dashboard on localhost. For remote
access, use an SSH tunnel or a reverse proxy with HTTPS, rather than
opening the administration port directly.

### Docker Compose

Save this as `compose.yaml`, adapted from the official Compose file with
a localhost-only port binding:

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    ports:
      - "127.0.0.1:3001:3001"
    volumes:
      - uptime-kuma:/app/data
    restart: unless-stopped

volumes:
  uptime-kuma:
```

Run `docker compose up -d`, open http://localhost:3001 on the host, and
create the initial administrator account before making it reachable by
others. Add a monitor and configure an alert destination in the dashboard.

Keep the data volume on local storage: upstream warns that NFS and other
filesystems without reliable POSIX file locks can corrupt the SQLite
database. Back up `/app/data` before updates, and read the migration guide
before changing major image tags.

This needs Docker and the Compose plugin. On Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` installs both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.uptime-kuma = {
  enable = true;
  settings = {
    HOST = "127.0.0.1";
    PORT = "3001";
  };
};
```

Run `sudo nixos-rebuild switch`, then visit http://127.0.0.1:3001 on
the host to create the administrator account. The module keeps its data
in `/var/lib/uptime-kuma`; include that state in your backup plan.

## Why it's listed

A small team needs to know when its website or internal tool goes down.
Uptime Kuma makes that check visible and gives an outage somewhere to
send an alert. Pair it with Gotify for a self-hosted notification path.

## Documentation

- [Installation and storage warnings](https://uptime.kuma.pet/docs/How-to-Install/)
- [Updates](https://uptime.kuma.pet/docs/How-to-Update/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/monitoring/uptime-kuma.nix)
