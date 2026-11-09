---
title: Vikunja
description: Tasks, projects and shared plans, with list, kanban, table and Gantt views.
category: Productivity
icon: vikunja.svg
mark: VI
repository: https://github.com/go-vikunja/vikunja
license: AGPL-3.0-or-later
funding:
  githubSponsors: https://github.com/sponsors/kolaente
dripsEligible: false
nixosModule: services.vikunja
managedHosting: false
screenshot:
  src: vikunja.webp
  alt: "Vikunja project task list with four fictional home-server tasks"
  width: 1440
  height: 960
  credit: Vikunja
  own: true
  version: "v2.8.0"
  captionNote: "Fictional demo data in a local v2.8.0 binary test. Not a production assessment or a test of this Docker example."
---

Vikunja brings personal tasks and shared projects into one web app. Due dates,
labels, assignments and several views let the same plan work as a task list
or a project board. It can be self-hosted or used through the project's
hosted service.

The core server and web app are AGPL-3.0-or-later; the desktop wrapper uses
GPL-3.0-or-later. Separate paid Pro features are not part of the open-source
core. Check the upstream feature split rather than assuming every advertised
feature is included.

## Quick start

*Checked against upstream docs on November 9, 2026. We ran a local v2.8.0
binary solely to make the fictional screenshot; we have not run these setups
ourselves.*

Docker is the upstream-documented small-install route. The NixOS module is
maintained in nixpkgs and may package a different version.

### Docker Compose

This is the official small-install SQLite route, adapted to bind to localhost.
Requires Docker and the Compose plugin. On a regular Linux Docker host:

```sh
mkdir -p files db
sudo chown 1000 files db
```

Create a private `.env` file with `VIKUNJA_SECRET=` followed by a long, unique
random secret. Run `chmod 600 .env` and keep it out of version control.
Save as `compose.yaml`:

```yaml
services:
  vikunja:
    image: vikunja/vikunja:2.8.0
    ports:
      - "127.0.0.1:3456:3456"
    environment:
      VIKUNJA_SERVICE_SECRET: ${VIKUNJA_SECRET:?Set it in .env first}
      VIKUNJA_SERVICE_PUBLICURL: http://localhost:3456/
      VIKUNJA_DATABASE_TYPE: sqlite
      VIKUNJA_DATABASE_PATH: /db/vikunja.db
    volumes:
      - ./files:/app/vikunja/files
      - ./db:/db
    restart: unless-stopped
```

Run `docker compose up -d`, then open http://localhost:3456 and register
your account. Back up both `db` and `files`. Disable open registration after
your intended users have joined, using the official configuration guide.

macOS Docker Desktop normally does not need the ownership command. Rootless
Docker needs a different ownership approach; follow upstream's rootless
section instead of applying the command blindly. For remote access, set the
real HTTPS public URL and configure a reverse proxy. Upstream recommends
PostgreSQL or MySQL for more than a handful of users.

### NixOS

```nix
services.vikunja = {
  enable = true;
  address = "127.0.0.1";
  frontendScheme = "http";
  frontendHostname = "localhost";
};
```

Run `sudo nixos-rebuild switch`, then open http://localhost:3456 and register
your account. `frontendScheme` and `frontendHostname` are required: they
build the public URL, so set them to the real HTTPS address for remote
access. The module stores the SQLite database and files under
`/var/lib/vikunja`; back that directory up, and keep secrets in
`services.vikunja.environmentFiles` rather than in the Nix configuration.
Disable open registration after your intended users have joined.

## Why it's listed

A focused task manager fills the gap between a notes app and a full office
suite. The open core supports useful project views without making a hosted
account a requirement.

## Documentation

- [Docker, SQLite and permissions](https://vikunja.io/docs/full-docker-example/)
- [Installation options](https://vikunja.io/docs/installing/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/web-apps/vikunja.nix)
- [Features](https://vikunja.io/features/)
- [Support the project](https://vikunja.io/support/)
