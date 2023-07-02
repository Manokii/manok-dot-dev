import { authOptions } from "@/server/auth-options"
import { getPortfolio } from "@/queries"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import ExperienceAddDialog from "./_dialog"
import { getTechnologies } from "@/queries/get-technologies"

export default async function ExperienceAddModal() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }

  const technologies = await getTechnologies()

  return (
    <ExperienceAddDialog
      portfolioId={portfolio.id}
      technologies={technologies}
    />
  )
}
