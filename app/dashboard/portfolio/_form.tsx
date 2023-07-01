"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { GetPortfolio } from "@/server/queries"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePortfolio } from "@/server/server-actions"
import { updatePortfolioSchema } from "@/lib/validators"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconDeviceFloppy } from "@tabler/icons-react"

export interface PortfolioFormProps {
  portfolio: NonNullable<GetPortfolio>
}

export async function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePortfolioSchema),
    defaultValues: {
      name: portfolio.name,
      headline: portfolio.headline,
      subheading: portfolio.subheading,
      about: portfolio.about,
      slug: portfolio.slug,
      publicEmail: portfolio.publicEmail,
      socialLinks: {
        twitter: portfolio.socialLinks.twitter,
        github: portfolio.socialLinks.github,
        linkedin: portfolio.socialLinks.linkedin,
        website: portfolio.socialLinks.website,
      },
    },
  })

  const submit = handleSubmit(async (data) => {
    await updatePortfolio(data)
  }, console.error)

  return (
    <form onSubmit={submit}>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>General Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Input
                label="Name"
                {...register("name")}
                text={errors.name?.message}
              />
              <Input
                label="Slug"
                {...register("slug")}
                error={errors.slug?.message}
              />
              <Input
                label="Public Email"
                {...register("publicEmail")}
                error={errors.publicEmail?.message}
              />
              <Input
                rootProps={{ className: "col-span-full" }}
                label="Headline"
                {...register("headline")}
                error={errors.headline?.message}
              />
              <Textarea
                rootProps={{ className: "col-span-full" }}
                className="min-h-[100px]"
                label="Subheading"
                {...register("subheading")}
                error={errors.about?.message}
                text="Appears below headine. Markdown is supported"
              />
              <Textarea
                rootProps={{ className: "col-span-full" }}
                className="min-h-[200px]"
                label="About"
                {...register("about")}
                error={errors.about?.message}
                text="Markdown is supported"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Input
                label="Github URL"
                {...register("socialLinks.github")}
                error={errors.socialLinks?.github?.message}
              />
              <Input
                label="Linkedin URL"
                {...register("socialLinks.linkedin")}
                error={errors.socialLinks?.linkedin?.message}
              />
              <Input
                label="Twitter URL"
                {...register("socialLinks.twitter")}
                error={errors.socialLinks?.twitter?.message}
              />
              <Input
                label="Website URL"
                {...register("socialLinks.website")}
                error={errors.socialLinks?.website?.message}
              />
            </div>
          </CardContent>
        </Card>
        <Button size="sm" className="self-end" type="submit">
          <IconDeviceFloppy className="mr-2 h-5 w-5" />
          Save
        </Button>
      </div>
    </form>
  )
}
