import { db } from "@/db/client"
import { experiences, portfolios, projects } from "@/db/schema"
import { desc, eq, or } from "drizzle-orm"
import { cache } from "react"

/* -------------------------------------------------------------------------------------------------
 * Queries
 * -----------------------------------------------------------------------------------------------*/

/*
 * Get a portfolio by id or slug
 */
export const getPortfolio = cache(async (idOrSlug: string) => {
  const portfolio = await db.query.portfolios.findFirst({
    with: {
      user: true,
      experiences: {
        orderBy: desc(experiences.startedAt),
        with: { stack: { with: { tech: true } } },
      },
      projects: {
        orderBy: desc(projects.date),
        with: { stack: { with: { tech: true } } },
      },
    },
    where: or(eq(portfolios.userId, idOrSlug), eq(portfolios.slug, idOrSlug)),
  })
  return portfolio
})

/*
 * Get the first portfolio in the database. This is most likely the owner of the project.
 */
export const getFirstPortfolio = cache(async () => {
  const portfolio = await db.query.portfolios.findFirst({
    with: {
      user: true,
      experiences: {
        orderBy: desc(experiences.startedAt),
        with: { stack: { with: { tech: true } } },
      },
      projects: {
        orderBy: desc(projects.date),
        with: { stack: { with: { tech: true } } },
      },
    },
  })
  return portfolio
})

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

/* -------------------------------------------------------------------------------------------------
 * Preloads
 * -----------------------------------------------------------------------------------------------*/
export function preloadGetPortfolio(idOrSlug: string) {
  void getPortfolio(idOrSlug)
}

export function preloadGetFirstPortfolio(idOrSlug: string) {
  void getPortfolio(idOrSlug)
}

void getPortfolios()
export function preloadPortfolios() {}

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/
export type GetPortfolio = NonNullable<Awaited<ReturnType<typeof getPortfolio>>>
export type GetPortfolios = NonNullable<Awaited<ReturnType<typeof getPortfolios>>>
