---
title: Mealie
description: Self-hosted recipe manager and meal planner - import recipes from a URL, organize them, plan the week and build shopping lists.
category: Home
tags:
- Self-hosted
icon: mealie.png
iconLink: https://mealie.io/
mark: ME
repository: https://github.com/mealie-recipes/mealie
license: AGPL-3.0
funding:
  githubSponsors: https://github.com/sponsors/hay-kot
nixosModule: services.mealie
screenshot:
  src: mealie-source.webp
  alt: "Mealie's recipe grid with photographed dishes shown across a desktop monitor, laptop, tablet and phone mockup"
  width: 1036
  height: 598
  credit: Mealie contributors
  sourceUrl: https://github.com/mealie-recipes/mealie/blob/mealie-next/docs/docs/assets/img/home_screenshot.png
  license: AGPL-3.0
  captionNote: "The project's own docs image showing the recipe grid on several device mockups; not our install."
---

Mealie is an AGPLv3 recipe manager and meal planner for your own server. Its
standout trick is importing a recipe straight from a URL - it parses the
page into ingredients, steps and a photo - and on top of that it adds tags,
cookbooks, meal plans, shopping lists and a household sharing model. It is
the recipe equivalent of a media server: one place your family's collection
lives, reachable from any browser.

Mealie is the name and mark of the project. This is an independent listing,
not an official Mealie resource or an endorsement.

## Quick start

*Researched from Mealie's documentation and GitHub releases on November 12,
2026. We have not installed or run it.*

### Docker (upstream's documented route)

Mealie is distributed as a Docker image; the documented route is Docker
Compose:

```yaml
services:
  mealie:
    image: ghcr.io/mealie-recipes/mealie:latest
    container_name: mealie
    ports:
      - "9925:9000"
    volumes:
      - mealie-data:/app/data/
    restart: always
volumes:
  mealie-data:
```

The docs recommend pinning a version tag instead of `latest` for production.
Open `http://<server-ip>:9925`, sign in with the documented default admin
credentials and change them immediately. Put it behind HTTPS if it leaves
your LAN.

### NixOS

```nix
services.mealie = {
  enable = true;
  port = 9925;
};
```

Apply with `sudo nixos-rebuild switch`. The module runs Mealie with its
database on the host; set `settings` for mail and other options per the
module's documentation.

## First use

Create your household, import a handful of favorite recipes by URL, and
check how the parser handled each - tidy ingredients and steps before
building plans on top. Set up the automatic backup task in the admin
settings; recipe collections are painful to rebuild from memory.

## Documentation

- [Mealie](https://mealie.io/)
- [Documentation](https://docs.mealie.io/)
- [GitHub repository and releases](https://github.com/mealie-recipes/mealie)
