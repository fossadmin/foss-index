---
title: phpList
description: Self-hosted mailing lists and newsletters with subscriber management and bounce handling.
added: 2026-11-15
category: Communication
tags:
- Self-hosted
repository: https://github.com/phpList/phplist3
license: AGPL-3.0
managedHosting: true
screenshot:
  src: phplist.webp
  alt: phpList dashboard with subscriber, campaign and statistics navigation, getting-started links and an example campaign summary
  width: 975
  height: 476
  credit: phpList
  captionNote: Official README illustration with January 2019 example content. It is an older interface illustration, not a capture of the current v3.6.17 release.
  sourceUrl: https://www.phplist.com/site/images/readme-images/panel.png
icon: phplist.svg
funding:
  githubSponsors: https://github.com/sponsors/phpList
---

phpList manages mailing lists, subscribers and newsletter campaigns. It
includes segmentation, personalization, scheduling, bounce handling and
campaign statistics. You can host it yourself or use the project's phpList
Hosted service; those are distinct deployment choices.

A self-hosted copy is not a mail-delivery service by itself. Sender
reputation, provider limits, authenticated domains and unsubscribe handling
still decide whether newsletters reach inboxes responsibly.

## Quick start

*Researched from the current project README and system requirements on
November 15, 2026.*

### PHP web server

Start with [phpList's official download](https://www.phplist.org/download-phplist)
and [system setup requirements](https://resources.phplist.com/system/start).
The requirements page recommends PHP 8.1 or later and lists the extensions;
check support for your exact release and plugins before choosing a PHP version.
It uses a MySQL or MariaDB database.

1. Download the release package and put the `lists` directory in your
   site's web root, following the project's installation instructions.
2. Configure the database and application in `lists/config/config.php`.
   Keep that directory inaccessible to web visitors and keep credentials
   out of repositories.
3. Open the site's `/lists/admin/` page and complete initialization.
4. Configure the actual mail transport and queue processing, then test
   sending and bounce handling with addresses you control.

Do not treat the README's upgrade sequence as a new-install recipe on an
existing database. Back up the database and configuration before an upgrade.

## First steps

Create a private test list and check signup, confirmation, unsubscribe and
bounce flows. Set an appropriate sending rate for your provider. Only then
import a permission-based list and send a small pilot campaign. Message
opens and clicks are engagement signals, not proof that a person read a mail.

## Why it's listed

A long-running FOSS choice for newsletters when you want to keep the list
and campaign system under your control. The hosted option can reduce server
work, but it does not turn an imported address list into permission to send.

## Documentation

- [Project README](https://github.com/phpList/phplist3)
- [System requirements](https://resources.phplist.com/system/start)
- [Official download](https://www.phplist.org/download-phplist)
- [Hosted service](https://www.phplist.com/)
