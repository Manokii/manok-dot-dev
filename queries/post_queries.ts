import { db } from "@/db/client"
import { eq, or } from "drizzle-orm"
import { cache } from "react"

/* -------------------------------------------------------------------------------------------------
 * Queries
 * -----------------------------------------------------------------------------------------------*/
export const getPostsByAuthorId = cache(async (authorId: number) => {
  return await db.query.posts.findMany({
    where: (posts) => eq(posts.authorId, authorId),
  })
})

export const getPost = cache(async (slugOrId: string) => {
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
    where: (posts) => or(eq(posts.slug, slugOrId), eq(posts.id, parseInt(slugOrId))),
  })
})

/* -------------------------------------------------------------------------------------------------
 * Preloads
 * -----------------------------------------------------------------------------------------------*/
export function preloadGetPostsByAuthorId(authorId: number) {
  void getPostsByAuthorId(authorId)
}

export function preloadGetPostBySlug(slug: string) {
  void getPost(slug)
}

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/
export type GetPostsByAuthorId = Awaited<ReturnType<typeof getPostsByAuthorId>>
export type GetPost = Awaited<ReturnType<typeof getPost>>
