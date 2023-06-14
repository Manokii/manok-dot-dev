import { authOptions } from "@/server/auth-options"
import AuthScreen from "../@authscreen/page"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return <AuthScreen />
}
