---
dripsEligible: false
title: PostgreSQL
description: Open-source relational database server for applications and structured
  data.
category: Infrastructure
tags:
- Self-hosted
icon: postgresql.png
mark: PG
repository: https://git.postgresql.org/gitweb/?p=postgresql.git
license: PostgreSQL
managedHosting: true
nixosModule: services.postgresql
funding:
  custom:
  - label: Support PostgreSQL
    url: https://www.postgresql.org/about/donate/
screenshot:
  src: postgres-source.webp
  alt: PostgreSQL psql terminal showing version 17.5, copyright information and a
    list of database roles
  width: 554
  height: 543
  credit: VulcanSphere
  sourceUrl: https://commons.wikimedia.org/wiki/File:PostgreSQL_psql_screenshot.png
  license: PostgreSQL License
  commons: true
  captionNote: August 2025 screenshot of psql 17.5, not the recorded release and not
    our install. PostgreSQL is a server with a command-line client, not a built-in
    graphical dashboard.
---

PostgreSQL, often called Postgres, is a relational database server. Applications
use it to store structured data and query it with SQL. It includes the `psql`
terminal client; a separate tool such as DBeaver can provide a graphical client.

The core uses the permissive PostgreSQL License. Extensions have their own
licenses. Postgres, PostgreSQL and the Slonik logo are trademarks or registered
trademarks of the PostgreSQL Community Association of Canada. This independent
listing does not imply affiliation or endorsement.

## Quick start

*Researched against upstream and official-image documentation on November 11,
2026. We have not started a database or run these steps as part of this listing.*

### Docker Compose

For a local learning database, create a folder with this `compose.yaml`:

```yaml
services:
  postgres:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Set a unique local database password}
      POSTGRES_DB: index_demo
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql
    restart: unless-stopped
volumes:
  postgres-data:
```

Set `POSTGRES_PASSWORD` to a unique password in a local `.env` file (keep that
file out of Git), then start the database:

```sh
docker compose up -d
docker compose exec postgres psql -U postgres -d index_demo
```

At the `psql` prompt, try `SELECT current_database(), version();`, then `\q`
to leave. Port 5432 is bound to loopback only. PostgreSQL 18's image stores data
under `/var/lib/postgresql/18/docker`, so the volume above mounts its parent,
`/var/lib/postgresql`. Older image examples use a different data path.

Changing `POSTGRES_PASSWORD` later does not reset the password in an initialized
volume. Do not delete the volume to fix a login problem: that deletes your data.

### Linux

On Debian or Ubuntu, the distribution packages provide a local service:

```sh
sudo apt update
sudo apt install postgresql postgresql-client
sudo systemctl start postgresql
sudo -u postgres createdb index_demo
sudo -u postgres psql -d index_demo
```

Run `SELECT current_database(), version();` and `\q` to exit. Your distribution
chooses its supported version; it may differ from the recorded upstream release.
This uses local operating-system authentication, not a publicly reachable
server. Consult the PostgreSQL documentation before changing network access.

### NixOS

For a new local test instance (not an existing database upgrade):

```nix
services.postgresql = {
  enable = true;
  package = pkgs.postgresql_18;
  ensureDatabases = [ "index_demo" ];
};
```

Run `sudo nixos-rebuild switch`, then `sudo -u postgres psql -d index_demo`.
Try the query above. Do not change the package major version on an existing
instance without planning a database upgrade and checking your backups.

## First use

Use a non-superuser account for applications, keep database access off the
public internet, and arrange backups before storing important data. A Docker
volume persists data but is not a backup. Stop the learning container with
`docker compose down`; avoid `down -v` unless you intend to erase its volume.

## Documentation

- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [Official Docker image and version-specific storage paths](https://hub.docker.com/_/postgres)
- [Ubuntu packages](https://www.postgresql.org/download/linux/ubuntu/)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/services/databases/postgresql.nix)
