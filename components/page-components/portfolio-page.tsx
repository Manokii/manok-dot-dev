"use client"
import { Markdown } from "@/components/ui/md"
import { TypographyH1, TypographyH4 } from "@/components/ui/typography"
import { buttonVariants } from "@/components/ui/button"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconWorldWww,
} from "@tabler/icons-react"
import NextLink from "next/link"
import { GetPorfolio } from "@/server/queries"

interface PortfolioPageProps {
  portfolio: GetPorfolio
}

export function PortfolioPage({ portfolio }: PortfolioPageProps) {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="min-h-screen lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:py-24">
          <div className="flex-1">
            <TypographyH1 className="tracking-tight text-foreground">
              <a href="/">{portfolio.name}</a>
            </TypographyH1>
            {portfolio.headline && (
              <TypographyH4 className="mt-3 font-medium tracking-tight text-foreground">
                <Markdown
                  components={{ h1: "p", h2: "p", h3: "p", h4: "p" }}
                  content={portfolio.headline}
                />
              </TypographyH4>
            )}
            <Markdown content={portfolio.subheading} />
            <p className="mb-10 mt-3"></p>
            <nav>
              <ul>
                <li>About</li>
                <li>Experience</li>
                <li>Projects</li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            {portfolio.socialLinks?.github && (
              <div className="flex items-center">
                <NextLink
                  href={portfolio.socialLinks.github}
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <IconBrandGithub />
                </NextLink>
              </div>
            )}
            {portfolio.socialLinks?.linkedin && (
              <div className="flex items-center">
                <NextLink
                  href={portfolio.socialLinks.linkedin}
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <IconBrandLinkedin />
                </NextLink>
              </div>
            )}
            {portfolio.socialLinks?.twitter && (
              <div className="flex items-center">
                <NextLink
                  href={portfolio.socialLinks.twitter}
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <IconBrandTwitter />
                </NextLink>
              </div>
            )}
            {portfolio.socialLinks?.website && (
              <div className="flex items-center">
                <NextLink
                  href={portfolio.socialLinks.website}
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <IconWorldWww />
                </NextLink>
              </div>
            )}
            {portfolio.publicEmail && (
              <div className="flex items-center">
                <NextLink
                  href={`mailto:${portfolio.publicEmail}`}
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <IconMail />
                </NextLink>
              </div>
            )}
          </div>
        </header>
        <main className="pt-24 lg:w-1/2 lg:py-24">
          <Markdown content={portfolio.about ?? ""} />
        </main>
      </div>
    </div>
  )
}
