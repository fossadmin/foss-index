---
dripsEligible: false
title: VictoriaMetrics Community
description: Open-source time-series database and monitoring backend, with a built-in
  query UI.
category: Infrastructure
mark: VM
repository: https://github.com/VictoriaMetrics/VictoriaMetrics
license: Apache-2.0
icon: victoriametrics.svg
screenshot:
  src: victoriametrics-source.webp
  alt: VictoriaMetrics VMUI query interface with a process CPU time query and a line
    graph
  width: 1999
  height: 1072
  credit: VictoriaMetrics contributors
  sourceUrl: https://github.com/VictoriaMetrics/VictoriaMetrics/blob/0c3f0919a4c3d104355ec12979c30d2359909ad6/docs/victoriametrics/keyConcepts/vmui.webp
  license: Apache-2.0
  captionNote: Upstream documentation screenshot; UI version is not specified and
    this is not our install.
nixosModule: services.victoriametrics
---

VictoriaMetrics stores and queries monitoring time series. The Community code is
Apache-2.0. Enterprise features and VictoriaMetrics Cloud are separate offerings;
this page covers the open-source single-node server, not a hosted subscription.
It can complement Grafana rather than replace every monitoring dashboard.

## Quick start

*Researched against official single-server documentation and pinned nixpkgs
sources on November 11, 2026. These steps have not been executed here.*

### Docker Compose

For a local monitoring lab, create `compose.yaml`:

```yaml
services:
  victoriametrics:
    image: victoriametrics/victoria-metrics:v1.156.0
    command:
      - -storageDataPath=/storage
      - -selfScrapeInterval=5s
    ports:
      - "127.0.0.1:8428:8428"
    volumes:
      - vm-data:/storage
    restart: unless-stopped
volumes:
  vm-data:
```

Run `docker compose up -d`, then open `http://localhost:8428/vmui/`. After a few
seconds, query `process_resident_memory_bytes` and click Execute Query. The
self-scrape flag supplies sample server metrics; it does not discover the rest
of your network. Data persists in the volume. `docker compose down` stops the
lab; adding `-v` erases the stored data.

### Linux

Download the Community single-node archive for your CPU from the project's
release page, check the published checksum, and extract it. From that directory:

```sh
./victoria-metrics-prod -storageDataPath=./vm-data -httpListenAddr=127.0.0.1:8428 -selfScrapeInterval=5s
```

Keep the terminal running and use VMUI as above. Stop with Ctrl-C. This is a lab
process, not a configured system service. The server is not authenticated by
default: do not expose port 8428 publicly. Arrange access control, retention and
backups before using it for real monitoring.

### NixOS

```nix
services.victoriametrics = {
  enable = true;
  listenAddress = "127.0.0.1:8428";
  extraOptions = [ "-selfScrapeInterval=5s" ];
};
```

Apply with `sudo nixos-rebuild switch`, then open VMUI and try the same query.
The module manages the service and storage directory. The nixpkgs version can
differ from the recorded upstream release.

## First use

Add explicit scrape targets or configure a Prometheus-compatible remote-write
sender using the official guide. Check ingestion and retention before relying
on the graphs. A local storage volume is not a backup. Keep write endpoints and
query endpoints behind suitable authentication for multi-user deployments.

## Documentation

- [Single-server guide and Docker image](https://docs.victoriametrics.com/victoriametrics/single-server-victoriametrics/)
- [Metrics and query concepts](https://docs.victoriametrics.com/victoriametrics/keyconcepts/)
- [Community and Enterprise differences](https://docs.victoriametrics.com/victoriametrics/enterprise/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/services/databases/victoriametrics.nix)
