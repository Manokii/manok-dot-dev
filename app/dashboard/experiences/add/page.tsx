import { getServerSession } from "next-auth"
import { ExperienceForm } from "../_form"
import { authOptions } from "@/server/auth-options"
import { redirect } from "next/navigation"
import { getPortfolio } from "@/queries"
import { getTechnologies } from "@/queries/get-technologies"

export default async function ExperienceAddPage() {
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
    <div className="flex flex-col">
      <ExperienceForm technologies={technologies} portfolioId={portfolio.id} />
    </div>
  )
}
