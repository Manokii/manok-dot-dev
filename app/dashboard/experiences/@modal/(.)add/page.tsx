import { getPortfolio } from "@/queries"
import { getTechnologies } from "@/queries/get-technologies"
import { authOptions } from "@/server/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { ExperienceAddModal } from "./_dialog"

export default async function ExperienceAddModalPage() {
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
    <ExperienceAddModal
      portfolioId={portfolio.id}
      technologies={technologies}
    />
  )
}
