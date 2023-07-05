import "@/styles/globals.css"

import type { ReactNode } from "react"
import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "relative min-h-screen bg-background font-sans text-gray-300 antialiased",
            fontSans.variable
          )}
          style={{
            backgroundColor: "#000",
            backgroundImage:
              "radial-gradient(circle at 20px 20px, #222 2%, transparent 0%), radial-gradient(circle at 100% 80%, rgba(255,255,255,0.1) 0%, transparent 100%)",
            backgroundSize: "50px 50px, 100% 100%",
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {props.children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
