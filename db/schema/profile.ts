import { relations } from "drizzle-orm"
import { mysqlTable, serial, text } from "drizzle-orm/mysql-core"
import { experience } from "./experience"

export const profiles = mysqlTable("profiles", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
})

export const profilesRelations = relations(profiles, ({ many }) => ({
  experience: many(experience),
}))
