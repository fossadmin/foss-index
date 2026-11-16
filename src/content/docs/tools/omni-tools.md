---
title: Omni Tools
description: Browser-based tools for PDFs, images, text and everyday file conversions.
added: 2026-11-09
category: Utilities
icon: omni-tools.svg
mark: OT
repository: https://github.com/iib0011/omni-tools
license: MIT
funding:
  githubSponsors: https://github.com/sponsors/iib0011
dripsEligible: false
managedHosting: false
screenshot:
  src: omni-tools.webp
  alt: "Omni Tools homepage showing image, PDF, text and video tool categories"
  width: 1600
  height: 760
  credit: Omni Tools
  sourceUrl: https://github.com/iib0011/omni-tools/blob/9244e02923d99cde143ddd5b8d761d9ed0997da4/docs-images/img.png
  license: MIT
  captionNote: "Project-published demo image. Screenshot version not recorded."
---

Omni Tools collects small file and text utilities in one browser interface:
PDF operations, image conversion, text manipulation and other everyday jobs.
You can host the app rather than sending each task to a different online
converter.

The project says file processing happens on the client, without uploading
files to a server. We have not independently audited every tool's network
behavior. Browser memory and CPU still limit large jobs; test a copy before
processing something irreplaceable or sensitive.

## Quick start

*Checked against the project's README on November 9, 2026.


### Docker Compose

Requires Docker and the Compose plugin. This adapts the upstream Compose
example to a localhost-only port. Save as `compose.yaml`:

```yaml
services:
  omni-tools:
    image: iib0011/omni-tools:latest
    ports:
      - "127.0.0.1:8080:80"
    restart: unless-stopped
```

Run `docker compose up -d`, then open http://localhost:8080 on the host.
The official starter needs no data volume: keep your input files and download
results yourself. Review releases before pulling an update. Use a different
host port if another local app already uses 8080.

A shared deployment needs its own access and HTTPS plan. Hosting an app
locally is not a substitute for checking how the specific conversion tool
handles your files.

## Why it's listed

A useful replacement for the pile of one-off converter sites people reach
for under time pressure. The client-side design is appealing, with the
privacy claim clearly attributed rather than presented as our audit.

## Documentation

- [Features and self-hosting](https://github.com/iib0011/omni-tools)
- [Releases](https://github.com/iib0011/omni-tools/releases)
