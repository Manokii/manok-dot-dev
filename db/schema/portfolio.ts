/**
 * All of the columns in this table are publicly visible,
 * that's why it's detached from user table
 */
import { type InferModel, relations } from "drizzle-orm"
import { experiences } from "./experience"
import { users } from "./user"
import { projects } from "./project"
import { jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  headline: text("headline").notNull(),
  subheading: text("subheading").notNull(),
  about: text("about").notNull(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 255 }).notNull(), // TODO: convert to unique column
  publicEmail: varchar("public_email", { length: 255 }),
  socialLinks: jsonb("social_links")
    .$type<{
      github?: string
      linkedin?: string
      twitter?: string
      website?: string
    }>()
    .notNull(),
})

export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  experiences: many(experiences),
  projects: many(projects),
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
}))

export type Portfolio = InferModel<typeof portfolios>
export type NewPortfolio = InferModel<typeof portfolios, "insert">
