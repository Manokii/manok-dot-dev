import { cookies } from "next/headers"
import { getSessionAndUser } from "./next-auth-adapter/get-session-and-user"

export async function getServerActionUser() {
  const sessionCookie = cookies().get("next-auth.session-token")
  if (!sessionCookie) return null

  const sessionAndUser = await getSessionAndUser(sessionCookie.value)
  return sessionAndUser
}
