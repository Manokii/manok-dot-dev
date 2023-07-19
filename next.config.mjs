import { env } from "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
      },
      {
        protocol: env.NEXT_PUBLIC_URL ? "https" : "http",
        hostname: env.NEXT_PUBLIC_URL || "localhost",
        port: env.NEXT_PUBLIC_URL ? "" : "3000",
      },
    ],
  },
}

export default nextConfig
