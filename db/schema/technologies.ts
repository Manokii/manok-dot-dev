import { InferModel, relations } from "drizzle-orm"
import { projectTech } from "./project-technologies"
import { experienceTech } from "./experience-technologies"
import { pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"

export const technologiesStatus = pgEnum("technologies_status", ["pending", "approved"])
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 2048 }),
  slug: varchar("slug", { length: 255 }).notNull(),
  status: technologiesStatus("status").default("pending").notNull(),
  description: varchar("description", { length: 2048 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  updatedBy: varchar("updated_by", { length: 255 }).notNull(),
})

export const technologiesRelations = relations(technologies, ({ many }) => ({
  projects: many(projectTech),
  experiences: many(experienceTech),
}))

export type Technologies = InferModel<typeof technologies>
export type NewTechnologies = InferModel<typeof technologies, "insert">
