"use server"
import { projects } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { db } from "@/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth-options"

export async function deleteProject(projectId: number) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const result = await db
    .delete(projects)
    .where(and(eq(projects.id, projectId), eq(projects.portfolioId, session.user.portfolioId)))
    .returning()

  revalidateTag(`/dashboard/projects`)
  revalidateTag(`/dashboard/projects/${projectId}/edit`)
  return result
}
