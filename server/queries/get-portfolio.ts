import { db } from "@/db/client"
import { portfolios } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getPortfolio(id: string) {
  const portfolio = await db.query.portfolios.findFirst({
    with: {
      user: true,
      accomplishments: true,
      projects: true,
    },
    where: eq(portfolios.userId, id),
  })
  return portfolio
}

export type GetPorfolio = Awaited<ReturnType<typeof getPortfolio>>
