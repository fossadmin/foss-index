---
title: Mautic
description: Self-hosted marketing automation for contacts, segments, campaigns and email.
added: 2026-11-15
category: Communication
tags:
- Self-hosted
repository: https://github.com/mautic/mautic
license: GPL-3.0-or-later
managedHosting: true
screenshot:
  src: mautic.webp
  alt: Mautic documentation screenshot showing dashboard date-range controls
  width: 928
  height: 356
  credit: Mautic
  captionNote: Illustration from the official Mautic 7 documentation. It shows the dashboard controls; the image does not identify the exact application release.
  sourceUrl: https://docs.mautic.org/en/7.0/_images/dashboard-date-filters.png
icon: mautic.png
funding:
  githubSponsors: https://github.com/sponsors/mautic
  openCollective: https://opencollective.com/mautic
---

Mautic manages contacts, segments and campaigns, with forms, landing
pages and email automation. It is a larger marketing system than a simple
newsletter sender. You host the application and database; sending mail
still needs a configured delivery service or mail server.

It can record visitor activity and message engagement. Self-hosting that
tracking does not make it anonymous or remove consent and privacy duties.
Decide which tracking you actually need before enabling it.

## Quick start

*Researched from the official Mautic 7 installation guide on November 15, 2026.*

### Web server (production package)

Use the [official download page](https://www.mautic.org/download/) and
[installation guide](https://docs.mautic.org/en/7.0/getting_started/how_to_install_mautic.html).
The [current requirements matrix](https://mautic.org/download/requirements)
lists PHP 8.2, 8.3, 8.4 or 8.5 for Mautic 7, and MySQL 8.4+ or MariaDB
10.11.0+ for Mautic 7 and later. Enable its listed PHP extensions and have
npm available. Do not copy the installation page's older PHP 7.4/major-v5
examples into a Mautic 7 installation.

1. Prepare a supported PHP web server and database. The project recommends
   a VPS or dedicated server, rather than cheap shared hosting.
2. Download the production package and extract it in the web server's site
   directory. A Git clone is primarily the development/testing route, not
   the same thing as a complete production package.
3. Set up HTTPS, then open your chosen site URL. Resolve the installer's
   environment checks before supplying the database connection.
4. Create an administrator account and configure your mail transport.
   Keep credentials in local configuration or a secret store.
5. Finish the guide's scheduled-task and queue setup before relying on
   automated campaigns. An installed login page is not a working mail system.

The download page also links trial and hosted-provider options. Those are
services from providers, not a requirement to use the open-source code.

## First steps

Use a small internal test segment. Check the sender domain, a test message,
bounce handling and the unsubscribe path before importing subscribers or
activating a campaign. Import only contacts you have permission to email.
Back up the database and application configuration before upgrades.

## Why it's listed

A FOSS marketing-automation option when contact journeys and segmentation
matter enough to justify running a full system. Delivery costs, server
maintenance and lawful subscriber handling remain your responsibility.

## Documentation

- [Mautic 7 documentation](https://docs.mautic.org/en/7.0/)
- [Installation](https://docs.mautic.org/en/7.0/getting_started/how_to_install_mautic.html)
- [Download and hosted routes](https://www.mautic.org/download/)
- [Source](https://github.com/mautic/mautic)
