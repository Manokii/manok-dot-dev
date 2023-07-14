import { getProjectsByPortfolioId } from "@/queries"
import { authOptions } from "@/server/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import NextLink from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns/esm"
import { Badge } from "@/components/ui/badge"
import { IconCirclePlus } from "@tabler/icons-react"
import { TypographyH3 } from "@/components/ui/typography"

export default async function ProjectsDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const projects = await getProjectsByPortfolioId(session.user.portfolioId)
  if (!projects) {
    redirect("/")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <NextLink key={project.id} href={`/dashboard/projects/${project.id}/edit`}>
          <Card className="min-h-[200px] flex flex-col h-full cursor-pointer hover:border-white/30 border-white/10 transition">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 flex-wrap items-center">
                  {project.stack.map((projectTech, i) => (
                    <Badge variant="secondary" key={i}>
                      {projectTech.tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>{format(project.date, "MMMM yyyy")}</CardFooter>
          </Card>
        </NextLink>
      ))}

      <NextLink href="/dashboard/projects/add">
        <Card className="min-h-[200px] h-full flex items-center justify-center hover:border-white/30 border-white/10 transition">
          <div className="flex items-center gap-2">
            <IconCirclePlus className="w-8 h-8" />
            <TypographyH3 className="inline">Add Project</TypographyH3>
          </div>
        </Card>
      </NextLink>
    </div>
  )
}
