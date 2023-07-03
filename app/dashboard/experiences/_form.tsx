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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  const form = useForm({
    resolver: zodResolver(insertExperienceSchema),
    defaultValues: {
      id: experience?.id,
      portfolioId: portfolioId,
      companyName: experience?.companyName ?? "",
      jobTitle: experience?.jobTitle ?? "",
      companyWebsite: experience?.companyWebsite ?? "",
      jobDescription: experience?.jobDescription ?? "",
      startedAt: experience?.startedAt ?? new Date(),
      endedAt: experience?.endedAt,
      stack: [],
    },
  })

  const submit = form.handleSubmit(async (data) => {
    await upsertExperience(data)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {experience ? "Update Experience" : "Add Experience"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Linux Merch Gurus (LMG)..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input placeholder="ttlstore.com..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="I code..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2 mt-4">
                <TypographyH4>Tech Stack</TypographyH4>
                <div className="flex flex-row gap-2">
                  <TechnologyAdd selectedMap={{}} technologies={technologies} />
                </div>
              </div>

              <Button className="self-end" type="submit">
                {experience ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
