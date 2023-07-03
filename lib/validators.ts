import { experiences, portfolios, technologies } from "@/db/schema"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

const emptyString = z.literal("")
const prependedUrl = (url: string) =>
  z
    .string()
    .url()
    .startsWith(`https://${url}`)
    .or(z.string().url().startsWith(`https://www.${url}`))

const socialLinksSchema = z.object({
  github: prependedUrl("github.com").or(emptyString).optional(),
  linkedin: prependedUrl("linkedin.com").or(emptyString).optional(),
  twitter: prependedUrl("twitter.com").or(emptyString).optional(),
  website: z.string().url().optional().or(emptyString).optional(),
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

export const insertTechnologiesSchema = createInsertSchema(technologies, {
  name: (schema) => schema.name.max(255),
  description: (schema) => schema.description.max(2048),
  icon: (schema) => schema.icon.url().or(z.literal("")),
  createdAt: (schema) => schema.createdAt.optional(),
})

export const insertExperienceSchema = createInsertSchema(experiences, {
  portfolioId: (schema) => schema.portfolioId.positive(),
  companyWebsite: (schema) => schema.companyWebsite.url().or(z.literal("")),
  createdAt: (schema) => schema.createdAt.optional(),
}).extend({
  stack: z.array(insertTechnologiesSchema),
})
