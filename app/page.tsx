import { notFound } from "next/navigation"
import { getFirstPortfolio } from "@/queries"
import { PortfolioPage } from "./_portfolio"
import type { Metadata } from "next"
import { ogUrl } from "@/lib/og-url"
import { sanitizeMarkdown } from "@/lib/sanitize-md"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getFirstPortfolio()
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

export default async function AboutPage() {
  const portfolio = await getFirstPortfolio()

  if (!portfolio) {
    notFound()
  }

  return <PortfolioPage portfolio={portfolio} />
}
