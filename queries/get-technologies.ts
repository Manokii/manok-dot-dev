import { db } from "@/db/client"
import { technologies } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"

export const preloadTechnologies = () => {
  void getTechnologies()
}

export const getTechnologies = cache(async () => {
  const results = await db.query.technologies.findMany()
  return results
})

export const getTechnologyById = cache(async (id: number) => {
  const result = await db.query.technologies.findFirst({
    where: eq(technologies.id, id),
  })
  return result
})

export type GetTechnologies = NonNullable<
  Awaited<ReturnType<typeof getTechnologies>>
>
