import { db } from "@/db/client"
import { eq } from "drizzle-orm"
import { cache } from "react"

/* -------------------------------------------------------------------------------------------------
 * Queries
 * -----------------------------------------------------------------------------------------------*/
export const getPostsByAuthorId = cache(async (authorId: number) => {
  return await db.query.posts.findMany({
    where: (posts) => eq(posts.authorId, authorId),
  })
})

export const getPostBySlug = cache(async (slug: string) => {
  return await db.query.posts.findFirst({
    with: {
      author: {
        columns: {
          name: true,
          headline: true,
          slug: true,
        },
      },
    },
    where: (posts) => eq(posts.slug, slug),
  })
})

/* -------------------------------------------------------------------------------------------------
 * Preloads
 * -----------------------------------------------------------------------------------------------*/
export function preloadGetPostsByAuthorId(authorId: number) {
  void getPostsByAuthorId(authorId)
}

export function preloadGetPosxtBySlug(slug: string) {
  void getPostBySlug(slug)
}

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/
export type GetPostsByAuthorId = Awaited<ReturnType<typeof getPostsByAuthorId>>
export type GetPostBySlug = Awaited<ReturnType<typeof getPostBySlug>>
