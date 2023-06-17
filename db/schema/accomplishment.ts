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
import { accomplishmentTech } from "./accomplishment-technologies"

export const accomplishments = mysqlTable("accomplishments", {
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

export const accomplishmentsRelations = relations(
  accomplishments,
  ({ one, many }) => ({
    portfolio: one(portfolios, {
      fields: [accomplishments.id],
      references: [portfolios.id],
    }),
    stack: many(accomplishmentTech),
  })
)

export type Accomplishment = InferModel<typeof accomplishments>
export type NewAccomplishment = InferModel<typeof accomplishments, "insert">
