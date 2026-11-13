# Contributing

The FOSS Index is editorial: every listing is reviewed by a person before it
goes in, and we keep it that way.

## Suggest a tool

Use the [Submit page](https://index.fossadmin.com/submit/) on the site. Tell
us what it does and why it belongs. A suggestion is not a listing: we check
the license, the project sources and the install docs first.

## Report a mistake

Open an issue on this repository. Link the listing and the project's own
source that shows the correct fact (release page, license file, docs). A
screenshot of what looks wrong helps.

## Work on the site

The README covers running it locally and how the release and license data is
checked. Keep changes small and reviewable, and do not add tracking, accounts
or third-party scripts: those are deliberate absences, not gaps.

## Adding a listing

Start from `templates/new-listing.md`: it is the annotated skeleton every
listing follows, with the required frontmatter, the section order (Quick
start with method tabs, Docker first and NixOS last, then First steps) and
the checklist for the four data records each listing needs in `src/data/`.

Two guards enforce the contract, and both are wired into `npm run build`,
which fails if either one does:

- `scripts/listing-structure.test.mjs` (runs before the build) fails when a
  listing is missing a frontmatter field, an icon or screenshot file, one of
  the four data records, a required section, or when sections or method tabs
  are out of order.
- `scripts/verify-rendered.mjs` (runs after the build) checks the built
  pages: the release block, platform-support section, decision brief,
  support panel, setup prompts and tag links are present and in the right
  order on all 100 listings, matching their data records.

Run `npm run build` before proposing a listing; a green build means both
guards passed.

## Images and marks

Screenshots and icons come from the project's official material under its
stated terms, or from our own captures of the running software. If a project's
asset terms require permission, we ask first or ship without the image. Do not
add images scraped from search results.
