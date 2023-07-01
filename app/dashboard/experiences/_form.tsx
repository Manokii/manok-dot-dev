"use client"
import { insertExperienceSchema } from "@/lib/validators"
import type { GetPortfolio } from "@/server/queries"
import { upsertExperience } from "@/server/server-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Props {
  experience?: GetPortfolio["experiences"][number]
  portfolioId: number
  onCancel?: () => void
}

export function ExperienceForm({ portfolioId, experience }: Props) {
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(insertExperienceSchema),
    defaultValues: experience ?? {
      portfolioId: portfolioId,
      companyName: "",
      jobTitle: "",
      companyWebsite: "",
      jobDescription: "",
    },
  })

  const submit = handleSubmit(async (data) => {
    await upsertExperience(data)
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
          {experience ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  )
}
