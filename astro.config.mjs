import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// The public origin is always the custom domain: canonical links and the
// sitemap must point at https://index.fossadmin.com. CI_PAGES_URL is the
// gitlab.io Pages domain on CI, so it must never feed `site`; it only
// supplies the base path ("/" in practice, a subpath if one is ever needed).
// Without CI_PAGES_URL (local builds) the base falls back to "/".
const pagesUrl = new URL(
  process.env.CI_PAGES_URL || "https://index.fossadmin.com",
);
export default defineConfig({
  site: "https://index.fossadmin.com",
  base: pagesUrl.pathname,
  trailingSlash: "always",
  integrations: [sitemap()],
});
