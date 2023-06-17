import { db } from "@/db/client"
import { accounts } from "@/db/schema"
import type { Adapter } from "next-auth/adapters"

export const linkAccount: Adapter["linkAccount"] = async (rawAccount) => {
  await db.insert(accounts).values({ ...rawAccount })
}
