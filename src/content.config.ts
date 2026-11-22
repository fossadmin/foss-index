import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
const funding = z.object({
  githubSponsors: z.string().url().optional(),
  openCollective: z.string().url().optional(),
  polar: z.string().url().optional(),
  liberapay: z.string().url().optional(),
  custom: z
    .array(z.object({ label: z.string(), url: z.string().url() }))
    .optional(),
});
const screenshot = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: z.string(),
  sourceUrl: z.string().url().optional(),
  license: z.string().optional(),
  own: z.boolean().optional(),
  terminal: z.boolean().optional(),
  commons: z.boolean().optional(),
  captionNote: z.string().optional(),
  version: z.string().optional(),
});
export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
    schema: z
      .object({
        title: z.string(),
        description: z.string(),
        // When the listing was added to the Index (not a software release date).
        added: z.coerce.date().optional(),
        category: z.string().optional(),
        tags: z.array(z.string().trim().min(1)).default([]),
        mark: z.string().optional(),
        icon: z.string().optional(),
        iconDark: z.string().optional(),
        iconLink: z.string().url().optional(),
        iconTile: z.boolean().optional(),
        repository: z.string().url().optional(),
        license: z.string().optional(),
        funding: funding.optional(),
        screenshot: screenshot.optional(),
        dripsEligible: z.boolean().default(true),
        nixosModule: z.string().optional(),
        // Guides on our own FOSSadmin blog relevant to this tool.
        guides: z
          .array(z.object({ label: z.string(), url: z.string().url() }))
          .optional(),
        managedHosting: z.boolean().default(false),
      })
      .superRefine((data, ctx) => {
        if (data.repository)
          for (const field of ["category", "license"] as const)
            if (!data[field])
              ctx.addIssue({
                code: "custom",
                path: [field],
                message: `Tool requires ${field}`,
              });
      }),
  }),
};
