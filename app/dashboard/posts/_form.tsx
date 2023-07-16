"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { insertPostSchema } from "@/lib/validators"
import type { GetPost } from "@/queries/post_queries"
import { upsertPost } from "@/server/server-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"

interface Props {
  post?: GetPost
  portfolioId: number
}

export function PostForm({ post, portfolioId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const postForm = useForm({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      id: post?.id,
      authorId: portfolioId,
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      body: post?.body ?? "",
      slug: post?.slug ?? "",
      thumbnail: post?.thumbnail ?? "",
    },
  })

  const isEdit = Boolean(post)
  const saveAsDraft = postForm.handleSubmit((values) => {
    startTransition(async () => {
      const newPost = await upsertPost(values)
      postForm.reset({
        id: newPost.id,
        authorId: portfolioId,
        title: newPost.title,
        excerpt: newPost.excerpt ?? "",
        body: newPost.body,
        slug: newPost.slug,
        thumbnail: newPost.thumbnail ?? "",
      })

      if (!isEdit) {
        router.push(`/dashboard/posts/${newPost.id}/edit`)
      }
    })
  }, console.error)

  return (
    <Form {...postForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          saveAsDraft(e)
        }}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={postForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[400px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center">
            <Button type="submit">
              {pending ? (
                <IconLoader2 className="animate-spin mr-2 w-5 h-5" />
              ) : (
                <IconDeviceFloppy className="mr-2 w-5 h-5" />
              )}
              {post ? "Update" : "Save as draft"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
