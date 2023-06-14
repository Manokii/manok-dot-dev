import { relations } from "drizzle-orm"
import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core"
import { experience } from "./experience"
import { users } from "./auth"

export const profiles = mysqlTable("profiles", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  userId: varchar("user_id;", { length: 255 }).notNull(),
})

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  experience: many(experience),
  user: one(users, {
    fields: [profiles.id],
    references: [users.id],
  }),
}))
