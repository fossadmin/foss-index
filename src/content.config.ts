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
        category: z.string().optional(),
        mark: z.string().optional(),
        icon: z.string().optional(),
        iconDark: z.string().optional(),
        repository: z.string().url().optional(),
        license: z.string().optional(),
        funding: funding.optional(),
        screenshot: screenshot.optional(),
        dripsEligible: z.boolean().default(true),
        nixosModule: z.string().optional(),
        managedHosting: z.boolean().default(false),
      })
      .superRefine((data, ctx) => {
        if (data.repository)
          for (const field of ["category", "mark", "license"] as const)
            if (!data[field])
              ctx.addIssue({
                code: "custom",
                path: [field],
                message: `Tool requires ${field}`,
              });
      }),
  }),
};
