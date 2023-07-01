"use client"
import { ExperienceForm } from "@/app/dashboard/experiences/_form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface Props {
  portfolioId: number
}

export default function ExperienceAddDialog({ portfolioId }: Props) {
  const router = useRouter()
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>
        <ExperienceForm portfolioId={portfolioId} />
      </DialogContent>
    </Dialog>
  )
}
