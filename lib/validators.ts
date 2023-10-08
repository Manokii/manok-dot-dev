import {
  experiences,
  portfolios,
  posts,
  projects,
  technologies,
} from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const emptyString = z.literal("");
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const prependedUrl = (url: string) =>
  z
    .string()
    .url()
    .startsWith(`https://${url}`)
    .or(z.string().url().startsWith(`https://www.${url}`));

const socialLinksSchema = z.object({
  github: prependedUrl("github.com").or(emptyString).optional(),
  linkedin: prependedUrl("linkedin.com").or(emptyString).optional(),
  twitter: prependedUrl("twitter.com").or(emptyString).optional(),
  website: z.string().url().optional().or(emptyString).optional(),
  publicResume: z.string().url().optional().or(emptyString),
});

export const updatePortfolioSchema = createInsertSchema(portfolios, {
  userId: (schema) => schema.userId.optional(),
  publicEmail: (schema) => schema.publicEmail.email().or(emptyString),
  slug: (schema) => schema.slug.regex(slugRegex),
  headline: (schema) => schema.headline.max(255),
  subheading: (schema) => schema.subheading.max(255),
  name: (schema) => schema.name.max(255),
  socialLinks: socialLinksSchema,
});

export const insertExperienceSchema = createInsertSchema(experiences, {
  companyName: (schema) => schema.companyName.min(3).max(255),
  jobTitle: (schema) => schema.jobTitle.min(3).max(255),
  jobDescription: (schema) => schema.jobDescription.max(2048),
  companyWebsite: (schema) => schema.companyWebsite.url().or(emptyString),
}).extend({
  stack: z.array(z.number().positive()),
});

export const insertTechnologiesSchema = createInsertSchema(technologies, {
  slug: (schema) => schema.slug.min(1).regex(slugRegex),
  name: (schema) => schema.name.min(1).max(255),
  description: (schema) => schema.description.max(2048),
  icon: (schema) => schema.icon.url().or(z.literal("")),
  createdAt: (schema) => schema.createdAt.optional(),
  updatedAt: (schema) => schema.updatedAt.optional(),
  createdBy: (schema) => schema.createdBy.optional(),
  updatedBy: (schema) => schema.updatedBy.optional(),
});

export const insertProjectSchema = createInsertSchema(projects, {
  slug: (schema) => schema.slug.min(1).regex(slugRegex),
  name: (schema) => schema.name.min(1).max(255),
  thumbnail: (schema) => schema.thumbnail.url().or(emptyString),
  body: (schema) => schema.body.max(10000),
}).extend({
  stack: z.array(z.number().positive()),
});

export const insertPostSchema = createInsertSchema(posts, {
  slug: (schema) => schema.slug.min(1).regex(slugRegex),
  title: (schema) => schema.title.min(1).max(255),
  thumbnail: (schema) => schema.thumbnail.url().or(emptyString),
  body: (schema) => schema.body.max(10000),
});

export type UpdatePortfolioSchema = z.infer<typeof updatePortfolioSchema>;
export type InsertTechnologiesSchema = z.infer<typeof insertTechnologiesSchema>;
export type InsertExperienceSchema = z.infer<typeof insertExperienceSchema>;
export type InsertProjectSchema = z.infer<typeof insertProjectSchema>;
export type InsertPostSchema = z.infer<typeof insertPostSchema>;
