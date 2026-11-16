---
title: "uBlock Origin"
description: "Efficient content blocker for Firefox and Chromium browsers."
added: 2026-11-10
category: Security
icon: ublock-origin.svg
mark: UB
repository: https://github.com/gorhill/uBlock
license: GPL-3.0
managedHosting: false
screenshot:
  src: ublock-origin.webp
  alt: "The uBlock Origin popup panel showing blocked requests on a page"
  width: 1011
  height: 758
  credit: "the uBlock Origin listing on Firefox Add-ons"
  sourceUrl: https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/
  captionNote: "From the developer's official Firefox Add-ons listing, published 2021, so the interface has changed since. It shows the popup panel over a Business Insider page."
---

uBlock Origin is a browser extension that blocks ads, trackers and other unwanted content using filter lists. It runs inside your browser, with no server involved.

Browser vendors differ in how much extension blocking they allow; check the project's own notes for your browser.

## Quick start

*Checked against the project's own documentation on November 9, 2026. Commands are copied from the project's pages, or from Flathub and Homebrew where the section says so.*

### Firefox, Edge and Opera

Install from your browser's own add-on store, using the links in the project's [README](https://github.com/gorhill/uBlock). It says uBO works best on Firefox. The README also quotes Microsoft's note that Edge is moving to Manifest V3 during 2026, so check it before you choose.

### Chrome and Chromium

The README marks the Chrome Web Store listing as removed, because Google is removing Manifest V2 extensions, and points to **uBlock Origin Lite** as a related, separate extension. It also says Chromium MV2 builds are on [GitHub Releases](https://github.com/gorhill/uBlock/releases), must be installed by hand, and usually won't auto-update. Check what your browser still allows first.

## First steps

- After installing, click the uBO icon in the toolbar. The big power button turns blocking on or off for the current site.
- Open the dashboard to see the filter lists. The defaults include EasyList, EasyPrivacy and a malware list. Untick any list that breaks sites for you.
- If a page looks broken, turn uBO off for that site and reload before changing lists.

Source: uBlock Origin's [README](https://github.com/gorhill/uBlock).
