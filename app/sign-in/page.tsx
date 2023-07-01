import { authOptions } from "@/server/auth-options"
import { AuthScreen } from "./_auth-screen"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="container p-8 lg:px-0">
      <AuthScreen />
    </div>
  )
}
