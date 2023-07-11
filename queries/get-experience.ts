import { db } from "@/db/client"
import { experiences } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"

export const preloadExperience = (id: number) => {
  void getExperience(id)
}

export const getExperience = cache(async (id: number) => {
  const portfolio = await db.query.experiences.findFirst({
    with: {
      stack: {
        with: {
          tech: true,
        },
      },
    },
    where: eq(experiences.id, id),
  })
  return portfolio
})

export type GetExperience = NonNullable<Awaited<ReturnType<typeof getExperience>>>
