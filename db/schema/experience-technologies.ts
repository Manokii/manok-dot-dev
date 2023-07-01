import { InferModel, relations } from "drizzle-orm"
import { int, mysqlTable, primaryKey, timestamp } from "drizzle-orm/mysql-core"
import { technologies } from "./technologies"
import { experiences } from "./experience"

/**
 * This is a join table for "experience" and "technologies" (Many to Many)
 */
export const experienceTech = mysqlTable(
  "experience_technologies",
  {
    experiencetId: int("experience_id").notNull(),
    techId: int("technology_id").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (schema) => ({
    id: primaryKey(schema.experiencetId, schema.techId),
  })
)

export const experienceTechRelations = relations(experienceTech, ({ one }) => ({
  tech: one(technologies, {
    fields: [experienceTech.techId],
    references: [technologies.id],
  }),
  experience: one(experiences, {
    fields: [experienceTech.experiencetId],
    references: [experiences.id],
  }),
}))

export type ExperienceTech = InferModel<typeof experienceTech>
export type NewExperienceTech = InferModel<typeof experienceTech, "insert">
