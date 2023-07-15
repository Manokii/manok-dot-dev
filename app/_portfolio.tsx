"use client"
import { Markdown, MarkdownNoHeadings } from "@/components/ui/md"
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
  TypographyLarge,
} from "@/components/ui/typography"
import type { GetPortfolioWithRelations } from "@/queries"
import { ExperienceList } from "./_experiences"
import { SocialLinks } from "./_social-links"
import NextLink from "next/link"
import { ProjectList } from "./_projects"

interface PortfolioPageProps {
  portfolio: GetPortfolioWithRelations
}

export function PortfolioPage({ portfolio }: PortfolioPageProps) {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans sm:px-12 sm:py-20 lg:px-24 lg:py-0">
      <div className="min-h-screen lg:flex lg:justify-between lg:gap-8">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:py-24">
          <div className="flex-1">
            <TypographyH1 className="tracking-tight text-foreground">
              <a href="/">{portfolio.name}</a>
            </TypographyH1>
            {portfolio.headline && (
              <TypographyH4 className="mt-3 font-medium tracking-tight text-foreground">
                <MarkdownNoHeadings content={portfolio.headline} />
              </TypographyH4>
            )}
            <Markdown content={portfolio.subheading} />

            <nav className="hidden lg:flex pt-8">
              <ul>
                <li>
                  <NextLink href="#about" scroll={false}>
                    <TypographyLarge className="hover:text-foreground transition-colors">
                      About
                    </TypographyLarge>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#experience" scroll={false}>
                    <TypographyLarge className="hover:text-foreground transition-colors">
                      Experience
                    </TypographyLarge>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#projects" scroll={false}>
                    <TypographyLarge className="hover:text-foreground transition-colors">
                      Projects
                    </TypographyLarge>
                  </NextLink>
                </li>
              </ul>
            </nav>
          </div>
          <SocialLinks {...portfolio.socialLinks} publicEmail={portfolio.publicEmail} />
        </header>
        <main className="pt-8 lg:pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-20" id="about">
          <div className="flex flex-col gap-2 snap-mt-6 scroll-m-8">
            <TypographyH2 className="border-none flex lg:hidden pt-6">About</TypographyH2>
            <Markdown content={portfolio.about ?? ""} />
          </div>
          <ExperienceList experiences={portfolio.experiences} />
          <ProjectList projects={portfolio.projects} />
        </main>
      </div>
    </div>
  )
}
