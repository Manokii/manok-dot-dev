import { generateSeoImage } from "@/app/_seo_image"
import { type NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl)
  return await generateSeoImage({
    name: searchParams.get("name") ?? "Jasper Concepcion",
    url: searchParams.get("url") ?? "Manok.dev",
    headline:
      searchParams.get("headline") ?? "Sr. Software Engineer at AcadArena",
    github: searchParams.get("github") ?? "manok-dot-dev",
    linkedin: searchParams.get("linkedin") ?? "manok-dot-dev",
    twitter: searchParams.get("twitter") ?? "manok-dot-dev",
    website: searchParams.get("website") ?? "manok-dot-dev",
  })
}
