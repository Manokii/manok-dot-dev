import { PortfolioPage } from "../_portfolio-page"
import { getPortfolio } from "@/queries/get-portfolio"
import { notFound } from "next/navigation"

export const revalidate = 3600

interface Props {
  params: {
    "portofolio-slug": string
  }
}

export default async function PortfolioIndividualPage({
  params: { "portofolio-slug": portofolioSlug = "" },
}: Props) {
  const portfolio = await getPortfolio(portofolioSlug)

  if (!portfolio) {
    notFound()
  }

  return <PortfolioPage portfolio={portfolio} />
}
