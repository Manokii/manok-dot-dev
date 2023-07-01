"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputSkeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export default function ExperienceAddLoading() {
  const router = useRouter()
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {new Array(3).fill(null).map((_, i) => (
            <InputSkeleton key={i} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
