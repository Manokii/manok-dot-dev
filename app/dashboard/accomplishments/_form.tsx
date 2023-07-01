"use client"
import { insertAccomplishmentSchema } from "@/lib/validators"
import type { GetPortfolio } from "@/server/queries"
import { upsertAccomplishment } from "@/server/server-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Props {
  accomplishment?: GetPortfolio["accomplishments"][number]
  portfolioId: number
  onCancel?: () => void
}

export function AccomplishmentForm({ portfolioId, accomplishment }: Props) {
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(insertAccomplishmentSchema),
    defaultValues: accomplishment ?? {
      portfolioId: portfolioId,
      companyName: "",
      jobTitle: "",
      companyWebsite: "",
      jobDescription: "",
    },
  })

  const submit = handleSubmit(async (data) => {
    await upsertAccomplishment(data)
  })

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Linux Merch Gurus (LMG)..."
          label="Company Name"
          {...register("companyName")}
        />
        <Input
          placeholder="ttlstore.com..."
          label="Company Website"
          {...register("companyWebsite")}
        />
        <Input
          placeholder="Software Engineer..."
          label="Job Title"
          {...register("jobTitle")}
        />
        <Textarea
          placeholder="I code..."
          label="Job Description"
          {...register("jobDescription")}
        />

        <Button className="self-end" type="submit">
          {accomplishment ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  )
}
