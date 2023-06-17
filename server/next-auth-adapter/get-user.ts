import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const getUser: Adapter["getUser"] = async (userId) => {
  const data = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })
  return data ?? null
}
