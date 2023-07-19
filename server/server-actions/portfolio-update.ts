"use server"
import { updatePortfolioSchema, type UpdatePortfolioSchema } from "@/lib/validators"
import { portfolios } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth-options"
import { revalidateTag } from "next/cache"

export async function updatePortfolio(formData: UpdatePortfolioSchema) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }
  const data = await updatePortfolioSchema.parseAsync(formData)
  const updatedPortfolio = await db
    .update(portfolios)
    .set(data)
    .where(eq(portfolios.userId, session.user.id))
    .returning()

  revalidateTag(`/${session.user.portfolioSlug}`)
  return updatedPortfolio
}
