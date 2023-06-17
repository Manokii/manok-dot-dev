import { ProviderType } from "next-auth/providers"
import { int, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core"
import { InferModel } from "drizzle-orm"

// --- Next Auth Table ---
export const accounts = mysqlTable(
  "accounts",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).$type<ProviderType>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
    refresh_token_expires_in: int("refresh_token_expires_in"), // required for GitHub provider
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export type Account = InferModel<typeof accounts>
export type NewAccount = InferModel<typeof accounts, "insert">
