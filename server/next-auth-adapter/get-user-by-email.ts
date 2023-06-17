import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const getUserByEmail: Adapter["getUser"] = async (email) => {
  const data = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  return data ?? null
}
