"use server"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth-options"

export async function deleteUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  // Deletes are cascaded
  return await db.delete(users).where(eq(users.id, session.user.id)).returning()
}
