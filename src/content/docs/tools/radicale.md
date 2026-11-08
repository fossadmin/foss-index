---
title: Radicale
description: A small CalDAV and CardDAV server for calendars, tasks and address books you control.
category: Calendar & Contacts
mark: RA
repository: https://github.com/Kozea/Radicale
license: GPL-3.0
funding:
  custom:
    - label: Project contribution and donation guidance
      url: https://github.com/Kozea/Radicale/wiki/Donations
dripsEligible: true
nixosModule: services.radicale
managedHosting: true
---

Radicale stores calendars and contacts on your own server and syncs them
with CalDAV and CardDAV clients. It is a focused sync service rather than
a full groupware suite: keep using a compatible calendar or address-book
app on your devices. Its web interface manages collections, not a full
calendar view.

That smaller scope suits people who want private calendar and contact
sync without running a larger collaboration platform. Server control is
not end-to-end encryption: protect the host, backups and account passwords.

## Quick start

*Verified against Radicale's own documentation on November 8, 2026; we
haven't run these setups ourselves.*

Upstream publishes a Docker image and Python installation instructions.
The NixOS module is maintained in nixpkgs. Both examples below explicitly
enable password authentication and restrict access to each user's own
collections. They listen only on localhost. Use an SSH tunnel for setup;
remote clients need a reachable HTTPS reverse proxy before sending
passwords over a network.

### Docker Compose

In a new project directory, run `mkdir config`. Save this as
`config/config`:

```ini
[auth]
type = htpasswd
htpasswd_filename = /etc/radicale/users
htpasswd_encryption = bcrypt

[rights]
type = owner_only

[storage]
filesystem_folder = /var/lib/radicale/collections
```

Create the `admin` user's password file interactively using `htpasswd`
from the official image. This writes a bcrypt hash, not a plaintext password:

```bash
docker run --rm -it \
  --user "$(id -u):$(id -g)" \
  --entrypoint htpasswd \
  -v "$PWD/config:/config" \
  ghcr.io/kozea/radicale:stable \
  -B -c /config/users admin
chmod 644 config/config config/users
```

The configuration and password hashes must be readable by the container's
user (UID 1000); keep the project directory private on the host. Use `-c`
only when creating the file: leave it out when adding another user or it
will overwrite the existing accounts.

Save this as `compose.yaml`, adapted from the official image and Compose
example with read-only configuration and a localhost-only binding:

```yaml
services:
  radicale:
    image: ghcr.io/kozea/radicale:stable
    ports:
      - "127.0.0.1:5232:5232"
    volumes:
      - ./config:/etc/radicale:ro
      - radicale-data:/var/lib/radicale
    restart: unless-stopped

volumes:
  radicale-data:
```

Run `docker compose up -d`, open http://localhost:5232 on the host and
log in as `admin`. Create a calendar or address book, then use its URL in
a [supported client](https://radicale.org/master.html#supported-clients).
Back up both the data volume and configuration directory.

This needs Docker and the Compose plugin. On Ubuntu Server,
`sudo apt install docker.io docker-compose-v2` installs both; on NixOS,
`virtualisation.docker.enable = true;` enables Docker.

### NixOS

Create a password file before starting the service. After adding the
configuration below and rebuilding, use the module-created `radicale`
group to let the service read it:

```nix
services.radicale = {
  enable = true;
  settings = {
    server.hosts = [ "127.0.0.1:5232" ];
    auth = {
      type = "htpasswd";
      htpasswd_filename = "/var/lib/radicale/users";
      htpasswd_encryption = "bcrypt";
    };
    rights.type = "owner_only";
    storage.filesystem_folder = "/var/lib/radicale/collections";
  };
};
```

Run `sudo nixos-rebuild switch`. The service will not authenticate users
until the password file exists. Create it interactively, then restart:

```bash
nix shell nixpkgs#apacheHttpd -c sh -c 'sudo "$(command -v htpasswd)" -B -c /var/lib/radicale/users admin'
sudo chown root:radicale /var/lib/radicale/users
sudo chmod 640 /var/lib/radicale/users
sudo systemctl restart radicale
```

Open http://127.0.0.1:5232 on the host and log in as `admin`. As with
the Docker route, omit `-c` when adding subsequent users. Keep the file
outside the Nix store and back up `/var/lib/radicale`.

## Why it's listed

Calendar and contact sync are everyday needs that do not always require
a large office suite. Radicale keeps that job small and works with open
protocols, so the server and client can be chosen separately.

## Documentation

- [Installation, authentication and clients](https://radicale.org/master.html)
- [Official Docker image source](https://github.com/Kozea/Radicale/blob/master/Dockerfile)
- [NixOS module source](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/networking/radicale.nix)
