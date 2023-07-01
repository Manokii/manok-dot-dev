"use server"
import { db } from "@/db/client"
import { and, eq } from "drizzle-orm"
import { getServerActionUser } from "@/server/get-server-action-user"
import {
  insertAccomplishmentSchema,
  updatePortfolioSchema,
} from "@/lib/validators"
import { z } from "zod"
import { accomplishments, portfolios } from "@/db/schema"

/**
 * Updates a portfolio
 * @param formData
 */
export async function updatePortfolio(
  formData: z.infer<typeof updatePortfolioSchema>
) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }
  const data = await updatePortfolioSchema.parseAsync(formData)
  await db
    .update(portfolios)
    .set(data)
    .where(eq(portfolios.userId, session.user.id))
  const updatedPortfolio = await db.query.portfolios.findFirst({
    where: eq(portfolios.userId, session.user.id),
  })
  return updatedPortfolio
}

/**
 * Upserts an accomplishment
 * @param formData
 */
export async function upsertAccomplishment(
  formData: z.infer<typeof insertAccomplishmentSchema>
) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const data = await insertAccomplishmentSchema.parseAsync(formData)
  const portfolio = await db.query.portfolios.findFirst({
    where: and(
      eq(portfolios.userId, session.user.id),
      eq(portfolios.id, data.portfolioId)
    ),
  })

  if (!portfolio) {
    throw new Error("Portfolio not found")
  }

  await db.insert(accomplishments).values(data).onDuplicateKeyUpdate({
    set: data,
  })
}
