import { portfolios } from "./portfolio"
import { type InferModel, relations } from "drizzle-orm"
import { projectTech } from "./project-technologies"
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const projects = pgTable("projects", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  body: text("body").notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 2048 }),
  portfolioId: integer("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),
})

export const projectsRelations = relations(projects, ({ one, many }) => ({
  portfolio: one(portfolios, {
    fields: [projects.portfolioId],
    references: [portfolios.id],
  }),
  stack: many(projectTech),
}))

export type Project = InferModel<typeof projects>
export type NewProject = InferModel<typeof projects, "insert">
