import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core"
import { InferModel, relations } from "drizzle-orm"
import { projectTech } from "./project-technologies"
import { accomplishmentTech } from "./accomplishment-technologies"

export const technologies = mysqlTable("technologies", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 2048 }),
  description: varchar("description", { length: 2048 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
})

export const technologiesRelations = relations(technologies, ({ many }) => ({
  projects: many(projectTech),
  accomplishments: many(accomplishmentTech),
}))

export type Technologies = InferModel<typeof technologies>
export type NewTechnologies = InferModel<typeof technologies, "insert">
