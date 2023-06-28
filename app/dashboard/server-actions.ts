"use server"
import { db } from "@/db/client"
import { eq } from "drizzle-orm"
import { getServerActionUser } from "@/server/get-server-action-user"
import { portfolios } from "@/db/schema/portfolio"
import { updatePortfolioSchema } from "@/lib/validators"
import { z } from "zod"

export async function updatePortfolio(
  formData: z.infer<typeof updatePortfolioSchema>
) {
  const session = await getServerActionUser()
  if (!session?.user) return
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
