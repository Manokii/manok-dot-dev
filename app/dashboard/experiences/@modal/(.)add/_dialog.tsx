"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExperienceForm } from "../../_form"
import { GetTechnologies } from "@/queries/get-technologies"
import { useRouter } from "next/navigation"

interface Props {
  portfolioId: number
  technologies: GetTechnologies
}
export function ExperienceAddModal({ portfolioId, technologies }: Props) {
  const router = useRouter()
  const onClose = (state: boolean) => !state && router.back()
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
          <DialogDescription>
            Psst, this dialog is an intercepted route, you can refresh this page
            to use a standalone page for listing your experience
          </DialogDescription>
        </DialogHeader>
        <ExperienceForm technologies={technologies} portfolioId={portfolioId} />
      </DialogContent>
    </Dialog>
  )
}
