import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core"
import { portfolios } from "./portfolio"
import { type InferModel, relations } from "drizzle-orm"
import { projectTech } from "./project-technologies"

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  body: text("body").notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 2048 }),
  portfolioId: varchar("portfolio_id", { length: 255 }).notNull(),
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
