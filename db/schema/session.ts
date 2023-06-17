import { InferModel } from "drizzle-orm"
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"

export const sessions = mysqlTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export type Session = InferModel<typeof sessions>
export type NewSession = InferModel<typeof sessions, "insert">
