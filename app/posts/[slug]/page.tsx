import "@/styles/github-markdown.css"
import { TypographyH2, TypographyLarge, TypographySmall } from "@/components/ui/typography"
import { getPublicPost, getPublicPosts } from "@/queries"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns/esm"
import { Markdown } from "@/components/ui/md"
import NextImage from "next/image"
import NextLink from "next/link"
import { sanitizeMarkdown } from "@/lib/sanitize-md"
import type { Metadata } from "next"
import { ThemeToggle } from "@/components/theme-toggle"

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
  const title = `${post?.title || "Blog"} — Manok.dev`
  const description = sanitizeMarkdown(post?.excerpt || "")

  const url = `/og/post?${new URLSearchParams({
    title: post?.title || "",
    slug: post?.slug || "",
    author: post?.author.name || "",
  })}`

  return {
    title,
    description,
    openGraph: {
      images: [url],
      title,
      description,
      url: "https://manok.dev",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      images: [url],
      title,
      description,
      site: "https://manok.dev",
    },
  }
}
export default async function PostPage({ params }: Props) {
  const post = await getPublicPost(params.slug)
  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl py-16 px-4 sm:px-8 lg:py-20">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-1">
          <TypographyH2 className="font-extrabold leading-none">{post.title}</TypographyH2>
          <TypographyLarge className="leading-none">{post.excerpt}</TypographyLarge>
          <div className="flex items-center gap-2 my-2">
            <NextLink href={`/${post.author.slug}`} className="text-sm text-foreground font-bold">
              {post.author.name}
            </NextLink>
            <Separator orientation="vertical" className="h-5" />
            {post.publishedAt && (
              <TypographySmall className="text-center">
                {format(post.publishedAt, "MMMM dd, yyyy")}
              </TypographySmall>
            )}
            <Separator orientation="vertical" className="h-5" />
            <ThemeToggle size="sm" />
          </div>
        </header>
        {post.thumbnail && (
          <div className="flex flex-col gap-2 aspect-[41/20]">
            <NextImage
              className="rounded"
              alt="thumbnail"
              width={1200}
              height={630}
              src={post.thumbnail}
            />
          </div>
        )}
        <main className="markdown-body">
          <Markdown content={post.body} />
        </main>
      </div>
    </div>
  )
}
