import { getPortfolioWithRelations, getPortfolios } from "@/queries"
import { PortfolioPage } from "../_portfolio"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { sanitizeMarkdown } from "@/lib/sanitize-md"
import { env } from "@/env.mjs"

export const revalidate = 300

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
  const portfolio = await getPortfolioWithRelations(portfolioSlug)
  const title = `${portfolio?.name || "Portfolio"} — Portfolio`
  const description = sanitizeMarkdown(portfolio?.headline) || "A full-stack portfolio website"

  const url = `${env.NEXT_PUBLIC_URL}/og/profile/${new URLSearchParams({
    headline: portfolio?.name || "",
    url: env.NEXT_PUBLIC_URL.replace("https://", ""),
    subheadline: portfolio?.headline || "",
    github: portfolio?.socialLinks?.github || "",
    linkedin: portfolio?.socialLinks?.linkedin || "",
    twitter: portfolio?.socialLinks?.twitter || "",
    website: portfolio?.socialLinks?.website || "",
  })}`

  return {
    title,
    description,
    openGraph: {
      images: [url],
      title,
      description,
      url: env.NEXT_PUBLIC_URL,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      images: [url],
      title,
      description,
      site: env.NEXT_PUBLIC_URL,
    },
  }
}

export default async function PortfolioIndividualPage({
  params: { "portfolio-slug": portofolioSlug = "" },
}: Props) {
  const portfolio = await getPortfolioWithRelations(portofolioSlug)

  if (!portfolio) {
    notFound()
  }

  return <PortfolioPage portfolio={portfolio} />
}
