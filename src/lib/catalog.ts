import { getCollection } from "astro:content";
import releases from "../data/releases.json";
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const browseDefinitions = [
  { name: "Operating systems", categories: ["Operating systems"] },
  { name: "Home & auto", categories: ["Home", "Home automation"] },
  { name: "Media & photos", categories: ["Media", "Photos", "Creative"] },
  { name: "Work & organize", categories: ["Finance", "Productivity", "Notes", "Documents", "Bookmarks", "Calendar & Contacts", "Utilities", "Reading"] },
  { name: "Files & sharing", categories: ["Collaboration", "File Sync", "Backup"] },
  { name: "Privacy & access", categories: ["Passwords", "Networking", "Security", "Communication"] },
  { name: "Servers & monitoring", categories: ["Infrastructure", "Dashboard", "Monitoring", "Notifications", "Analytics", "Development"] },
];
export function browseSlugForCategory(category: string) {
  const group = browseDefinitions.find((g) => g.categories.includes(category));
  if (!group) throw new Error(`No browse group for category: ${category}`);
  return slugify(group.name);
}
// Per-name wording overrides for the "Explore ..." lede where the
// interpolated group or category name reads awkwardly.
export const exploreLede: Record<string, string> = {
  "Operating systems": "Explore open-source operating systems.",
};
export async function catalog() {
  const entries = await getCollection("docs", ({ data }) => !!data.repository);
  const tools = entries
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) => {
      const repo = entry.data.repository!.replace(/^https?:\/\//, "").replace(/^github\.com\//, "");
      const release = (
        releases as Record<
          string,
          {
            version?: string;
            date?: string;
            url?: string;
            changelog?: string;
            license?: string;
            manual?: boolean;
            checkedOn?: string;
          }
        >
      )[repo];
      return {
        ...entry,
        href: `${import.meta.env.BASE_URL}${entry.id}/`,
        release,
        license: release?.license ?? entry.data.license,
      };
    });
  const categories = [...new Set(tools.map((t) => t.data.category!))]
    .sort()
    .map((name) => ({
      name,
      slug: slugify(name),
      count: tools.filter((t) => t.data.category === name).length,
    }));
  const groups = browseDefinitions.map((group) => ({
    name: group.name,
    slug: slugify(group.name),
    categories: group.categories,
    count: tools.filter((tool) => group.categories.includes(tool.data.category!)).length,
  }));
  // New categories need a deliberate placement instead of disappearing from Browse.
  tools.forEach((tool) => browseSlugForCategory(tool.data.category!));
  return { tools, categories, groups };
}
