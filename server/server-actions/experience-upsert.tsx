"use server"
import {
  insertExperienceSchema,
  type InsertExperienceSchema,
} from "@/lib/validators"
import { getServerActionUser } from "../get-server-action-user"
import { experiences, experienceTech } from "@/db/schema"
import { db } from "@/db/client"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"

export async function upsertExperience(formData: InsertExperienceSchema) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const { stack, ...exp } = await insertExperienceSchema.parseAsync(formData)

  const isSameAsSession = exp.portfolioId === session.user.portfolioId
  const isAdmin = session.user.role === "admin"
  const canUpdate = isSameAsSession || isAdmin

  if (exp.id && !canUpdate) {
    throw new Error("Unauthorized")
  }

  const result = await db.transaction(async (tx) => {
    const [experience] = await tx
      .insert(experiences)
      .values(exp)
      .onConflictDoUpdate({
        target: [experiences.id],
        where: eq(experiences.id, exp.id ?? -1),
        set: {
          portfolioId: exp.portfolioId,
          companyName: exp.companyName,
          companyWebsite: exp.companyWebsite,
          jobTitle: exp.jobTitle,
          startedAt: exp.startedAt,
          endedAt: exp.endedAt,
          jobDescription: exp.jobDescription,
          updatedAt: new Date(),
        },
      })
      .returning()

    const stackInput = stack.map((techId) => ({
      experienceId: experience.id,
      techId: techId,
    }))

    await tx
      .delete(experienceTech)
      .where(eq(experienceTech.experienceId, experience.id))

    if (stack.length) {
      await tx
        .insert(experienceTech)
        .values(stackInput)
        .onConflictDoNothing({
          target: [experienceTech.experienceId, experienceTech.techId],
        })
        .returning()
    }

    return await tx.query.experiences.findFirst({
      where: eq(experiences.id, experience.id),
      with: {
        stack: {
          with: {
            tech: true,
          },
        },
      },
    })
  })

  revalidateTag(`/dashboard/experiences`)
  return result
}
