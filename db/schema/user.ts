import { InferModel, relations } from "drizzle-orm"
import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { portfolios } from "./portfolio"

// --- Next Auth Table ---
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(), // TODO: convert to unique column
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: varchar("image", { length: 255 }),
  role: mysqlEnum("role", ["admin", "default"]).notNull().default("default"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  portfolioId: varchar("portfolio_id", { length: 255 }),
})

export const usersRelations = relations(users, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [users.portfolioId],
    references: [portfolios.id],
  }),
}))

export type User = InferModel<typeof users>
export type NewUser = InferModel<typeof users, "insert">
