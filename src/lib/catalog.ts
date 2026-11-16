import { getCollection } from "astro:content";
import releases from "../data/releases.json";
import platformSupport from "../data/platform-support.json";
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
import { browseDefinitions, broadCategory, tagsFor } from "./taxonomy.mjs";
export function browseSlugForCategory(category: string) {
  const group = browseDefinitions.find((g) => g.categories.includes(category));
  if (!group) throw new Error(`No browse group for category: ${category}`);
  return slugify(group.name);
}
// Per-name wording overrides for the "Explore ..." lede where the
// interpolated group or category name reads awkwardly.
export const exploreLede: Record<string, string> = {
  "Operating systems": "Explore open-source operating systems.",
  "NixOS module": "Explore open-source software that ships a NixOS module for declarative setup.",
  DNS: "Explore open-source DNS servers and network-wide filtering.",
  VPN: "Explore open-source VPN and private-networking tools.",
  Video: "Explore open-source video players, editors, transcoders and streaming tools.",
  Audio: "Explore open-source audio editors, players and servers.",
  Database: "Explore open-source database servers and clients.",
  "Plain text accounting": "Explore open-source plain-text accounting tools.",
  "3D printing": "Explore open-source 3D printing software.",
  "Penetration testing": "Explore open-source penetration-testing and security-auditing distributions.",
  Android: "Explore open-source Android-based operating systems.",
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
        tags: tagsFor(entry.data),
        broadCategory: broadCategory(entry.data.category!),
        platformRecord: (platformSupport as Record<string, {checkedOn:string; note:string; details?:string; platforms?:{name:string; kind:string; url:string}[]; server?:{label:string; platforms:{name:string; kind:string; url:string}[]}; clients?:{name:string; kind:string; url:string}[]; selfHost?:{label:string; url:string}}>)[entry.id],
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
  const tags = [...new Set(tools.flatMap(tool => tool.tags))].sort().map(name => ({ name, slug: slugify(name), count: tools.filter(tool => tool.tags.includes(name)).length }));
  const toolPlatforms = (tool: (typeof tools)[number]) => [...(tool.platformRecord?.platforms ?? []), ...(tool.platformRecord?.server?.platforms ?? []), ...(tool.platformRecord?.clients ?? [])];
  const platforms = [...new Set(tools.flatMap(tool => toolPlatforms(tool).map(row => row.name)))].sort().map(name => ({ name, slug: slugify(name), count: tools.filter(tool => toolPlatforms(tool).some(row => row.name === name)).length }));
  return { tools, categories, groups, tags, platforms };
}
