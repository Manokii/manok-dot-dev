export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_NAME || "",
  description: "A full-stack portfolio",
}
