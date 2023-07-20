import "@/styles/github-markdown.css"
import { getPublicPost, getPublicPosts } from "@/queries"
import { notFound } from "next/navigation"
import { sanitizeMarkdown } from "@/lib/sanitize-md"
import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { PostPageContent } from "../_post"

export const revalidate = 300

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const portfolios = await getPublicPosts()

  return portfolios.map((portfolio) => {
    return {
      slug: portfolio.slug,
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublicPost(params.slug)
  const title = `${post?.title || "Blog"} — ${siteConfig.name}`
  const description = sanitizeMarkdown(post?.excerpt || "")

  const searchparams = new URLSearchParams({
    title: post?.title || "",
    slug: post?.slug || "",
    author: post?.author.name || "",
    excerpt: post?.excerpt || "",
  })

  const relativeUrl = `/og/post?${searchparams}`
  const url = `${env.NEXT_PUBLIC_URL}${relativeUrl}`

  return {
    title,
    description,
    openGraph: {
      images: [url],
      title,
      description,
      url: `${env.NEXT_PUBLIC_URL}/posts/${params.slug}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      images: [url],
      title,
      description,
      site: `${env.NEXT_PUBLIC_URL}/posts/${params.slug}`,
    },
  }
}
export default async function PostPage({ params }: Props) {
  const post = await getPublicPost(params.slug)
  if (!post) {
    notFound()
  }

  return <PostPageContent post={post} />
}
