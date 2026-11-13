---
title: Grafana
description: Dashboards and alerts for metrics, logs and traces from your own data sources.
category: Monitoring
tags:
- Self-hosted
icon: grafana.svg
mark: GR
repository: https://github.com/grafana/grafana
license: AGPL-3.0
funding:
  custom:
    - label: Grafana Cloud and Enterprise subscriptions
      url: https://grafana.com/pricing/
dripsEligible: true
nixosModule: services.grafana
managedHosting: true
screenshot:
  src: grafana.webp
  alt: "Grafana OSS dashboard with time series, stat, and gauge panels on generated test data"
  width: 1337
  height: 859
  credit: Grafana OSS
  version: "v13.3.0"
  own: true
  captionNote: "Synthetic demo data from the built-in TestData source, not real metrics or a production setup."
---

Grafana turns data from sources such as Prometheus, Loki and InfluxDB
into dashboards: charts you arrange yourself, with alerts when a value
crosses a line you set. It reads from wherever your data already lives,
so the dashboards stay even if you swap the database behind them.

The open source edition is AGPL-3.0 and developed by Grafana Labs
together with its community. There is no donation route; the company
funds the work through its paid Grafana Cloud and Enterprise offerings,
recorded above as a subscription rather than a donation.

## Quick start

*Verified against Grafana's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Docker is an upstream-supported route. The NixOS module is maintained
in nixpkgs; its packaged version can differ from the recorded upstream
release above. These examples keep the dashboard on localhost. For remote
access, use an SSH tunnel or a reverse proxy with HTTPS, rather than
opening the port directly.

### Docker Compose

Save this as `compose.yaml`, adapted from the official Docker guide with
a localhost-only port binding:

```yaml
services:
  grafana:
    image: grafana/grafana
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
    restart: unless-stopped

volumes:
  grafana-storage:
```

Run `docker compose up -d` and open http://localhost:3000 on the host.
The first login is admin/admin and Grafana makes you choose a new
password before anything else. Use the `grafana/grafana` image: it is the
open source edition, while `grafana/grafana-enterprise` is the upstream
default and `grafana/grafana-oss` stopped being updated with release
12.4.0. The volume keeps dashboards and users across container rebuilds;
back it up before major upgrades.

This needs Docker and the Compose plugin. On Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` installs both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

```nix
services.grafana = {
  enable = true;
  settings.server = {
    http_addr = "127.0.0.1";
    http_port = 3000;
  };
};
```

Run `sudo nixos-rebuild switch`, then visit http://127.0.0.1:3000 on the
host and change the initial admin password. The module keeps its data in
`/var/lib/grafana`; include that state in your backup plan.

## Why it's listed

Uptime Kuma tells you the moment something stops responding. Grafana
shows the trend that led there, once you point it at the metrics your
services already produce. The two cover different halves of watching a
small setup.

## Documentation

- [Run Grafana in Docker](https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/)
- [Data sources](https://grafana.com/docs/grafana/latest/datasources/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/monitoring/grafana.nix)
