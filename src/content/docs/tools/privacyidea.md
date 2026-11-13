---
dripsEligible: false
title: privacyIDEA
description: Self-hosted multi-factor authentication server for managing tokens and
  authentication policies.
category: Infrastructure
tags:
- Self-hosted
mark: PI
repository: https://github.com/privacyidea/privacyidea
license: AGPL-3.0
icon: privacyidea.png
screenshot:
  src: privacyidea-source.webp
  alt: "privacyIDEA web management page listing hardware and software tokens with serial numbers, types, rollout states and assigned users"
  width: 1189
  height: 832
  credit: "Cornelius Kölbel (privacyIDEA's author, via Wikimedia Commons)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:PrivacyIDEA-token.png
  license: AGPL-3.0
  captionNote: "Uploaded by the project's author in 2016 and shows a 2.x token list; the current 3.x interface keeps the same management layout with a newer theme."
---

privacyIDEA manages authentication tokens and policies for applications and
networks. It can work with existing user directories rather than replace them.
The server code is AGPLv3; NetKnights also sells enterprise packages, support
and related products. Those services are not included in this listing.

## Quick start

*Researched from upstream's version 3.14 Docker deployment and first-steps
documentation on November 11, 2026. We have not installed or run the server.*

### Docker Compose

Use a disposable lab host or VM first. The upstream deployment requires Docker
Engine 24 or later, Compose v2, `make`, Python 3 and OpenSSL. Clone the published
release and enter its deployment directory:

```sh
git clone --branch v3.14 --depth 1 https://github.com/privacyidea/privacyidea.git
cd privacyidea/deploy/docker
make init
```

`make init` creates local secrets and configuration, and prints the bootstrap
administrator password once. Store it securely. Keep `.env`, `example.env` and
the `secrets/` directory out of any new Git commits. Review `.env` and
`example.env`, including `PRIVACYIDEA_PI_BASE_URL`. The supplied Compose stack
builds the application image locally and runs MariaDB, an initialization job,
web workers and scheduled maintenance.

For a local lab, review the port mappings in `compose.yaml` and bind the web
port to `127.0.0.1:8080:8080` rather than exposing it to a network. Then run:

```sh
make up
make smoke
```

Open `http://localhost:8080` and sign in with the bootstrap admin name from
`.env` and the password created by `make init`. Plain HTTP is for a local lab,
not a public authentication service. Use the upstream TLS/reverse-proxy guide
before any remote access. The upstream README documents `make down`, backup,
restore and upgrade helpers; check their behavior before using real tokens.

## First use

Follow the first-steps guide to create a test user resolver and realm, then
enroll a TOTP token for a test user. Verify authentication with that test token
before connecting any application. Keep a separate recovery/admin path and
back up the database, encryption key and audit keys. Losing encryption keys can
make stored token secrets unusable. Never switch a production login to a new
MFA server until recovery and restore have been tested.

## Other deployment options

### Linux

For a managed Linux deployment, use the documented Ubuntu packages or a Python
virtual environment from the installation guide. These require a database,
application configuration, encryption/audit keys and a web server. Do not assume
`pip install` alone creates a working authentication service. Use the Docker
lab above to learn the model before integrating a production login flow.

### NixOS

We have not verified a current native privacyIDEA package/module at the checked
nixpkgs revision. Old examples refer to a historical module and put secrets in
configuration strings. Do not copy those examples into the world-readable Nix
store. Use an isolated Linux VM or the upstream container workflow with secret
files outside the store until you have reviewed a current deployment route.

## Documentation

- [Installation options](https://privacyidea.readthedocs.io/en/latest/installation/)
- [Version 3.14 Docker deployment](https://github.com/privacyidea/privacyidea/blob/v3.14/deploy/docker/README.Docker.md)
- [First steps](https://privacyidea.readthedocs.io/en/latest/firststeps/)
- [Official logo-use permission](https://www.privacyidea.org/logos/)
