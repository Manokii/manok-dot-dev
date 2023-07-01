import { InferModel, relations } from "drizzle-orm"
import {
  date,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { portfolios } from "./portfolio"
import { experienceTech } from "./experience-technologies"

export const experiences = mysqlTable("experiences", {
  id: serial("id").primaryKey().notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyWebsite: varchar("company_website", { length: 255 }),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  jobDescription: text("job_description").notNull(),
  startedAt: date("start_date").notNull(),
  endedAt: date("end_date"),
  portfolioId: int("portfolio_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
})

export const experienceRelations = relations(experiences, ({ one, many }) => ({
  portfolio: one(portfolios, {
    fields: [experiences.id],
    references: [portfolios.id],
  }),
  stack: many(experienceTech),
}))

export type Experience = InferModel<typeof experiences>
export type NewExperience = InferModel<typeof experiences, "insert">
