---
dripsEligible: false
title: DBeaver Community
description: Desktop database client for browsing tables, running SQL and exploring
  schemas.
category: Development
icon: dbeaver.png
mark: DB
repository: https://github.com/dbeaver/dbeaver
license: Apache-2.0
screenshot:
  src: dbeaver-source.webp
  alt: "DBeaver 22.0.0 SQL editor with a table-data grid, column metadata tabs and a dark theme"
  width: 1440
  height: 839
  credit: "VulcanSphere (Wikimedia Commons contributor)"
  sourceUrl: https://commons.wikimedia.org/wiki/File:DBeaver_22.0.0_screenshot.png
  license: Apache-2.0
  captionNote: "Shows version 22.0.0 from 2022, not the current release. The editor layout it demonstrates is unchanged in 26.x."
---

DBeaver Community is a desktop client for connecting to databases, browsing
records, editing data and running SQL. It does not replace a database server:
PostgreSQL stores the data; DBeaver provides a graphical way to work with it.
A sample SQLite database is enough to explore the interface without a server.

This listing is for the Apache-2.0 Community edition from **dbeaver.io**.
DBeaver PRO and its commercial-only features are separate products. Database
drivers and bundled dependencies can carry their own licenses.

## Quick start

*Researched against upstream documentation on November 11, 2026. We have not
installed DBeaver or run these steps as part of this listing.*

### Linux

Download the **Community** DEB or RPM for your architecture from
[the Community download page](https://dbeaver.io/download/).
From the download folder, install the exact filename you downloaded:

```sh
# Debian / Ubuntu: replace the filename with your downloaded Community DEB
sudo apt install ./dbeaver-ce_VERSION_amd64.deb

# Fedora: replace the filename with your downloaded Community RPM
sudo dnf install ./dbeaver-ce-VERSION-stable.x86_64.rpm
```

Use one command for your distribution, not both. Open DBeaver from your
application menu. You do not need a paid license for Community.
Choose **Help > Create Sample Base** to add the sample SQLite database.
Expand its Tables node and open a table's Data tab to browse sample records.

### Windows and macOS

Get the Community installer for your system from
[dbeaver.io/download](https://dbeaver.io/download/), run it and open DBeaver.
Use **Help > Create Sample Base** for a local demo before connecting real data.
For an open-source operating system too, explore the Index's Linux listings.

### NixOS

nixpkgs packages the Community binary as `dbeaver-bin`:

```nix
environment.systemPackages = [ pkgs.dbeaver-bin ];
```

Rebuild with `sudo nixos-rebuild switch`, then launch DBeaver from the
application menu and create the sample base above. This is an open-source
application packaged from upstream binaries; `-bin` is not a PRO license.

## First use

To connect PostgreSQL, choose **Database > New Database Connection > PostgreSQL**,
then enter the host, database and credentials for your own server. DBeaver may
ask to download its JDBC driver on first connection. Use **Test Connection**
before finishing. Start with a read-only database account when exploring
important data: editing a cell or running SQL can change the real database.

## Documentation

- [Community license and features](https://dbeaver.io/about/)
- [Standalone installation](https://dbeaver.com/docs/dbeaver/Installation/)
- [Create sample database](https://dbeaver.com/docs/dbeaver/Sample-Database/)
- [Nix package source](https://github.com/NixOS/nixpkgs/blob/8e246c66fe7112839781b2200b017f0a587d25d3/pkgs/by-name/db/dbeaver-bin/package.nix)
