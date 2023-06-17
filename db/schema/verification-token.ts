import { InferModel } from "drizzle-orm"
import {
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

// --- Next Auth Table ---
export const verificationTokens = mysqlTable(
  "verificationTokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(), // TODO: convert to unique column
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export type VerificationToken = InferModel<typeof verificationTokens>
export type NewVerificationToken = InferModel<
  typeof verificationTokens,
  "insert"
>
