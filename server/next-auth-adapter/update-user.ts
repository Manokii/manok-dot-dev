import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const updateUser: Adapter["updateUser"] = async (payload) => {
  if (!payload.id) {
    throw new Error("No user id.")
  }

  const res = await db.transaction(async (tx) => {
    await tx.update(users).set(payload).where(eq(users.id, payload.id))

    const data = await tx.query.users.findFirst({
      where: eq(users.id, payload.id),
    })

    if (!data) {
      tx.rollback()
      throw new Error("Failed to update user")
    }

    return data
  })

  return res
}
