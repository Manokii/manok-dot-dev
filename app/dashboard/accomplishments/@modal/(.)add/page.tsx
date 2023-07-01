import { authOptions } from "@/server/auth-options"
import { getPortfolio } from "@/server/queries"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import AccomplishmentAddDialog from "./_dialog"

export default async function AddAccomplishmentModal() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  const portfolio = await getPortfolio(session.user.id)
  if (!portfolio) {
    redirect("/")
  }
  return <AccomplishmentAddDialog portfolioId={portfolio.id} />
}
