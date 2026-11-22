---
title: SendPortal
description: A self-hosted Laravel email-marketing app for subscribers, segments and campaigns.
added: 2026-11-15
category: Communication
tags:
- Self-hosted
repository: https://github.com/mettle/sendportal
license: MIT
managedHosting: false
screenshot:
  src: sendportal.webp
  alt: SendPortal campaign report with open statistics and a table of example message recipients
  width: 1170
  height: 731
  credit: SendPortal
  captionNote: Official project-site illustration with January 2020 example timestamps. Screenshot version is not recorded and may differ from the current v4 interface.
  sourceUrl: https://sendportal.io/img/landing/campaigns.png
icon: sendportal.png
guides:
  - label: "Best Open Source Email Marketing Platforms Compared"
    url: https://fossadmin.com/blog/2026-11-08-open-source-email-marketing/

---

SendPortal manages subscribers, segments, email campaigns and workspaces.
The standalone app adds authentication around SendPortal Core; the core
package can also be integrated into an existing Laravel application.

It connects to delivery providers such as Amazon SES, Mailgun and SendGrid.
Those services are separate from SendPortal and may charge for sending.
An MIT-licensed campaign app is not a promise that the whole delivery chain
is FOSS, free or private.

## Quick start

*Researched from the official v4 installation guide and current README on
November 15, 2026.*

### PHP and Composer

The [v4 guide](https://sendportal.io/docs/v4/getting-started/installation)
requires PHP 8.3+, Git, Composer and a supported MySQL or PostgreSQL server;
the standalone app uses Laravel 13. Follow the release-specific guide rather
than an old v2 or v3 tutorial.

The guide begins with:

```bash
git clone --depth 1 --branch v4.0.0 https://github.com/mettle/sendportal.git
cd sendportal
composer install
```

The latest recorded release is v4.0.0.1, while the guide's example still
pins v4.0.0. Check the patch-release notes before choosing the production
pin; do not silently track `master` as an update strategy.

Complete the guide's configuration/setup next. Supply a local application
key and database credentials, set a real application URL, and configure
production mode instead of retaining `.env.example`'s debug/local settings.
Point Apache or Nginx at the application's `public` directory, not its
repository root. Configure queues, scheduling and your delivery provider
before sending any campaign.

## First steps

Create a workspace and an internal test segment. Connect a delivery service
using local secrets, then test sending, webhooks, bounces and unsubscribe
handling. Import only subscribers you can lawfully email. Back up the
database and configuration before upgrades or a large import.

## Why it's listed

A focused FOSS option for a team comfortable maintaining Laravel, without
requiring a larger marketing-automation platform. It keeps campaign
management self-hosted while making the external delivery dependency explicit.

## Documentation

- [Installation](https://sendportal.io/docs/v4/getting-started/installation)
- [Documentation home](https://sendportal.io/docs)
- [Standalone source](https://github.com/mettle/sendportal)
- [Core package source](https://github.com/mettle/sendportal-core)
