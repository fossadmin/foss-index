---
title: Firefly III
description: Self-hosted personal finance tracking with accounts, budgets, rules and reports.
added: 2026-11-15
category: Finance
tags:
- Self-hosted
icon: firefly-iii.png
repository: https://github.com/firefly-iii/firefly-iii
license: AGPL-3.0-or-later
managedHosting: true
screenshot:
  src: firefly-iii.webp
  alt: Firefly III official demo dashboard with account balances, transaction examples and budget navigation
  width: 1280
  height: 720
  credit: Firefly III
  captionNote: Captured on the official shared demo on November 15, 2026. The demo identifies itself as vdevelop/2026-11-14, not the stable v6.7.9 release. Example demo data, not personal financial records.
  own: true
funding:
  githubSponsors: https://github.com/sponsors/JC5
  liberapay: https://liberapay.com/JC5
guides:
  - label: "Ditch QuickBooks: A Practical Guide to Open-Source Bookkeeping"
    url: https://fossadmin.com/blog/2026-11-15-ditch-quickbooks-open-source-bookkeeping/

---

Firefly III helps a person or household track income, spending, accounts,
budgets and savings goals. Rules can categorize imported transactions,
and reports make spending patterns easier to see. It uses double-entry
bookkeeping internally, but its stated purpose is personal finance.

It is not a replacement for a business general-ledger package with payroll,
stock and tax workflows. In a QuickBooks comparison, it belongs in the
personal-budgeting branch of the decision, not the small-business ledger
branch. You can self-host it; the project also links paid third-party
hosting options, which are separate from the software license.

## Quick start

*Researched from the project's Docker guide on November 15, 2026.*

### Docker Compose

Follow the [official Docker guide](https://docs.firefly-iii.org/how-to/firefly-iii/installation/docker/).
It links three files: `docker-compose.yml`, the app environment file
(saved as `.env`), and database variables (saved as `.db.env`). Save all
three in one directory and read them before starting.

1. Replace the example database password in both environment files with
   the same strong local password before the first start. Configure the
   app key, URL, timezone and scheduled-task token as the files direct.
2. Review port exposure. The supplied Compose file publishes host port 80;
   keep access local/trusted until authentication, HTTPS and backups are ready.
3. Start the stack:

```bash
docker compose -f docker-compose.yml up -d --pull=always
docker compose -f docker-compose.yml logs -f
```

Once the logs report the installation is complete, open http://localhost
(or the port you configured) and create your own account. This stack does
not automatically include the separate Data Importer. Never reuse the
public demo login on your installation.

## First steps

Create asset accounts and opening balances, then enter a few manual
transactions. Reconcile them with a statement before importing a history.
If you add the Data Importer, start with a small sample and check for
duplicates. Back up both the database and uploaded files, and keep the
application secrets needed for a restore safely with the backup plan.

## Why it's listed

A FOSS option for people who want their financial overview on a server
they control. No automatic bank connection is required; manual entry and
file imports let you choose how much integration to add.

## Documentation

- [Project documentation](https://docs.firefly-iii.org/)
- [Docker installation](https://docs.firefly-iii.org/how-to/firefly-iii/installation/docker/)
- [Source and support](https://github.com/firefly-iii/firefly-iii)
- [Official demo](https://demo.firefly-iii.org/)
