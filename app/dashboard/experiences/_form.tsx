"use client"
import { insertExperienceSchema } from "@/lib/validators"
import type { GetPortfolio } from "@/queries"
import { upsertExperience } from "@/server/server-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TypographyH4 } from "@/components/ui/typography"
import { TechnologyAdd } from "@/components/add-tech-button"
import type { GetTechnologies } from "@/queries/get-technologies"

interface Props {
  experience?: GetPortfolio["experiences"][number]
  portfolioId: number
  technologies: GetTechnologies
}

export function ExperienceForm({
  portfolioId,
  experience,
  technologies,
}: Props) {
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

        <div className="flex flex-col gap-2 mt-4">
          <TypographyH4>Tech Stack</TypographyH4>
          <div className="flex flex-row gap-2">
            <TechnologyAdd selectedMap={{}} technologies={technologies} />
          </div>
        </div>

        <Button className="self-end" type="submit">
          {experience ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  )
}
