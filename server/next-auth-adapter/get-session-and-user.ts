import { db } from "@/db/client"
import { portfolios, sessions, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters"

export const getSessionAndUser: Adapter["getSessionAndUser"] = async (
  sessionToken
) => {
  const [data] = await db
    .select({
      session: sessions,
      user: users,
      portfolio: portfolios,
    })
    .from(sessions)
    .where(eq(sessions.sessionToken, sessionToken))
    .innerJoin(users, eq(users.id, sessions.userId))
    .innerJoin(portfolios, eq(portfolios.userId, sessions.userId))

  console.log({ data })
  const session: { session: AdapterSession; user: AdapterUser } = {
    session: data.session,
    user: {
      ...data.user,
      portfolioId: data.portfolio.id,
      portfolioSlug: data.portfolio.slug,
    },
  }

  return session ?? null
}
