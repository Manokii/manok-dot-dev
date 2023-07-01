import { notFound } from "next/navigation"
import { getPortfolio } from "@/server/queries"
import { PortfolioPage } from "./_portfolio-page"

export const revalidate = 3600

export default async function AboutPage() {
  const portfolio = await getPortfolio()

  if (!portfolio) {
    notFound()
  }

  return (
    <div>
      <PortfolioPage portfolio={portfolio} />
    </div>
  )
}
