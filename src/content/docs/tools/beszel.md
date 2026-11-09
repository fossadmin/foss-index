---
title: Beszel
description: A lightweight hub and agent for server metrics, containers and resource alerts.
category: Monitoring
icon: beszel.svg
mark: BE
repository: https://github.com/henrygd/beszel
license: MIT
funding:
  custom:
    - label: Buy the maintainer a coffee
      url: https://www.buymeacoffee.com/henrygd
dripsEligible: false
nixosModule: services.beszel
managedHosting: false
screenshot:
  src: beszel.webp
  alt: "Beszel dashboard showing resource usage across the official sample systems"
  width: 1419
  height: 967
  credit: Beszel
  sourceUrl: https://github.com/henrygd/beszel-docs/blob/0e5bc98bf12b47481012eff3c47ec35723e64fbc/public/image/dashboard.png
  license: MIT
  captionNote: "Project-published demo image, not our install. Screenshot version not recorded."
---

Beszel tracks server CPU, memory, disks, networks and Docker containers through
a web hub and a small agent on each monitored system. It includes historical
charts and configurable alerts without aiming to replace a full metrics stack.

The hub alone does not collect host metrics. Each system needs an agent and
a working connection to the hub. Treat agent keys, enrollment tokens and
access to the Docker socket as security-sensitive.

## Quick start

*Checked against the project's docs on November 9, 2026. We have not run
these setups ourselves.*

Docker is an upstream-supported route. The NixOS hub and agent modules are
maintained in nixpkgs and may package a different version.

### Docker hub and agent enrollment

Requires Docker and the Compose plugin. Save this hub starter as
`compose.yaml` in a new directory:

```yaml
services:
  beszel:
    image: henrygd/beszel:latest
    ports:
      - "127.0.0.1:8090:8090"
    volumes:
      - ./beszel_data:/beszel_data
    restart: unless-stopped
```

Run `docker compose up -d`, open http://localhost:8090 on the host, and create
the first admin account. This starts the hub only. Back up `beszel_data`.

Next, use **Add System** in the hub and copy its generated agent configuration
for the machine you want to monitor. The official [getting-started
guide](https://beszel.dev/guide/getting-started) covers the local socket and
remote-agent paths. Keep the supplied key and token private. Review its mounts
and networking before starting the agent, especially Docker socket access.

A remote agent cannot reach `localhost` on your hub's machine. Arrange a
reachable private-network or HTTPS hub URL and follow the documented
connection settings before enrolling it. Do not open the admin UI publicly
just to make the example connect. Use the hub-generated configuration rather
than copying placeholder keys from a tutorial.

### NixOS

nixpkgs ships separate hub and agent modules. On the hub machine:

```nix
services.beszel.hub.enable = true;
```

Run `sudo nixos-rebuild switch`, open http://localhost:8090 on the host and
create the first admin account. The hub listens on localhost by default
(`services.beszel.hub.host`) and stores its data in `/var/lib/beszel-hub`;
back that directory up.

On each machine to monitor:

```nix
services.beszel.agent = {
  enable = true;
  environmentFile = "/etc/beszel-agent.env";
};
```

Use **Add System** in the hub and put its generated `HUB_URL`, `TOKEN` and
`KEY` values in that root-owned file with mode `600`. Do not set them in
`services.beszel.agent.environment`: values there are world-readable in the
Nix store. `services.beszel.agent.openFirewall = true;` opens the agent's
listen port (default 45876) when your setup has the hub connect to agents.
Keep the hub's admin UI off the public internet; use a reachable
private-network or HTTPS hub URL for remote agents.

## Why it's listed

A useful middle ground when you want to see how a few servers are doing
without starting with a large monitoring stack. Keep Uptime Kuma alongside it
if you also need external service-availability checks.

## Documentation

- [Getting started and agent setup](https://beszel.dev/guide/getting-started)
- [Hub installation](https://beszel.dev/guide/hub-installation)
- [NixOS hub module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/monitoring/beszel-hub.nix)
- [NixOS agent module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/monitoring/beszel-agent.nix)
- [Project source](https://github.com/henrygd/beszel)
