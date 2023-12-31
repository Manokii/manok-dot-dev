import { notFound } from "next/navigation";
import { getFirstPortfolio } from "@/queries";
import { PortfolioPage } from "./_portfolio";
import type { Metadata } from "next";
import { sanitizeMarkdown } from "@/lib/sanitize-md";
import { env } from "@/env.mjs";
import { portfolioOgParams } from "@/lib/og-params";

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getFirstPortfolio();
  const title = `${portfolio?.name || "Portfolio"} — Portfolio`;
  const description =
    sanitizeMarkdown(portfolio?.headline) || "A full-stack portfolio website";

  const url = `${env.NEXT_PUBLIC_URL}/og/portfolio?${portfolioOgParams({
    name: portfolio?.name || "",
    url: env.NEXT_PUBLIC_URL.replace("https://", ""),
    headline: portfolio?.headline || "",
    github: portfolio?.socialLinks?.github || "",
    linkedin: portfolio?.socialLinks?.linkedin || "",
    twitter: portfolio?.socialLinks?.twitter || "",
    website: portfolio?.socialLinks?.website || "",
  })}`;

  return {
    title,
    description,
    openGraph: {
      images: [url],
      title,
      description,
      url: env.NEXT_PUBLIC_URL,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      images: [url],
      title,
      description,
      site: env.NEXT_PUBLIC_URL,
    },
  };
}

export default async function AboutPage() {
  const portfolio = await getFirstPortfolio();

  if (!portfolio) {
    notFound();
  }

  return <PortfolioPage portfolio={portfolio} />;
}
