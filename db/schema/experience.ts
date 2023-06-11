import { relations } from "drizzle-orm"
import {
  date,
  int,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core"
import { profiles } from "./profile"

export const experience = mysqlTable("experiences", {
  id: serial("id").primaryKey().notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  startedAt: date("date").notNull(),
  endedAt: date("date"),
  tagsCsv: text("tags_csv"),
  profileId: int("profile_id").notNull(),
})

export const experienceRelations = relations(experience, ({ one }) => ({
  profile: one(profiles, {
    fields: [experience.id],
    references: [profiles.id],
  }),
}))
