import { getServerSession } from "next-auth"
import { ExperienceForm } from "../../_form"
import { authOptions } from "@/server/auth-options"
import { notFound, redirect } from "next/navigation"
import { getExperience, getPortfolio } from "@/queries"
import { getTechnologies } from "@/queries/get-technologies"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"
import ExperienceEditDangerZone from "./_danger_zone"

interface Props {
  params: {
    id: string
  }
}

export default async function ExperienceAddPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }

  const techPromise = getTechnologies()
  const experiencePromise = getExperience(parseInt(id))

  const [technologies, experience] = await Promise.all([
    techPromise,
    experiencePromise,
  ])

  if (experience?.portfolioId !== portfolio.id || !experience) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4 justify-between">
        <LinkButton variant="secondary" href="/dashboard/experiences">
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Go back to Experiences
        </LinkButton>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            experience={experience}
            technologies={technologies}
            portfolioId={portfolio.id}
          />
        </CardContent>
      </Card>
      <ExperienceEditDangerZone experienceId={experience.id} />
    </div>
  )
}
