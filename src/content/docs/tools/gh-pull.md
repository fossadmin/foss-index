---
title: "gh-pull"
description: "Local pull request dashboard for the GitHub CLI, with saved views, stacked-PR lanes and CI state."
added: 2026-11-23
category: Development
icon: gh-pull.png
mark: GP
repository: https://github.com/shiqicao/gh-pull
license: MIT
managedHosting: false
screenshot:
  src: gh-pull.webp
  alt: "gh-pull dashboard in dark mode with a saved team-reviews view, pull requests grouped by repository with dependency lanes, CI badges, review states and reviewer rings"
  width: 1280
  height: 1080
  credit: "Shiqi Cao"
  sourceUrl: https://github.com/shiqicao/gh-pull/blob/e9a3d986a08af61d87f6beb80ddb926da2db2d9a/docs/demo.png
  license: "MIT"
  captionNote: "Fictional pull requests, per the project's README."
---

gh-pull is a GitHub CLI extension that opens a pull request dashboard in your local browser. Search across repositories with GitHub qualifiers, save searches as one-click views, group pull requests by repository, author, status or checks, follow stacked PRs through dependency lanes, jump from a failed CI check to its job, track review state and unresolved threads, comment, and merge eligible PRs.

The repository's LICENSE file is MIT. The project is young (first commits in October 2026) with a single maintainer. It needs a GitHub.com account through the GitHub CLI's sign-in; GitHub Enterprise hosts are not supported.

## Quick start

*Researched against upstream documentation on November 23, 2026. We have not installed gh-pull or run these steps as part of this listing.*

### Linux

Install the [GitHub CLI](https://cli.github.com/) through your distribution, then:

```sh
gh auth login --hostname github.com  # skip if already signed in
gh extension install shiqicao/gh-pull
gh pull
```

### Windows and macOS

Install the GitHub CLI from [cli.github.com](https://cli.github.com/), then run the same three commands above in your terminal.

### NixOS

The GitHub CLI is packaged in nixpkgs (source: [pkgs/by-name/gh/github-cli/package.nix](https://github.com/NixOS/nixpkgs/blob/2786a2a72088ecf32aea5b3ec52099e6a7cff78f/pkgs/by-name/gh/github-cli/package.nix)):

```nix
environment.systemPackages = [ pkgs.github-cli ];
```

Rebuild with `sudo nixos-rebuild switch`, then sign in and install the extension with the same `gh` commands above.

## First steps

- Run `gh pull`; the dashboard opens in your browser with your existing GitHub sign-in.
- Search `is:open is:pr review-requested:@me` to find reviews waiting on you, then save that search as a view.
- Group by repository to see which pull requests depend on each other.
- Hover a failed CI badge and jump straight to the failing job.

Source: the [gh-pull README](https://github.com/shiqicao/gh-pull#readme) and [usage guide](https://github.com/shiqicao/gh-pull/blob/main/docs/usage.md).
