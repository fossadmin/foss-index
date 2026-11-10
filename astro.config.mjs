import { defineConfig } from "astro/config";
// GitLab supplies its real Pages URL, including a subpath when one is needed.
// Without CI_PAGES_URL (local builds) it falls back to https://index.fossadmin.com.
const pagesUrl = new URL(
  process.env.CI_PAGES_URL || "https://index.fossadmin.com",
);
export default defineConfig({
  site: pagesUrl.origin,
  base: pagesUrl.pathname,
  trailingSlash: "always",
});
