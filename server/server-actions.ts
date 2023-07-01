"use server"
import { db } from "@/db/client"
import { and, eq } from "drizzle-orm"
import { getServerActionUser } from "@/server/get-server-action-user"
import { insertExperienceSchema, updatePortfolioSchema } from "@/lib/validators"
import { z } from "zod"
import { experiences, portfolios } from "@/db/schema"

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
 * Upserts an experience
 * @param formData
 */
export async function upsertExperience(
  formData: z.infer<typeof insertExperienceSchema>
) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const data = await insertExperienceSchema.parseAsync(formData)
  const portfolio = await db.query.portfolios.findFirst({
    where: and(
      eq(portfolios.userId, session.user.id),
      eq(portfolios.id, data.portfolioId)
    ),
  })

  if (!portfolio) {
    throw new Error("Portfolio not found")
  }

  await db.insert(experiences).values(data).onDuplicateKeyUpdate({
    set: data,
  })
}

export async function insertTechnologies(technologies: string[]) {}
