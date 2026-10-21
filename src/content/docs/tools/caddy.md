---
title: Caddy
description: Fast, extensible web server with automatic HTTPS. No manual certificate handling.
category: Infrastructure
mark: CD
repository: https://github.com/caddyserver/caddy
license: Apache-2.0
funding:
  githubSponsors: https://github.com/sponsors/mholt
dripsEligible: true
nixosModule: services.caddy
managedHosting: true
---

Caddy is an open-source web server written in Go. Its headline feature is
automatic HTTPS: it obtains and renews TLS certificates from Let's Encrypt
without any configuration, which removes one of the most error-prone parts
of running a site. It serves static files, reverse-proxies to apps, and
handles HTTP/2 and HTTP/3 out of the box.

## Quick start on NixOS

A Caddy reverse proxy is a few lines in `configuration.nix`:

```nix
services.caddy = {
  enable = true;
  virtualHosts."example.com".extraConfig = ''
    reverse_proxy localhost:8080
  '';
};
```

## Why it's listed

The short configuration is easy to review. Automatic certificates remove
a manual maintenance step.
