"use server"
import { db } from "@/db/client"
import { and, eq } from "drizzle-orm"
import { getServerActionUser } from "@/server/get-server-action-user"
import {
  InsertTechnologiesSchema,
  insertExperienceSchema,
  insertTechnologiesSchema,
  updatePortfolioSchema,
} from "@/lib/validators"
import { z } from "zod"
import {
  experienceTech,
  experiences,
  portfolios,
  technologies,
} from "@/db/schema"
import { revalidateTag } from "next/cache"

/**
 * Updates a portfolio
 * @param formData
 */
export async function updatePortfolio(
  formData: z.infer<typeof updatePortfolioSchema>
) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }
  const data = await updatePortfolioSchema.parseAsync(formData)
  const updatedPortfolio = await db
    .update(portfolios)
    .set(data)
    .where(eq(portfolios.userId, session.user.id))
    .returning()
  return updatedPortfolio
}

/**
 * Upserts an experience
 * @param formData
 */
export async function upsertExperience(
  formData: z.infer<typeof insertExperienceSchema>
) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const { stack, ...exp } = await insertExperienceSchema.parseAsync(formData)

  if (exp.id && exp.portfolioId !== session.user.portfolioId) {
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

/**
 *
 */
export async function insertTechnology(formData: InsertTechnologiesSchema) {
  const session = await getServerActionUser()
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }
  const { id: _, ...data } = await insertTechnologiesSchema.parseAsync(formData)

  return await db.transaction(async (tx) => {
    const exists = await tx.query.technologies.findFirst({
      where: eq(technologies.slug, data.slug),
    })

    if (exists) {
      return exists
    }

    const tech = await tx
      .insert(technologies)
      .values([
        {
          ...data,
          createdBy: session.user.id,
          updatedBy: session.user.id,
          updatedAt: new Date(),
          status: session.user.role === "admin" ? "approved" : "pending",
        },
      ])
      .returning()
      .then((res) => res.at(0))

    if (!tech) {
      throw new Error("Unable to create technology")
    }

    return tech
  })
}

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

export type InsertTechnology = Awaited<ReturnType<typeof insertTechnology>>
