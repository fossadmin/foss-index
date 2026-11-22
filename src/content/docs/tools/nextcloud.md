---
title: Nextcloud
description: File sync and sharing plus calendars, contacts, mail, chat and office documents in one self-hosted hub.
added: 2026-11-08
category: Collaboration
tags:
- Self-hosted
- NixOS module
icon: nextcloud.svg
mark: NC
repository: https://github.com/nextcloud/server
license: AGPL-3.0
funding:
  custom:
    - label: Nextcloud Enterprise subscriptions
      url: https://nextcloud.com/enterprise/
    - label: Nextcloud Include fund
      url: https://nextcloud.com/include/
dripsEligible: true
nixosModule: services.nextcloud
managedHosting: true
screenshot:
  src: nextcloud.webp
  alt: "Nextcloud Files interface with file list, sharing sidebar and mobile photos app in a marketing composite"
  width: 1400
  height: 800
  credit: Nextcloud
  sourceUrl: https://github.com/nextcloud/screenshots/blob/master/nextcloud-hub-25-files.png
  license: CC BY-SA 4.0
  captionNote: "Official Nextcloud Hub 25 marketing screenshot with demo content. Not our install."
guides:
  - label: "How to Set Up a Self-Hosted Cloud with Nextcloud: A Beginner's Guide"
    url: https://fossadmin.com/blog/2026-10-25-nextcloud-self-hosted-guide/

---

Nextcloud is a self-hosted collaboration hub: it stores files, calendars,
contacts and mail on your own server and syncs them to desktop and mobile
clients. People can share links, co-edit documents and hold calls without
leaving the same account. An app store adds more tools on top.

It is developed by Nextcloud GmbH together with a large community, and the
company funds the work through enterprise subscriptions rather than
donations. The Include fund recorded in the project's funding file supports
diversity in its community.

Where Syncthing syncs folders between devices and Radicale serves only
calendars and contacts, Nextcloud covers all of it in one place. That scope
has a cost: it is a large PHP application that needs regular updates and
more care than a small single-purpose service. It usually faces the
internet, so plan for prompt upgrades, HTTPS and backups from the start.

## Quick start

*Verified against Nextcloud's own documentation on November 8, 2026.*

The official installation method is Nextcloud All-in-One (AIO), a
Docker-based setup maintained by Nextcloud GmbH that bundles the database,
caching, office and backup pieces. The NixOS module is maintained in
nixpkgs. Both routes expect a domain name and a valid TLS certificate for
real use; AIO's setup interface can register a free `dedyn.io` subdomain
for you if you do not have one.

### Docker (Nextcloud All-in-One)

Run the master container with the command from the AIO documentation, here
with its management interface bound to localhost:

```bash
sudo docker run \
  --init \
  --sig-proxy=false \
  --name nextcloud-aio-mastercontainer \
  --restart always \
  --publish 127.0.0.1:8080:8080 \
  --volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
  --volume /var/run/docker.sock:/var/run/docker.sock:ro \
  ghcr.io/nextcloud-releases/all-in-one:latest
```

Reach the AIO interface through an SSH tunnel (`ssh -L
8080:localhost:8080 user@server`) at https://localhost:8080 and accept the
self-signed certificate. It asks for the domain Nextcloud will answer to
and validates it: point a domain at the server, register the free deSEC
subdomain offered in the interface, or follow the reverse-proxy and
local-network guides in the AIO repository. Only then does it start the
Nextcloud containers; automatic certificates need ports 80 and 8443
reachable, so add those `--publish` flags or use your own reverse proxy.

This needs Docker. On Ubuntu Server, `sudo apt install docker.io
docker-compose-v2` covers it; on NixOS, `virtualisation.docker.enable =
true;` enables Docker. Use AIO's built-in Borg-based backup, and keep the
`nextcloud_aio_mastercontainer` volume - the backups depend on it.

### NixOS

```nix
services.nextcloud = {
  enable = true;
  hostName = "nextcloud.example.com";
};
```

Run `sudo nixos-rebuild switch`. The module installs Nextcloud and serves
it through nginx on the configured host name, and without database options
the installer uses SQLite - fine for a first look. For real use, pick
PostgreSQL:

```nix
services.nextcloud = {
  enable = true;
  hostName = "nextcloud.example.com";
  database.createLocally = true;
  config.dbtype = "pgsql";
};
```

Then create the administrator account from the command line:

```bash
sudo nextcloud-occ user:add admin
sudo nextcloud-occ group:adduser admin admin
```

The module keeps its data in `/var/lib/nextcloud`; include that in your
backup plan, and serve the site over HTTPS before accounts and files go
through it.

## Why it's listed

A household or small team often wants files, calendars and contacts without
splitting them across three providers. Nextcloud puts them on one server
with open protocols and apps for every platform, and it is the tool many
self-hosters already know.

## Documentation

- [Installation and server administration](https://docs.nextcloud.com/server/latest/admin_manual/installation/index.html)
- [Nextcloud All-in-One setup and guides](https://github.com/nextcloud/all-in-one)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/web-apps/nextcloud.nix)
