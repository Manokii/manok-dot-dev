"use client"
import { AccomplishmentForm } from "@/app/dashboard/accomplishments/_form"
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

export default function AccomplishmentAddDialog({ portfolioId }: Props) {
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
          <DialogTitle>Add Accomplishment</DialogTitle>
        </DialogHeader>
        <AccomplishmentForm portfolioId={portfolioId} />
      </DialogContent>
    </Dialog>
  )
}
