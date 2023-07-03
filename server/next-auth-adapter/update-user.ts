import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const updateUser: Adapter["updateUser"] = async (payload) => {
  if (!payload.id) {
    throw new Error("No user id.")
  }

  const [data] = await db
    .update(users)
    .set(payload)
    .where(eq(users.id, payload.id))
    .returning()

  return data
}
