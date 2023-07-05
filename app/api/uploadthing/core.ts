import { getServerActionUser } from "@/server/get-server-action-user"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await getServerActionUser()
      if (!session) throw new Error("Unauthorized")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
    }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
