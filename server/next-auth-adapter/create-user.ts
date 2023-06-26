import type { Adapter } from "next-auth/adapters"
import { db } from "@/db/client"
import { randomUUID } from "node:crypto"
import { portfolios, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createUser: Adapter["createUser"] = async (payload) => {
  const res = await db.transaction(async (tx) => {
    const id = randomUUID()
    await tx.insert(users).values({ ...payload, id })
    const name = payload.name ?? ""
    await tx.insert(portfolios).values({
      userId: id,
      name,
      slug: name.replaceAll(" ", "-").toLowerCase().concat("-", id.slice(0, 8)),
      about: "",
      headline: "",
      subheading: "",
      socialLinks: {},
      publicEmail: "",
    })
    const data = await tx.query.users.findFirst({ where: eq(users.id, id) })

    if (!data) {
      tx.rollback()
      throw new Error("Failed to create user")
    }

    return data
  })

  return res
}
