import { getPortfolio } from "@/queries"
import { generateSeoImage } from "../_seo_image"

export const runtime = "edge"
export const contentType = "image/png"

interface Props {
  params: { "portfolio-slug": string }
}

export default async function Image({ params }: Props) {
  const portfolio = await getPortfolio(params["portfolio-slug"])
  return await generateSeoImage({
    name: portfolio?.name ?? "Manok.dev",
    url: `Manok.dev/${params["portfolio-slug"]}`,
    headline: portfolio?.headline ?? "A Full-Stack Portfolio Website",
    github: portfolio?.socialLinks?.github ?? "",
    linkedin: portfolio?.socialLinks?.linkedin ?? "",
    twitter: portfolio?.socialLinks?.twitter ?? "",
    website: portfolio?.socialLinks?.website ?? "",
  })
}
