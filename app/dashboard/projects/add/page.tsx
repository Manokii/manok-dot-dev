import { getServerSession } from "next-auth"
import { ProjectForm } from "../_form"
import { authOptions } from "@/server/auth-options"
import { redirect } from "next/navigation"
import { getPortfolio, getAllTech } from "@/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"

export default async function ExperienceAddPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }

  const technologies = await getAllTech()

  return (
    <div className="flex flex-col gap-4">
      <LinkButton href="/dashboard/projects" className="self-start" variant="secondary">
        <IconArrowLeft className="w-4 h-4 mr-2" />
        Go back to Projects
      </LinkButton>
      <Card>
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm technologies={technologies} portfolioId={portfolio.id} />
        </CardContent>
      </Card>
    </div>
  )
}
