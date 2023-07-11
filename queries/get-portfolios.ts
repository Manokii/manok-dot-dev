import { db } from "@/db/client"
import { cache } from "react"

export const preloadPortfolios = () => {
  void getPortfolios()
}

export const getPortfolios = cache(async () => {
  const portfolioList = await db.query.portfolios.findMany({
    with: {
      user: true,
      experiences: {
        with: {
          stack: {
            with: {
              tech: true,
            },
          },
        },
      },
      projects: true,
    },
  })
  return portfolioList
})

export type GetPortfolios = NonNullable<Awaited<ReturnType<typeof getPortfolios>>>
