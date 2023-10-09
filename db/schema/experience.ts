import { type InferModel, relations } from "drizzle-orm";
import { portfolios } from "./portfolio";
import { experienceTech } from "./experience-technologies";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey().notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyWebsite: varchar("company_website", { length: 255 }),
  companyLogo: varchar("company_logo"),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  jobDescription: text("job_description").notNull(),
  startedAt: date("start_date", { mode: "date" }).notNull(),
  endedAt: date("end_date", { mode: "date" }),
  portfolioId: integer("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const experienceRelations = relations(experiences, ({ one, many }) => ({
  portfolio: one(portfolios, {
    fields: [experiences.portfolioId],
    references: [portfolios.id],
  }),
  stack: many(experienceTech),
}));

export type Experience = InferModel<typeof experiences>;
export type NewExperience = InferModel<typeof experiences, "insert">;
