import { PortfolioPage } from "../_portfolio-page"
import { getPortfolio } from "@/server/queries/get-portfolio"
import { notFound } from "next/navigation"

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
