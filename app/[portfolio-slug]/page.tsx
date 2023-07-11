import { getPortfolios } from "@/queries"
import { PortfolioPage } from "../_portfolio"
import { getPortfolio } from "@/queries/get-portfolio"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ogUrl } from "@/lib/og-url"
import { sanitizeMarkdown } from "@/lib/sanitize-md"

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
  const description = sanitizeMarkdown(portfolio?.headline) || "A full-stack portfolio website"

  const url = ogUrl({
    headline: portfolio?.name,
    url: "Manok.dev",
    subheadline: portfolio?.headline,
    github: portfolio?.socialLinks?.github,
    linkedin: portfolio?.socialLinks?.linkedin,
    twitter: portfolio?.socialLinks?.twitter,
    website: portfolio?.socialLinks?.website,
  })
  return {
    title,
    description,
    openGraph: {
      images: [url],
      title,
      description,
      url: "https://manok.dev",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      images: [url],
      title,
      description,
      site: "https://manok.dev",
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
