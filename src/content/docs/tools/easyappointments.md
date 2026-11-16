---
title: Easy!Appointments
description: Open-source appointment scheduling with a customer booking page on your own server.
added: 2026-11-15
category: Calendar & Contacts
tags:
- Self-hosted
icon: easyappointments.png
mark: EA
repository: https://github.com/alextselegidis/easyappointments
license: GPL-3.0
managedHosting: true
screenshot:
  src: easyappointments.webp
  alt: "Easy!Appointments booking wizard on the appointment date and time step, with a month calendar, timezone picker and time slots"
  width: 1280
  height: 800
  credit: Easy!Appointments
  version: "1.6.1"
  own: true
  captionNote: "Captured by FOSS Index on the project's official demo installation (demo.easyappointments.org) with its own sample data, November 15, 2026. The booking page a customer sees; company details are the demo's placeholders."
---

Easy!Appointments gives a small business a booking page its customers can
use directly: pick a service, pick a person, pick a time. Appointments,
customers, services and working hours are managed in a web backend, and
your records live in your own database instead of a scheduling SaaS.
Optional calendar and email integrations still send data to those services.

It syncs with Google Calendar and CalDAV, sends email notifications, and
offers a REST API and webhooks for integrations. The project has been
maintained for over a decade; the author also sells managed hosting and
support, which funds the work.

## Quick start

*Verified against Easy!Appointments' own documentation and README on
November 15, 2026.*

The production install is a classic PHP application: Apache or Nginx,
PHP 8.2+ and a MySQL database. The repository's Docker Compose setup is
documented for development; the official image on
[Docker Hub](https://hub.docker.com/r/alextselegidis/easyappointments)
tracks releases.

### Docker

For a first look, the project's own demo needs no install:
[demo.easyappointments.org](https://demo.easyappointments.org).

For a local development environment, follow the repository's
[Docker guide](https://github.com/alextselegidis/easyappointments/blob/main/docs/docker.md)
and [README](https://github.com/alextselegidis/easyappointments#readme) together:

```bash
git clone https://github.com/alextselegidis/easyappointments.git
cd easyappointments
cp config-sample.php config.php
```

Set `BASE_URL` to `http://localhost`, database host to `mysql`, database
name to `easyappointments`, user to `user` and password to `password`, as
the development guide specifies. These are public development credentials.
The Compose stack exposes several services, including database/admin tools;
use an isolated local environment, not an internet-facing server.

```bash
docker compose up
```

In a second terminal in the same directory, follow the README's dependency
and asset setup:

```bash
docker compose exec php-fpm bash
npm install && composer install
npm run build
```

Then open http://localhost and finish the setup wizard. This repository
stack is for development only. The Docker guide links the separate
[production image project](https://github.com/alextselegidis/easyappointments-docker)
for that route; the classic production install is below.

### Ubuntu Server

From the [installation guide](https://easyappointments.org/docs/):

1. Create a MySQL database (or reuse an existing one).
2. Download the [latest release](https://github.com/alextselegidis/easyappointments/releases/latest)
   and upload it to your web server.
3. Make the `storage` directory writable by the web server.
4. Copy `config-sample.php` to `config.php` and set your base URL and
   database credentials.
5. Open the site in your browser and follow the setup wizard.

## First steps

In the backend, create at least one service and one provider, set working
hours, and the booking page is live at your base URL. Email notifications
need SMTP settings under Settings; Google Calendar and CalDAV sync are
under Integrations. The booking page is translatable, and customers can
book without an account.

## Why it's listed

Scheduling links from a commercial service hand every booking to that
service. Easy!Appointments covers the same job - a booking page,
reminders, calendar sync - while the appointment book stays on your
server. A mature, actively maintained project with a paid managed-hosting
route from its own author when you want someone else to run it.

## Documentation

- [Docs home](https://easyappointments.org/docs/)
- [Installation guide](https://easyappointments.org/docs/)
- [Docker notes](https://easyappointments.org/documentation/docker/)
- [Support group](https://groups.google.com/forum/#!forum/easy-appointments)
