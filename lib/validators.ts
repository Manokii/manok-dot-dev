import { portfolios } from "@/db/schema"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

const socialLinksSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  website: z.string().url().optional(),
})

export const updatePortfolioSchema = createInsertSchema(portfolios, {
  userId: (schema) => schema.userId.optional(),
  publicEmail: (schema) => schema.publicEmail.email(),
  slug: (schema) => schema.slug.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  headline: (schema) => schema.headline.max(255),
  subheading: (schema) => schema.subheading.max(255),
  name: (schema) => schema.name.max(255),
  socialLinks: socialLinksSchema,
})
