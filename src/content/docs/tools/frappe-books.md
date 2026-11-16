---
title: Frappe Books
description: Browser-based accounting, invoicing and stock for small teams on a Frappe server.
added: 2026-11-15
category: Finance
tags:
- Self-hosted
icon: frappe-books.svg
repository: https://github.com/frappe/frappe-books
license: AGPL-3.0
managedHosting: false
screenshot:
  src: frappe-books.webp
  alt: Frappe Books browser dashboard with sales and purchase totals, cashflow, profit and loss, and top expenses for an example company
  width: 1600
  height: 1000
  credit: Frappe
  captionNote: Project-published dashboard from the current server/browser app, included in release v16.2.1. This is not the archived Electron desktop application.
  sourceUrl: https://raw.githubusercontent.com/frappe/frappe-books/v16.2.1/docs/images/desktop-dashboard.png
---

The current Frappe Books is an accounting app for the Frappe Framework.
It covers double-entry accounts, quotations, invoices, payments, inventory
and point of sale. A team signs in through a browser on a computer or phone;
the records live in the Frappe site database on your server.

This is a different deployment model from the older Electron desktop app.
That repository is archived and no longer supported. The current source
is [frappe/frappe-books](https://github.com/frappe/frappe-books), licensed
AGPL-3.0-only. Do not download an old desktop installer expecting the
current browser/server product.

## Quick start

*Researched from the current installation guide on November 15, 2026.*

### Bench (local evaluation)

The [stable installation guide](https://docs.frappe.io/books/installation)
requires Frappe Framework version-16 (16.36.0 or later), Python 3.14,
Node.js 24 with Yarn, Redis and MariaDB 11.8. Have those services available
before following its Bench sequence:

```bash
uv python install 3.14
uv tool install frappe-bench
bench init --frappe-branch version-16 --python "$(uv python find 3.14)" books-bench
cd books-bench
bench get-app --branch version-16 https://github.com/frappe/frappe-books
bench new-site books.localhost --db-type mariadb --set-default
bench --site books.localhost install-app frappe_books
bench start
```

Open http://books.localhost:8000/books and sign in as Administrator with
the password you set during site creation. Keep passwords local, not in
chat or a shared command history. A remote database needs the extra
connection options described in the guide.

`bench start` is a development/evaluation server, not a finished public
production deployment. Stable v16 supports MariaDB only; PostgreSQL and
SQLite support on `develop` belongs to the in-development v17 branch.

## First steps

Complete the company setup wizard with example data first. Review the
chart of accounts, currencies, opening balances and user roles. The
[Import Wizard](https://docs.frappe.io/books/import-wizard) helps bring in
records, but imports still need reconciliation. Back up the database,
attached files and `site_config.json`; test a restore before using real books.

## Why it's listed

A smaller accounting-focused option than ERPNext, with shared browser
access instead of a proprietary per-user bookkeeping subscription. It
still needs a server operator and an accounting migration plan. Its old
desktop application's history is not evidence that this newer server
edition has the same deployment maturity.

## Documentation

- [Current installation guide](https://docs.frappe.io/books/installation)
- [User guide](https://docs.frappe.io/books)
- [Import Wizard](https://docs.frappe.io/books/import-wizard)
- [Current source](https://github.com/frappe/frappe-books)
