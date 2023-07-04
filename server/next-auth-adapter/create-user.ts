import type { Adapter, AdapterUser } from "next-auth/adapters"
import { db } from "@/db/client"
import { randomUUID } from "node:crypto"
import { portfolios, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createUser: Adapter["createUser"] = async (payload) => {
  return await db.transaction(async (tx) => {
    const id = randomUUID()
    await tx.insert(users).values({ ...payload, id })
    const name = payload.name ?? ""
    const [portfolio] = await tx
      .insert(portfolios)
      .values({
        userId: id,
        name,
        slug: name
          .replaceAll(" ", "-")
          .toLowerCase()
          .concat("-", id.slice(0, 8)),
        about: "",
        headline: "",
        subheading: "",
        socialLinks: {
          github: "",
          linkedin: "",
          twitter: "",
          website: "",
        },
        publicEmail: "",
      })
      .returning()

    const data = await tx.query.users.findFirst({
      where: eq(users.id, id),
    })

    if (!data || !portfolio) {
      tx.rollback()
      throw new Error("Failed to create user")
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      image: data.image,
      role: data.role,
      emailVerified: data.emailVerified,
      portfolioId: portfolio.id,
      portfolioSlug: portfolio.slug,
    } satisfies AdapterUser
  })
}
