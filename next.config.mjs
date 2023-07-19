import { env } from "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["manok.dev", "beta.manok.dev"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
      },
    ],
  },
}

export default nextConfig
