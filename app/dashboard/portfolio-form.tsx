"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { GetPorfolio } from "@/server/queries"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePortfolio } from "./server-actions"
import { updatePortfolioSchema } from "@/lib/validators"
import { useTransition } from "react"

interface PortfolioFormProps {
  portfolio: NonNullable<GetPorfolio>
}

export async function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const [pending, startTransition] = useTransition()
  const { register, handleSubmit } = useForm({
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

  const submit = handleSubmit((data) => {
    updatePortfolio(data)
  }, console.error)

  return (
    <form onSubmit={(e) => startTransition(() => submit(e))}>
      <div className="flex flex-col gap-4">
        <Input label="Public Email" id="email" {...register("publicEmail")} />
        <Button type="submit">save</Button>
      </div>
    </form>
  )
}
