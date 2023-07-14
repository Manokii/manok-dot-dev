import { ReactNode } from "react"
import { AuthMenu } from "@/components/auth-menu"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth-options"
import { redirect } from "next/navigation"
import { preloadPortfolio } from "@/queries"
import DashboardTabs from "./_tabs"

interface Props {
  children: ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/sign-in")
  }

  preloadPortfolio(session.user.id)

  return (
    <div className="container p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="self-end">
          <AuthMenu user={session.user} />
        </div>
        <main className="flex flex-col gap-4">
          <DashboardTabs isAdmin={session.user.role === "admin"} />
          {children}
        </main>
      </div>
    </div>
  )
}
