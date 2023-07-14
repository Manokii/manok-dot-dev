import { db } from "@/db/client"
import { projects } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"

export const preloadProjects = () => {
  void getProjects()
}

export const getProjects = cache(async () => {
  const results = await db.query.projects.findMany()
  return results.reduce<Record<number, (typeof results)[number]>>((acc, curr) => {
    Object.assign(acc, { [curr.id]: curr })
    return acc
  }, {})
})

export const getProjectById = cache(async (id: number) => {
  const result = await db.query.projects.findFirst({
    with: {
      stack: {
        with: {
          tech: true,
        },
      },
    },
    where: eq(projects.id, id),
  })
  return result
})

export type GetProjects = NonNullable<Awaited<ReturnType<typeof getProjects>>>
export type GetProject = NonNullable<Awaited<ReturnType<typeof getProjectById>>>
