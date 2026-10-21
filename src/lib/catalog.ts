import { getCollection } from "astro:content";
import releases from "../data/releases.json";
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
  return { tools, categories };
}
