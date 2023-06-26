import { TypographyH3 } from "@/components/ui/typography"
import { authOptions } from "@/server/auth-options"
import { getPortfolio } from "@/server/queries/get-portfolio"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import { PortfolioForm } from "./portfolio-form"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <TypographyH3>Portfolio</TypographyH3>
      </div>

      <PortfolioForm portfolio={portfolio} />
    </div>
  )
}
