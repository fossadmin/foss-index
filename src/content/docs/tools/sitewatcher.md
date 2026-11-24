---
title: "SiteWatcher"
description: "Self-hosted website monitor with uptime history, certificate and domain expiry checks, and status pages."
added: 2026-11-23
category: Monitoring
tags:
- Self-hosted
icon: sitewatcher.svg
mark: SW
repository: https://github.com/NikKurkov/sitewatcher
license: MIT
managedHosting: false
screenshot:
  src: sitewatcher.webp
  alt: "SiteWatcher dashboard in dark mode with grouped domains, status badges, uptime bars, success rates and response times"
  width: 1280
  height: 836
  credit: "Nikolai Kurkov"
  sourceUrl: https://github.com/NikKurkov/sitewatcher/blob/dbaf88075a4e3b6ed5a1e2ee14779d15b09d5e21/docs/screenshots/readme-overview-dark-en.png
  license: "MIT"
  captionNote: "Demo data from the project's README screenshots, not a live instance."
---

SiteWatcher checks your websites on a schedule and keeps a history of uptime and response times. It also watches HTTPS certificate and domain registration expiry, page content and defacement signals, IP addresses, blocklists, TCP ports and the route to the server, and it can publish public or private status pages. Alerts go to email, Telegram or both.

The repository's LICENSE file is MIT. The project is young (version 0.4.0, first public commits in August 2025) with a single maintainer. Some checks use external data: VirusTotal reports need your own API key.

## Quick start

*Researched against upstream documentation on November 23, 2026. We have not installed SiteWatcher or run these steps as part of this listing.*

### Docker Compose

The project's README route. Install Git and Docker with Compose, then:

```bash
git clone --depth 1 https://github.com/NikKurkov/sitewatcher.git
cd sitewatcher
docker compose run --rm --build setup
docker compose up -d
```

The `setup` command asks for a username and password. Then open http://127.0.0.1:8080, sign in and click **Add domain**. The dashboard is local by default; the [user guide](https://github.com/NikKurkov/sitewatcher/blob/main/docs/usage.en.md) covers installation without Docker, extra checks, status pages, updates and backups.

## First steps

- Add a domain and pick its checks: HTTP status and response time, certificate and domain expiry, content, ports and more.
- Choose alert channels for each site: email, Telegram or both.
- Group sites in the dashboard and look back through their check history.
- Share selected sites or groups on a public or private status page.

Source: the [SiteWatcher README](https://github.com/NikKurkov/sitewatcher#readme) and [user guide](https://github.com/NikKurkov/sitewatcher/blob/main/docs/usage.en.md).
