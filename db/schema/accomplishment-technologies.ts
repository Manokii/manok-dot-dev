import { InferModel, relations } from "drizzle-orm"
import { int, mysqlTable, primaryKey, timestamp } from "drizzle-orm/mysql-core"
import { technologies } from "./technologies"
import { accomplishments } from "./accomplishment"

/**
 * This is a join table for "accomplishments" and "technologies" (Many to Many)
 */
export const accomplishmentTech = mysqlTable(
  "accomplishment_technologies",
  {
    accomplishmentId: int("accomplishment_id").notNull(),
    techId: int("technology_id").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (schema) => ({
    id: primaryKey(schema.accomplishmentId, schema.techId),
  })
)

export const accomplishmentTechRelations = relations(
  accomplishmentTech,
  ({ one }) => ({
    tech: one(technologies, {
      fields: [accomplishmentTech.techId],
      references: [technologies.id],
    }),
    accomplishment: one(accomplishments, {
      fields: [accomplishmentTech.accomplishmentId],
      references: [accomplishments.id],
    }),
  })
)

export type AccomplishmentTech = InferModel<typeof accomplishmentTech>
export type NewAccomplishmentTech = InferModel<
  typeof accomplishmentTech,
  "insert"
>
