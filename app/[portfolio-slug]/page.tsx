import { getPortfolios } from "@/queries"
import { PortfolioPage } from "../_portfolio-page"
import { getPortfolio } from "@/queries/get-portfolio"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 3600

type Props = {
  params: {
    "portfolio-slug": string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const portfolios = await getPortfolios()

  return portfolios.map((portfolio) => {
    return {
      "portfolio-slug": portfolio.slug,
    }
  })
}

export async function generateMetadata({
  params: { "portfolio-slug": portfolioSlug = "" },
}: Props): Promise<Metadata> {
  const portfolio = await getPortfolio(portfolioSlug)
  const title = `${portfolio?.name || "Portfolio"} — Portfolio`
  const description = portfolio?.headline || "A portfolio website"

  return {
    title,
    description,
    openGraph: {
      images: [],
      title,
      description,
      url: "https://manok.dev",
      type: "profile",
    },
  }
}

export default async function PortfolioIndividualPage({
  params: { "portfolio-slug": portofolioSlug = "" },
}: Props) {
  const portfolio = await getPortfolio(portofolioSlug)

  if (!portfolio) {
    notFound()
  }

  return <PortfolioPage portfolio={portfolio} />
}
