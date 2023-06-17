import { db } from "@/db/client"
import { sessions, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const getSessionAndUser: Adapter["getSessionAndUser"] = async (
  sessionToken
) => {
  const data = await db
    .select({
      session: sessions,
      user: users,
    })
    .from(sessions)
    .where(eq(sessions.sessionToken, sessionToken))
    .innerJoin(users, eq(users.id, sessions.userId))
    .then((res) => res.at(0))

  return data ?? null
}
