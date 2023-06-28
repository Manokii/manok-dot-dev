import { db } from "@/db/client"
import { portfolios } from "@/db/schema"
import { eq, or } from "drizzle-orm"

export async function getPortfolio(idOrSlug?: string) {
  const portfolio = await db.query.portfolios.findFirst({
    with: {
      user: true,
      accomplishments: true,
      projects: true,
    },
    ...(idOrSlug
      ? {
          where: or(
            eq(portfolios.userId, idOrSlug),
            eq(portfolios.slug, idOrSlug)
          ),
        }
      : {}), // defaults to the first profile which is highly likely the owner of the website
  })
  return portfolio
}

export type GetPorfolio = NonNullable<Awaited<ReturnType<typeof getPortfolio>>>
