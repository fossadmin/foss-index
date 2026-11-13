---
title: Actual Budget
description: Envelope budgeting with local-first data and an optional self-hosted sync server.
category: Finance
icon: actual-budget.png
mark: AB
repository: https://github.com/actualbudget/actual
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/actualbudget
  openCollective: https://opencollective.com/actual
dripsEligible: false
nixosModule: services.actual
managedHosting: false
screenshot:
  src: actual-budget.webp
  alt: "Actual Budget budget screen with sample categories and balances"
  width: 1280
  height: 720
  credit: Actual Budget
  sourceUrl: https://github.com/actualbudget/actual/blob/3519dcb7f6e9b12035a4b2f36b0a073023d6e673/packages/desktop-client/public/screenshot_wide.png
  license: MIT
  captionNote: "Project-published demo image, not our install. Screenshot version not recorded."
tags:
- Self-hosted
---

Actual uses envelope budgeting: give money a job, track transactions and see
what is still available in each category. Budget data lives locally, with an
optional server for syncing between devices. Optional end-to-end encryption
is available; it is not a claim that every server feature is encrypted.

Bank connections are optional and depend on external providers, coverage and
provider terms. You can start with manual entries or file imports instead.
A budget deserves both exports and backups, not just a running container.

## Try it and keep a way out

Start with the [official demo](https://demo.actualbudget.org/) and sample data,
not your financial history. The [desktop app](https://actualbudget.org/docs/install/)
is a server-optional way to learn the workflow and includes automatic local backups.

The standalone browser-only route is different: clearing browser data can erase
your budget. Upstream warns against that route for long-term use. Export after
every session if you use it; do not confuse it with a backed-up sync server.

Before moving real data:

- Check the [migration guide](https://actualbudget.org/docs/migration/) for your
  old app. Whole-budget migration and transaction-file import are different;
  do not assume every account, rule or attachment will transfer.
- In Actual, use Settings → Export data to keep an Actual budget ZIP. Keep a
  separate copy away from the server or browser. This is an Actual restore
  format, not a promise that another finance app can read it.
- Follow the [restore guide](https://actualbudget.org/docs/backup-restore/restore)
  to import that ZIP as an Actual file. Verify the imported copy before removing
  the original. Keep server data backups as well as budget exports.

Sources checked November 12, 2026: [installation](https://actualbudget.org/docs/install/),
[export/backup](https://actualbudget.org/docs/backup-restore/backup),
[restore](https://actualbudget.org/docs/backup-restore/restore) and migration above.
No migration, export or restore was performed for this listing.

## Quick start

*Checked against the official installation docs on November 9, 2026.
We have not run these setups ourselves.*

Docker is an upstream-supported route. The NixOS module is maintained in
nixpkgs and may package a different version.

### Docker Compose

This adapts the official Docker command into Compose, with a persistent data
volume and a localhost-only port. Requires Docker and the Compose plugin.
Save as `compose.yaml` in a new directory:

```yaml
services:
  actual:
    image: actualbudget/actual-server:latest
    ports:
      - "127.0.0.1:5006:5006"
    volumes:
      - actual-data:/data
    restart: unless-stopped

volumes:
  actual-data:
```

Run `docker compose up -d`, then open http://localhost:5006 on the host.
Complete the initial server setup and create or import a budget. Back up the
`actual-data` volume and keep budget exports separately. `latest` follows the
current stable release, so review release notes before pulling updates.

For another computer or phone, use HTTPS through a reverse proxy and a real
hostname, following the official installation docs. Do not simply expose this
local port to the internet. Browser security requirements can affect access
outside localhost.

### Desktop app

The official [installation guide](https://actualbudget.org/docs/install/)
also offers desktop apps. A local budget does not require a self-hosted sync
server. Start there if you want to learn the budgeting workflow before
maintaining a service.

### NixOS

```nix
services.actual = {
  enable = true;
  settings = {
    hostname = "127.0.0.1";
    port = 3000;
  };
};
```

Run `sudo nixos-rebuild switch`, then open http://localhost:3000 on the host
and complete the initial server setup. The module's default port is 3000,
not the 5006 used by the Docker image. Data lives under `/var/lib/actual`
(`services.actual.settings.dataDir`); back it up along with separate budget
exports. For other devices, use HTTPS through a reverse proxy as in the
Docker notes rather than opening the port directly.


## Why it's listed

A concrete way to bring a private, everyday task onto software you control.
Its budgeting model is different from a generic expense spreadsheet, so try
it with sample data before moving your whole financial history.

## Documentation

- [Installation options](https://actualbudget.org/docs/install/)
- [Docker installation](https://actualbudget.org/docs/install/docker/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/web-apps/actual.nix)
- [Project website](https://actualbudget.org/)
