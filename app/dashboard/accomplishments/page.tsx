import { Card } from "@/components/ui/card"
import { TypographyH3 } from "@/components/ui/typography"
import { authOptions } from "@/server/auth-options"
import { getPortfolio } from "@/server/queries"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import NextLink from "next/link"
import { IconCirclePlus } from "@tabler/icons-react"

export default async function AccomplishmentDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <NextLink href="/dashboard/accomplishments/add">
        <Card className="min-h-[200px] flex items-center justify-center">
          <div className="flex items-center gap-2">
            <IconCirclePlus className="w-8 h-8" />
            <TypographyH3 className="inline">Add Accomplishment</TypographyH3>
          </div>
        </Card>
      </NextLink>
    </div>
  )
}
