import { TypographyH3 } from "@/components/ui/typography"
import { db } from "@/db/client"
import { portfolios } from "@/db/schema/portfolio"
import { authOptions } from "@/server/auth-options"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await db.query.portfolios.findFirst({
    with: {
      user: true,
      accomplishments: true,
    },
    where:
      session.user.role === "admin"
        ? undefined
        : eq(portfolios.userId, session.user.id),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <TypographyH3>Portfolio</TypographyH3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="whitespace-pre-wrap">{JSON.stringify(portfolio)}</div>
      </div>
    </div>
  )
}
