import { db } from "@/db/client"
import { sessions } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const updateSession: Adapter["updateSession"] = async (payload) => {
  const [data] = await db
    .update(sessions)
    .set(payload)
    .where(eq(sessions.sessionToken, payload.sessionToken))
    .returning()

  return data ?? null
}
