import { db } from "@/db/client"
import { accounts, users } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const getUserByAccount: Adapter["getUserByAccount"] = async (
  payload
) => {
  const dbAccount = await db
    .select()
    .from(accounts)
    .where(
      and(
        eq(accounts.providerAccountId, payload.providerAccountId),
        eq(accounts.provider, payload.provider)
      )
    )
    .leftJoin(users, eq(accounts.userId, users.id))
    .then((res) => res.at(0))

  return dbAccount?.users ?? null
}
