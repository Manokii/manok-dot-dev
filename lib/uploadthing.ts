import { generateComponents } from "@uploadthing/react"
import type { UploadRouter } from "@/app/api/uploadthing/core"

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<UploadRouter>()
