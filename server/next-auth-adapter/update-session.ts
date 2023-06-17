import { db } from "@/db/client"
import { sessions } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const updateSession: Adapter["updateSession"] = async (payload) => {
  const res = db.transaction(async (tx) => {
    await tx
      .update(sessions)
      .set(payload)
      .where(eq(sessions.sessionToken, payload.sessionToken))

    const data = await tx.query.sessions.findFirst({
      where: eq(sessions.sessionToken, payload.sessionToken),
    })

    if (!data) {
      tx.rollback()
      throw new Error("Failed to update session")
    }
    return data
  })

  return res
}
