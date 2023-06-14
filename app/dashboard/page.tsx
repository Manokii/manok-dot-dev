import { TypographyH3 } from "@/components/ui/typography"
import { db } from "@/db/client"
import { profiles } from "@/db/schema"
import { authOptions } from "@/server/auth-options"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("No session")
  }

  const profileData = await db.query.profiles.findMany({
    with: {
      user: true,
      experience: true,
    },
    where: eq(profiles.userId, session.user.id),
  })

  return (
    <div className="flex flex-col">
      <TypographyH3>Profiles</TypographyH3>
      <div className="whitespace-pre">
        {JSON.stringify(session.user, null, 4)}
      </div>
      profiles
      <div className="whitespace-pre">
        {JSON.stringify(profileData, null, 4)}
      </div>
    </div>
  )
}
