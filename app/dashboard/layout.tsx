import { ReactNode, Suspense } from "react"
import { AuthMenu } from "@/components/auth-menu"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth-options"

interface Props {
  children: ReactNode
  authscreen: ReactNode
}
export default async function DashboardLayout({ children, authscreen }: Props) {
  const session = await getServerSession(authOptions)

  return (
    <div className="container p-8 lg:px-0">
      {session?.user ? (
        <div className="flex flex-col gap-4">
          {session.user && (
            <div className="self-end">
              <AuthMenu user={session.user} />
            </div>
          )}
          {children}
        </div>
      ) : (
        authscreen
      )}
    </div>
  )
}
