"use server"
import { experiences } from "@/db/schema"
import { getServerActionUser } from "../get-server-action-user"
import { and, eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { db } from "@/db/client"

export async function deleteExperience(experienceId: number) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const result = await db
    .delete(experiences)
    .where(
      and(
        eq(experiences.id, experienceId),
        eq(experiences.portfolioId, session.user.portfolioId)
      )
    )
    .returning()

  revalidateTag(`/dashboard/experiences`)
  revalidateTag(`/dashboard/experiences/${experienceId}/edit`)
  return result
}
