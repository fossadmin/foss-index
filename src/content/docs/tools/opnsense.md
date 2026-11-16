---
dripsEligible: false
title: OPNsense
description: FreeBSD-based firewall and router with a web interface, VPNs and traffic
  reporting.
added: 2026-11-12
category: Networking
tags:
- VPN
icon: opnsense.png
iconLink: https://opnsense.org
mark: OP
repository: https://github.com/opnsense/core
license: BSD-2-Clause
managedHosting: true
funding:
  custom:
  - label: Donate to OPNsense
    url: https://opnsense.org/donate/
screenshot:
  src: opnsense-source.webp
  alt: OPNsense Insight traffic-reporting interface with traffic graphs
  width: 1440
  height: 986
  credit: OPNsense / Deciso
  sourceUrl: https://github.com/opnsense/docs/blob/2cae1b4f7ecf951ba7c9e8654965ae3f49315323/source/images/OPNsense-Deciso-Screenshot.png
  license: BSD-2-Clause
  captionNote: Project documentation screenshot of an older interface. Exact software
    version is not stated.
---

OPNsense is a FreeBSD-based firewall and routing platform with a web interface
for network rules, VPNs and reporting. It runs as a dedicated appliance or
virtual machine; it is not a desktop firewall app or a Docker service.

This listing covers the free Community edition, not the commercial Business
Edition. The core uses BSD-2-Clause; the full distribution contains separately
licensed packages. OPNsense is a registered trademark of Deciso B.V.; this
independent listing does not imply that we represent the project.

## Quick start

*Researched against OPNsense's installation documentation on November 11,
2026. We have not booted the installer or tested these steps.*

### Isolated VM or spare appliance

1. Start with an isolated virtual machine or spare hardware, not the router
   carrying your household's connection. Plan separate WAN and LAN interfaces.
   In a VM, use a NAT network for WAN and an isolated/internal network for LAN;
   avoid running its DHCP server on your existing home LAN.
2. Get the **dvd** image for a VM, or **vga** image for a compatible USB appliance,
   from [the official downloads](https://opnsense.org/download/). Check hardware
   requirements and verify the checksum and signature as described in the
   [installation guide](https://docs.opnsense.org/manual/install.html).
3. Boot the image. The live environment is temporary. To install, log in at the
   local console with user `installer` and the documented default password
   `opnsense`. These are public initial credentials, not credentials for an
   existing device.
4. Choose the keyboard layout and target filesystem/disk. The final disk-format
   confirmation destroys that disk's contents. Set a new root password in the
   installer, complete installation, remove the image and reboot.
5. Assign WAN and LAN at the console, checking the actual network adapters.
   From a client on the isolated LAN, open `https://192.168.1.1/` if you kept
   the default LAN address. A fresh device uses a self-signed certificate; check
   that you are reaching your own device. Sign in as `root` with the password
   you set, then complete the setup wizard and install available updates.

## First use

Keep web administration on the LAN, not exposed to the internet. Check DNS,
DHCP and firewall rules with a test client before considering a live-network
cutover. Save a configuration backup and a recovery plan first: a mistake can
cut off the network you are using to fix it.

OPNsense controls routing and traffic policy. Pi-hole filters DNS requests;
the two can complement each other, but neither description should be substituted
for the other. OPNsense is a FreeBSD distribution, so there is no native NixOS
installation tab. A Prometheus exporter in nixpkgs is not the firewall itself.

## Documentation

- [Installation and initial configuration](https://docs.opnsense.org/manual/install.html)
- [Features](https://opnsense.org/about/features/)
- [Legal and trademark guidelines](https://opnsense.org/legal-guidelines/)
