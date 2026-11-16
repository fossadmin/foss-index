---
title: "Kali Linux"
description: "Debian-based Linux distribution for penetration testing, security auditing and digital forensics."
added: 2026-11-10
category: Operating systems
tags:
- Penetration testing
icon: kali.svg
iconDark: kali-dark.svg
mark: KL
repository: https://gitlab.com/kalilinux/build-scripts/live-build-config
license: Per-package licenses
screenshot:
  src: kali-2021-2-xfce.webp
  alt: "Kali Linux 2021.2 Xfce desktop with a German-language file manager and an empty terminal open"
  width: 1280
  height: 720
  credit: "Purpurreiher"
  sourceUrl: https://commons.wikimedia.org/wiki/File:Kali_Linux_2021.2.png
  license: "GPL-2.0-or-later"
  commons: true
  captionNote: "Kali Linux 2021.2 with Xfce, captured on July 27, 2021. Historical screenshot, not the current 2026.3 release or our install. Resized and recompressed to WebP."
---

Kali Linux™ is a Debian-based distribution maintained by OffSec for
penetration testing, security auditing and digital forensics. Its developers
[do not recommend it as a general-purpose desktop for people unfamiliar with Linux](https://www.kali.org/docs/introduction/should-i-use-kali-linux/).
Use its security tools only on systems you own or have explicit permission
to test.

The project offers installers, pre-built virtual machines and Live images
for different uses. Choose an image for your hardware and intended workflow;
these are different downloads, not interchangeable editions.

There is no single license for the whole distribution. Kali's
[open-source policy](https://www.kali.org/docs/policy/kali-linux-open-source-policy/)
says its main section follows the Debian Free Software Guidelines, while its
non-free section includes some tools that are not open source. Kali's own
infrastructure and integration work is under GPLv3. Check each package's
copyright file for its terms.

Kali Linux is a trademark of OffSec. The name and original dragon marks are
used here only to identify the distribution; no affiliation or endorsement
is implied. See the project's [trademark policy](https://www.kali.org/docs/policy/trademark/).

## Quick start

*Checked against the project's documentation on November 10, 2026.*

### Choose an image

Start at the [official download page](https://www.kali.org/get-kali/).
Kali recommends a virtual machine for a first installation; pre-built VM
images are available there. Installer images are for installing Kali to
a disk, while Live Boot images let you run a session without installing.
Check the image's architecture and requirements against your hardware.

The current point release checked here is **2026.3**. Follow Kali's
[download verification guide](https://www.kali.org/docs/introduction/download-official-kali-linux-images/)
to verify the signed checksums before using an image. Download only through
Kali's official sources.

### Try it from USB

Kali's [Windows Live USB guide](https://www.kali.org/docs/usb/live-usb-install-with-windows/)
covers writing a Live image to an 8 GB drive or larger, using Etcher or Rufus. In Etcher,
select the verified ISO, select the correct USB drive, then flash it.
Writing the image erases that drive, so back it up and check the target
carefully. The guide links separate instructions for Linux and macOS.

### Start safely

Restart with the stick inserted and select it in your firmware's boot
menu. For a Live image, choose a Live session rather than an installation option.
Hardware support varies; check Kali's documentation for your machine.

Ordinary Live-session changes do not persist automatically. Persistent
Storage is a [separate setup](https://www.kali.org/docs/usb/usb-persistence/),
not something this quick start configures. Installation can overwrite data;
back up before using an installer. Kali recommends first
trying a virtual machine if you are new to installing it.

## Support and contribute

No direct donation route is recorded here. Kali's official
[contribution guide](https://www.kali.org/docs/community/contribute/)
explains ways to help with documentation, packaging, QA testing, mirrors
and seeding its torrents.
