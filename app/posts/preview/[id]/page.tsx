import "@/styles/github-markdown.css"
import { getPost } from "@/queries"
import { notFound } from "next/navigation"
import { PostPageContent } from "../../_post"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth-options"
import { env } from "@/env.mjs"
import { LinkButton } from "@/components/ui/button"
import { IconEdit } from "@tabler/icons-react"

export const dynamic = "force-dynamic"
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PostPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    notFound()
  }
  const post = await getPost(params.id)
  if (!post || session.user.portfolioId !== post.authorId) {
    notFound()
  }

  return (
    <div className="h-full w-full relative">
      <PostPageContent post={post} />
      <div className="flex gap-4 items-center p-4 bg-card text-foreground rounded-md border border-muted shadow absolute bottom-2 left-2">
        <div>
          This is a preview for {env.NEXT_PUBLIC_URL}/posts/{post.slug}
        </div>
        <LinkButton href={`/dashboard/posts/${post.id}/edit`} variant="secondary" size="sm">
          <IconEdit className="mr-2 w-4 h-4" />
          Edit
        </LinkButton>
      </div>
    </div>
  )
}
