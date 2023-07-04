import { PortfolioPage } from "../_portfolio-page"
import { getPortfolio } from "@/queries/get-portfolio"
import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 3600

type Props = {
  params: {
    "portofolio-slug": string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  _: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const portfolio = await getPortfolio()
  const resolvedParent = await parent
  const previousImages = resolvedParent?.openGraph?.images || []

  const title = `${portfolio?.name || "Portfolio"} - Manok.dev`
  const description = portfolio?.headline || "A portfolio website"

  return {
    title,
    description,
    openGraph: {
      images: previousImages,
      title,
      description,
      url: "https://manok.dev",
      type: "profile",
    },
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
