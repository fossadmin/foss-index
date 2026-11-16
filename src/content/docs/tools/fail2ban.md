---
title: Fail2Ban
description: Watch service logs and temporarily ban hosts that repeatedly fail authentication.
added: 2026-11-15
category: Security
icon: fail2ban.png
repository: https://github.com/fail2ban/fail2ban
license: GPL-2.0-or-later
managedHosting: false
screenshot:
  src: fail2ban.webp
  alt: Actual Fail2Ban 1.1.1 client help output listing configuration, socket, logging and configuration-test options
  width: 1280
  height: 650
  credit: Fail2Ban
  captionNote: Rendered from actual fail2ban-client --help output from the upstream 1.1.1 tag. No running jail, ban action or production firewall test is implied.
  terminal: true
  version: 1.1.1
funding:
  githubSponsors: https://github.com/sponsors/sebres
  liberapay: https://liberapay.com/sebres
---

Fail2Ban watches logs for patterns such as repeated failed SSH logins and
uses configured actions to ban the source temporarily, often through the
host firewall. It supports many service filters and lets administrators
write their own.

It reduces noisy retries; it does not fix weak passwords, authenticate
users or replace timely updates. Reverse proxies and changing log formats
need care, because banning the proxy instead of the originating address
can block legitimate visitors.

## Quick start

*Researched from the current project README and package-installation wiki
on November 15, 2026.*

### Linux distribution package

Use your distribution's package manager, as the
[official installation wiki](https://github.com/fail2ban/fail2ban/wiki/How-to-install-fail2ban-packages)
recommends. Package names, service defaults and log backends vary, so check
your distribution's instructions rather than running a copied command for
a different system.

After installing, inspect the client's available commands:

```bash
fail2ban-client --help
```

Review the supplied `jail.conf` and put local overrides in a `.local` file
rather than editing packaged defaults. Confirm the service's actual log
path or journal backend, filter and firewall action. Test the configuration
with `fail2ban-client -t` before enabling a jail.

Keep an existing administration session open and confirm your allowlist
and recovery access before starting or restarting a jail remotely. An
incorrect rule can lock you out of the server you are trying to protect.

## First steps

Start with one service you understand. Check status and logs, verify that
the filter matches the intended failures, and confirm that legitimate
access still works. Do not simulate a ban from your only recovery address.
Use keys or MFA where the protected service supports them.

## Why it's listed

A small, established FOSS building block for server defense. It is useful
alongside secure service configuration, not a claim that a host is secure
because a daemon is installed.

## Documentation

- [Project README and source](https://github.com/fail2ban/fail2ban)
- [Package installation](https://github.com/fail2ban/fail2ban/wiki/How-to-install-fail2ban-packages)
- [Project wiki](https://github.com/fail2ban/fail2ban/wiki)
- [Issue tracker](https://github.com/fail2ban/fail2ban/issues)
