import { getServerSession } from "next-auth"
import { ProjectForm } from "../../_form"
import { authOptions } from "@/server/auth-options"
import { notFound, redirect } from "next/navigation"
import { getPortfolio, getProjectById } from "@/queries"
import { getTechnologies } from "@/queries/get-technologies"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"
import ProjectEditDangerZone from "./_danger_zone"

interface Props {
  params: {
    id: string
  }
}

export default async function ProjectEditPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const techPromise = getTechnologies()
  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }

  const projectPromise = getProjectById(parseInt(id))

  const [technologies, project] = await Promise.all([
    techPromise,
    projectPromise,
  ])

  if (project?.portfolioId !== portfolio.id || !project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4 justify-between">
        <LinkButton variant="secondary" href="/dashboard/projects">
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Go back to Projects
        </LinkButton>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm
            project={project}
            technologies={technologies}
            portfolioId={portfolio.id}
          />
        </CardContent>
      </Card>
      <ProjectEditDangerZone projectId={project.id} />
    </div>
  )
}
