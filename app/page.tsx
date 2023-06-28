import { notFound } from "next/navigation"
import { getPortfolio } from "@/server/queries"
import { PortfolioPage } from "@/components/page-components/portfolio-page"

export const revalidate = 3600

export default async function AboutPage() {
  const portfolio = await getPortfolio()

  if (!portfolio) {
    notFound()
  }

  return <PortfolioPage portfolio={portfolio} />
}
