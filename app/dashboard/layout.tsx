"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { SessionProvider, signOut, useSession } from "next-auth/react"
import { ReactNode } from "react"
import Loading from "./loading"

interface Props {
  children: ReactNode
  authscreen: ReactNode
}
export default function DashboardLayout(props: Props) {
  return (
    <SessionProvider>
      <Layout {...props} />
    </SessionProvider>
  )
}

function Layout({ children, authscreen }: Props) {
  const { status, data: session } = useSession()
  return (
    <div className="container p-8 lg:px-0">
      {status === "loading" ? (
        <Loading />
      ) : status === "unauthenticated" ? (
        authscreen
      ) : (
        <div className="flex flex-col gap-4">
          {session?.user && (
            <div className="self-end">
              <Button
                className={buttonVariants({ variant: "ghost", size: "sm" })}
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}
