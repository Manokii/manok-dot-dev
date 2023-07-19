"use server"
import { and, eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { db } from "@/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth-options"
import { type Post, posts } from "@/db/schema"

export async function setPostStatus(postId: number, status: Post["status"]) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const result = await db
    .update(posts)
    .set({ status, publishedAt: status === "published" ? new Date() : null })
    .where(and(eq(posts.id, postId), eq(posts.authorId, session.user.portfolioId)))
    .returning()
    .then((res) => res.at(0))

  if (!result) {
    throw new Error("Publish failed")
  }

  revalidateTag(`/dashboard/posts`)
  revalidateTag(`/dashboard/posts/${postId}/edit`)
  revalidateTag(`/posts/${result.slug}`)
  revalidateTag(`/${session.user.portfolioSlug}`)
  return result
}
