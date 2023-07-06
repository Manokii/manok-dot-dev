"use server"
import {
  updatePortfolioSchema,
  type UpdatePortfolioSchema,
} from "@/lib/validators"
import { getServerActionUser } from "../get-server-action-user"
import { portfolios } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db/client"

export async function updatePortfolio(formData: UpdatePortfolioSchema) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }
  const data = await updatePortfolioSchema.parseAsync(formData)
  const updatedPortfolio = await db
    .update(portfolios)
    .set(data)
    .where(eq(portfolios.userId, session.user.id))
    .returning()

  return updatedPortfolio
}
