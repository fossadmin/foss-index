---
title: Formlander
description: Self-hosted form backend that keeps your site's form submissions on your own server.
added: 2026-11-15
category: Infrastructure
tags:
- Self-hosted
icon: formlander.svg
mark: FO
repository: https://github.com/karloscodes/formlander
license: MIT
managedHosting: false
screenshot:
  src: formlander.webp
  alt: "Formlander admin dashboard showing submission counts, a latest-submissions list and three forms, all with fictional sample data"
  width: 1280
  height: 800
  credit: Formlander
  version: "v3.10.1"
  own: true
  captionNote: "Local test install built from the v3.10.1 source, seeded with the project's own fictional sample data. Test install only, not a production setup."
---

Formlander receives the form posts of a static or serverless site on your
own server. Each submission lands in one SQLite file, shows up in an admin
dashboard, and can be forwarded to a webhook or by email - no form SaaS in
the middle. You control the server and where it sends submissions.

A form points at it with a plain HTML `action`, so it works with any
static-site generator and needs no JavaScript. Spam handling is built in:
a honeypot field, rate limiting, allowed-site checks and optional
Cloudflare Turnstile. A hosted Formlander Cloud is announced as a waitlist
but does not exist yet; today it is self-host only.

## Quick start

*Verified against Formlander's own README and release notes on November
15, 2026.*

One Go binary and one SQLite file; the official image is
`karloscodes/formlander` on Docker Hub. Keep the same session secret
across restarts, or every login session ends.

### Docker

```bash
docker run -d --name formlander -p 127.0.0.1:8080:8080 \
  -e FORMLANDER_SESSION_SECRET="$(openssl rand -hex 32)" \
  -v "$PWD/storage:/app/storage" \
  karloscodes/formlander:latest
```

Open http://localhost:8080 and sign in as `admin@formlander.local`. The
first password is random: read it from
`storage/initial-admin-password`, or with
`docker exec <container> cat /app/storage/initial-admin-password`.
The image runs in production mode, which marks the session cookie
`Secure`: put HTTPS (Caddy, Nginx, Traefik) in front of it for real use.
For backups while it runs, use SQLite's online backup for the database
and separately copy `storage/uploads/`, as the deployment guide explains.
A filesystem copy of a live database is not a proven backup.

This needs Docker and OpenSSL. Use the Docker installation route for your
operating system. Save the generated session secret locally if you recreate
the container; the example generates a new secret on each invocation.

### Ubuntu Server

The official installer sets up Formlander with HTTPS, live database
backups and a nightly update through Chasen, on a fresh Ubuntu or Debian server with an
A record for your domain and ports 80 and 443 open:

```bash
curl -fsSL https://formlander.com/install | sudo bash -s forms.example.com
```

Put your domain in place of `forms.example.com`. The installer prints the
first admin password; sign in at `https://forms.example.com` as
`admin@formlander.local` and change it in Settings. Running the same
command again updates the server. Details and the deploy-from-your-laptop
variant are in the [deployment guide](https://formlander.com/docs/deployment/).
Chasen's backups cover the database, not uploaded files; back up
`storage/uploads/` separately and test your restore.

## First steps

Create a form in the dashboard and add your site's domain under Allowed
sites - until you do, every submission is rejected with "origin not
allowed". Paste the generated HTML into your site, keep the hidden
`__fl_hp` honeypot field, and set where submissions go: dashboard only,
email, or a webhook. The optional
`https://your-server/assets/formlander.js` script adds retries and a
sending state and falls back to a plain post without JavaScript.

## Why it's listed

A contact or intake form is often the one dynamic piece of an otherwise
static site, and it is exactly where visitor data leaks to a third party.
Formlander keeps that piece on your own server with almost nothing to
run. We use it for the intake forms on FOSSadmin's own site.

## Documentation

- [Docs home](https://formlander.com/docs/)
- [Deployment guide](https://formlander.com/docs/deployment/)
- [README and configuration](https://github.com/karloscodes/formlander#readme)
