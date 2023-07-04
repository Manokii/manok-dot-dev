import { db } from "@/db/client"
import { portfolios, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Adapter } from "next-auth/adapters"

export const updateUser: Adapter["updateUser"] = async (payload) => {
  if (!payload.id) {
    throw new Error("No user id.")
  }

  const data = await db
    .update(users)
    .set(payload)
    .where(eq(users.id, payload.id))
    .returning({
      user: users,
      portfolio: portfolios,
    })
    .then((data) => data.at(0))

  if (!data || !data.user || !data.portfolio) {
    throw new Error("unable to update user")
  }

  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    role: data.user.role,
    emailVerified: data.user.emailVerified,
    portfolioId: data.portfolio.id,
    portfolioSlug: data.portfolio.slug,
  }
}
