"use server"
import { db } from "@/db/client"
import { getServerActionUser } from "../get-server-action-user"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteUser() {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  // Deletes are cascaded
  return await db.delete(users).where(eq(users.id, session.user.id)).returning()
}
