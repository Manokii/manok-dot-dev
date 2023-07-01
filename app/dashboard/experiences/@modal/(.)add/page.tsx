import { authOptions } from "@/server/auth-options"
import { getPortfolio } from "@/server/queries"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import ExperienceAddDialog from "./_dialog"

export default async function ExperienceAddModal() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }
  return <ExperienceAddDialog portfolioId={portfolio.id} />
}
