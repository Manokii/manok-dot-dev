import { getPortfolio } from "@/queries"
import { generateSeoImage } from "./_seo_image"

export const runtime = "edge"
export const contentType = "image/png"

export default async function Image() {
  const portfolio = await getPortfolio()
  return await generateSeoImage({
    name: portfolio?.name ?? "Manok.dev",
    url: "Manok.dev",
    headline: portfolio?.headline ?? "A Full-Stack Portfolio Website",
    github: portfolio?.socialLinks?.github ?? "",
    linkedin: portfolio?.socialLinks?.linkedin ?? "",
    twitter: portfolio?.socialLinks?.twitter ?? "",
    website: portfolio?.socialLinks?.website ?? "",
  })
}
