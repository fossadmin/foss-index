---
title: ERPNext
description: Accounting, sales, stock and manufacturing in one self-hosted business system.
added: 2026-11-15
category: Finance
tags:
- Self-hosted
icon: erpnext.svg
repository: https://github.com/frappe/erpnext
license: GPL-3.0
managedHosting: true
screenshot:
  src: erpnext.webp
  alt: ERPNext Profit and Loss Statement with income, expense and net-profit charts and a quarterly report table
  width: 1600
  height: 1018
  credit: Frappe
  captionNote: Project-published illustration included in the v16.55.0 release source. It shows the project's example company, not FOSSadmin financial records.
  sourceUrl: https://raw.githubusercontent.com/frappe/erpnext/v16.55.0/erpnext/public/images/v16/hero_image.png
---

ERPNext combines a double-entry ledger with sales, purchasing, stock,
manufacturing, assets and projects. It suits a business that needs those
workflows to share records, rather than stitching together separate tools.
It runs on the Frappe Framework and your team uses it in a browser.

That breadth is also its cost: plan the chart of accounts, permissions,
stock rules and migration with the people responsible for your books.
It is not the smallest option for a sole proprietor who only needs a ledger.
The project's own Frappe Cloud is a paid managed-hosting option; self-hosting
is available without a software subscription.

## Quick start

*Researched from ERPNext's README and Frappe Docker documentation on
November 15, 2026.*

### Docker (disposable demo)

The [upstream README](https://github.com/frappe/erpnext#try-on-your-environment)
provides this evaluation environment:

```bash
git clone https://github.com/frappe/frappe_docker
cd frappe_docker
docker compose -f pwd.yml up -d
```

Wait for the `create-site` container to finish, then open
http://localhost:8080. The documented demo login is `Administrator` with
password `admin`. Keep it isolated: these are public demo credentials,
not a production account. The README calls this a disposable demo and says
custom apps cannot be installed in it.

For real business records, follow the production deployment instructions
in [Frappe Docker](https://github.com/frappe/frappe_docker), or choose
managed hosting deliberately. Do not turn the demo into a production
server by opening its port to the internet.

## First steps

Create an example company and walk through one sale, purchase and payment
before importing anything real. Review currencies, fiscal year, taxes and
user permissions with your accountant. Back up the database and attached
files, and prove you can restore them before a migration.

## Why it's listed

It is a FOSS option for businesses whose needs go beyond bookkeeping into
stock or operations. A QuickBooks export is not a complete ERP migration:
map the records, reconcile opening balances and run both systems for an
accounting period before retiring the old one.

## Documentation

- [User documentation](https://docs.frappe.io/erpnext/)
- [Docker deployment](https://github.com/frappe/frappe_docker)
- [Community forum](https://discuss.frappe.io)
- [Project site](https://frappe.io/erpnext)
