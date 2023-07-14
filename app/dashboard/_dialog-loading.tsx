"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import FormLoading from "./_form-loading"
import { useRouter } from "next/navigation"

export default function Loading() {
  const router = useRouter()
  const onClose = (state: boolean) => !state && router.back()
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <FormLoading />
      </DialogContent>
    </Dialog>
  )
}
