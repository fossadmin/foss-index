---
dripsEligible: false
title: Percona Server for MySQL
description: Open-source MySQL-compatible database server with added instrumentation
  and operational features.
category: Infrastructure
mark: PS
repository: https://github.com/percona/percona-server
license: GPL-2.0
icon: percona.png
nixosModule: services.mysql
screenshot:
  src: percona-source.webp
  alt: "Percona audit log filter architecture diagram: configuration zone with management functions, storage zone with system tables, and execution zone with the audit filtering engine"
  width: 1920
  height: 1046
  credit: Percona
  sourceUrl: https://github.com/percona/psmysql-docs/blob/9.7/docs/_static/audit-log-filter-arch.png
  license: CC BY 4.0
  captionNote: "A documentation architecture diagram of the audit log filter feature, not a screen capture: Percona Server is a database daemon and has no interface to photograph."
---

Percona Server for MySQL is an open-source MySQL-compatible database server.
This listing covers the 8.4 series, not Percona XtraDB Cluster, Percona Monitoring
and Management, paid support or Oracle's commercial MySQL offerings. The server
uses GPLv2; included components retain their own notices.

Percona and its product marks belong to Percona Inc. This independent listing
does not imply affiliation or endorsement.

It is a database service with a command-line client, not a built-in graphical
dashboard. A screenshot is not yet available for this listing.

## Quick start

*Researched against Percona's 8.4 Docker documentation and pinned nixpkgs sources
on November 11, 2026. We have not started a server or run these instructions.*

### Docker Compose

For a new local lab database, create `compose.yaml`:

```yaml
services:
  percona:
    image: percona/percona-server:8.4
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:?Set a unique local database password}
    volumes:
      - percona-data:/var/lib/mysql
    restart: unless-stopped
volumes:
  percona-data:
```

Set `MYSQL_ROOT_PASSWORD` in a local `.env` file and keep it out of Git. This
example does not publish database ports to the host or the network. Start it:

```sh
docker compose up -d
docker compose logs --tail=40 percona
docker compose exec percona mysql -u root -p
```

Wait for the log to report that the database is ready. At the password prompt,
enter the password you chose. At `mysql>`, try:

```sql
SELECT VERSION();
CREATE DATABASE index_demo;
SHOW DATABASES;
```

Use `exit` to leave the client. Do not put passwords directly on command lines.
The official image uses `/var/lib/mysql` for data. Initial-password variables
only initialize a new data directory; editing `.env` does not reset an existing
database password. Stop with `docker compose down` without `-v` to retain data.

Percona packages and Docker images collect telemetry. Review the project's
[telemetry guide](https://docs.percona.com/percona-server/8.4/telemetry.html)
and its current opt-out settings before deploying on a private network.

### NixOS

For a new test database only:

```nix
services.mysql = {
  enable = true;
  package = pkgs.percona-server_8_4;
  ensureDatabases = [ "index_demo" ];
};
```

Apply with `sudo nixos-rebuild switch`. Use `sudo mysql` for the module's local
administrative socket connection, then run `SELECT VERSION();` and
`SHOW DATABASES;`. Do not change a running MySQL/MariaDB service's package to
Percona without checking upgrade compatibility and tested backups first.

## First use

Create a database-specific application account instead of using root. Use a
separate graphical client if desired. Review telemetry, access control, backup
and recovery before storing important data. Compatibility does not make a
production migration automatic or reversible.

## Other Linux installations

Use Percona's documented repository installation for your supported Linux
distribution. Avoid mixing distribution MySQL/MariaDB packages with Percona
packages on a host that already stores data. For a first experiment, the
container above avoids replacing the host's database service.

## Documentation

- [Percona Server 8.4 documentation](https://docs.percona.com/percona-server/8.4/index.html)
- [Docker installation and storage](https://docs.percona.com/percona-server/8.4/docker.html)
- [NixOS MySQL module](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/nixos/modules/services/databases/mysql.nix)
- [Percona trademark policy](https://www.percona.com/trademark-policy/)
