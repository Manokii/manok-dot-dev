import { notFound } from "next/navigation"
import { getPortfolio } from "@/queries"
import { PortfolioPage } from "./_portfolio-page"
import type { Metadata } from "next"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()
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

export default async function AboutPage() {
  const portfolio = await getPortfolio()

  if (!portfolio) {
    notFound()
  }

  return <PortfolioPage portfolio={portfolio} />
}
