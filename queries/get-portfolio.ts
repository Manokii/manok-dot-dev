import { db } from "@/db/client"
import { portfolios } from "@/db/schema"
import { eq, or } from "drizzle-orm"
import { cache } from "react"

export const preloadPortfolio = (idOrSlug?: string) => {
  void getPortfolio(idOrSlug)
}

export const getPortfolio = cache(async (idOrSlug?: string) => {
  // defaults to the first profile if idOrSlug is empty
  // which is highly likely the owner of the website
  const portfolio = await db.query.portfolios.findFirst({
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
    ...(idOrSlug
      ? {
          where: or(
            eq(portfolios.userId, idOrSlug),
            eq(portfolios.slug, idOrSlug)
          ),
        }
      : {}),
  })
  return portfolio
})

export type GetPortfolio = NonNullable<Awaited<ReturnType<typeof getPortfolio>>>
