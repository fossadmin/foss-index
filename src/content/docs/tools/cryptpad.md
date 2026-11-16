---
title: CryptPad
description: End-to-end encrypted collaborative office suite - docs, sheets, slides, forms, kanban and whiteboard - you can self-host.
added: 2026-11-12
category: Collaboration
tags:
- NixOS module
icon: cryptpad.svg
iconLink: https://cryptpad.org/
mark: CP
repository: https://github.com/cryptpad/cryptpad
license: AGPL-3.0
funding:
  openCollective: https://opencollective.com/cryptpad
nixosModule: services.cryptpad
screenshot:
  src: cryptpad-source.webp
  alt: "CryptPad CryptDrive grid showing shared documents with colored type icons, a folder sidebar and a storage quota bar"
  width: 1280
  height: 720
  credit: CryptPad team
  sourceUrl: https://github.com/cryptpad/documentation/blob/main/images/drive-grid.png
  license: CC BY 4.0
  captionNote: "Documentation screenshot of a CryptDrive with shared documents, from the CC BY 4.0 licensed docs."
---

CryptPad is an AGPLv3 collaborative office suite where the server stores
only encrypted content: documents, spreadsheets, slides, forms, kanban
boards, whiteboards and a drive, all encrypted in the browser so the host
cannot read them. It is developed by XWiki SAS, and the team runs the
flagship cryptpad.fr instance; self-hosting gives you the same suite under
your own domain and quotas.

CryptPad is the name and mark of the project. This is an independent
listing, not an official CryptPad resource or an endorsement.

## Quick start

*Researched from CryptPad's documentation and admin guide on November 12,
2026. We have not installed or run it.*

### Docker (upstream's documented route)

The project publishes an official Docker setup; the documented route clones
the repository and uses its compose files:

```sh
git clone https://github.com/cryptpad/cryptpad.git
cd cryptpad
cp config/config.example.js config/config.js
docker compose up -d
```

Edit `config/config.js` first: set your domains (the main domain and the
sandbox domain - CryptPad requires two separate origins for security), the
admin email and storage limits. Serve it over HTTPS through your reverse
proxy; the admin guide documents the required headers and the two-domain
setup in detail.

### NixOS

```nix
services.cryptpad = {
  enable = true;
  settings = {
    httpSafeOrigin = "https://pad.example.com";
  };
};
```

Apply with `sudo nixos-rebuild switch`. The module provisions the service;
you still need the two-domain HTTPS setup described in the admin guide
before browsers will load pads correctly.

## First use

Register an account, open the admin panel with your configured admin key,
and confirm instance limits and public-signup policy match your intent -
self-hosted instances default to open registration. Test a shared pad with
a second browser before inviting a team.

## Documentation

- [CryptPad](https://cryptpad.org/)
- [Admin guide](https://docs.cryptpad.org/en/admin_guide/)
- [GitHub repository](https://github.com/cryptpad/cryptpad)
