import { getCollection } from "astro:content";
import releases from "../data/releases.json";
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const browseDefinitions = [
  { name: "Work & organize", categories: ["Finance", "Productivity", "Notes", "Documents", "Bookmarks", "Calendar & Contacts", "Utilities"] },
  { name: "Files & sharing", categories: ["Collaboration", "File Sync"] },
  { name: "Media & photos", categories: ["Media", "Photos"] },
  { name: "Home", categories: ["Home", "Home automation"] },
  { name: "Privacy & access", categories: ["Passwords", "Networking"] },
  { name: "Servers & monitoring", categories: ["Infrastructure", "Dashboard", "Monitoring", "Notifications", "Analytics"] },
];
export function browseSlugForCategory(category: string) {
  const group = browseDefinitions.find((g) => g.categories.includes(category));
  if (!group) throw new Error(`No browse group for category: ${category}`);
  return slugify(group.name);
}
export async function catalog() {
  const entries = await getCollection("docs", ({ data }) => !!data.repository);
  const tools = entries
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) => {
      const repo = entry.data.repository!.split("github.com/")[1];
      const release = (
        releases as Record<
          string,
          {
            version?: string;
            date?: string;
            url?: string;
            changelog?: string;
            license?: string;
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
