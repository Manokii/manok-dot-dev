import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { TypographyH3 } from "@/components/ui/typography"
import { db } from "@/db/client"
import { profiles } from "@/db/schema"
import { authOptions } from "@/server/auth-options"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/dashboard/sign-in")
  }

  const profileData = await db.query.profiles.findMany({
    with: {
      user: true,
      experience: true,
    },
    where:
      session.user.role === "admin"
        ? undefined
        : eq(profiles.userId, session.user.id),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <TypographyH3>Portfolios</TypographyH3>
        <Button size="sm" variant="outline">
          Create
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profileData.map((profile) => (
          <Link href={`/dashboard/portfolios/${profile.id}/edit`}>
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle>
                  {profile.firstName} {profile.lastName[0] ?? ""}.
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
