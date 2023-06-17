import { InferModel, relations } from "drizzle-orm"
import { int, mysqlTable, primaryKey, timestamp } from "drizzle-orm/mysql-core"
import { technologies } from "./technologies"
import { projects } from "./project"

export const projectTech = mysqlTable(
  "project_technologies",
  {
    projectId: int("project_id").notNull(),
    techId: int("technology_id").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (schema) => ({
    id: primaryKey(schema.projectId, schema.techId),
  })
)

export const projectTechRelations = relations(projectTech, ({ one }) => ({
  tech: one(technologies, {
    fields: [projectTech.techId],
    references: [technologies.id],
  }),
  project: one(projects, {
    fields: [projectTech.projectId],
    references: [projects.id],
  }),
}))

export type ProjectTech = InferModel<typeof projectTech>
export type NewProjectTech = InferModel<typeof projectTech, "insert">
