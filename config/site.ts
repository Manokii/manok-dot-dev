import { env } from "@/env.mjs"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: env.NEXT_PUBLIC_NAME,
  description: "A full-stack portfolio",
}
