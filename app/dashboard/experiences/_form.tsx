"use client"
import { insertExperienceSchema } from "@/lib/validators"
import type { GetExperience, GetTechnologies } from "@/queries"
import { type InsertTechnology, upsertExperience } from "@/server/server-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TypographyH4 } from "@/components/ui/typography"
import { TechnologyAdd } from "@/components/add-tech-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useTransition } from "react"
import { IconCalendar, IconDeviceFloppy, IconLoader2, IconX } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

interface Props {
  experience?: GetExperience
  portfolioId: number
  technologies: GetTechnologies
}

export function ExperienceForm({ portfolioId, experience, technologies }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm({
    reValidateMode: "onSubmit",
    resolver: zodResolver(insertExperienceSchema),
    defaultValues: {
      id: experience?.id,
      portfolioId,
      companyName: experience?.companyName ?? "",
      jobTitle: experience?.jobTitle ?? "",
      companyWebsite: experience?.companyWebsite ?? "",
      jobDescription: experience?.jobDescription ?? "",
      startedAt: experience?.startedAt ?? new Date(),
      endedAt: experience?.endedAt,
      stack: experience?.stack.map((expTech) => expTech.tech.id) ?? [],
    },
  })

  const experienceId = form.watch("id")
  const submit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const newExp = await upsertExperience(data)
      if (!newExp) {
        return
      }
      form.reset({
        id: newExp.id,
        portfolioId,
        companyName: newExp.companyName ?? "",
        jobTitle: newExp.jobTitle ?? "",
        companyWebsite: newExp.companyWebsite ?? "",
        jobDescription: newExp.jobDescription ?? "",
        startedAt: newExp.startedAt ?? new Date(),
        endedAt: newExp.endedAt,
        stack: newExp.stack.map((expTech) => expTech.tech.id),
      })
      if (!experience) {
        router.push("/dashboard/experiences")
      }
    })
  })

  const currentStack = form
    .watch("stack")
    .reduce<Record<number, GetTechnologies[number]>>((acc, curr) => {
      const tech = technologies[curr]
      if (!tech) return acc
      Object.assign(acc, { [curr]: tech })
      return acc
    }, {})

  const addTechToStack = (tech: InsertTechnology) => {
    if (currentStack[tech.id]) {
      const newStack = form.getValues("stack").filter((id) => id !== tech.id)
      form.setValue("stack", newStack)
      return
    }
    const index = form.getValues("stack").length
    form.setValue(`stack.${index}`, tech.id)
    technologies[tech.id] = tech
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <form>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Linux Merch Gurus (LMG)..." {...field} />
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date || form.getValues("startedAt"))}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => field.onChange(date)}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row gap-2 flex-wrap">
            <div className="flex flex-row items-center gap-2">
              <TypographyH4>Tech Stack</TypographyH4>
              <TechnologyAdd
                onSelect={addTechToStack}
                selectedMap={currentStack}
                technologies={technologies}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              {Object.values(currentStack).map((tech) => (
                <Badge key={tech.id} className="flex items-center whitespace-nowrap">
                  <Button size="icon" className="w-4 h-4 mr-2" onClick={() => addTechToStack(tech)}>
                    <IconX className="w-4 h-4" />
                  </Button>
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Button className="self-end" disabled={pending} onClick={submit}>
          {pending ? (
            <IconLoader2 className="animate-spin mr-2 w-5 h-5" />
          ) : (
            <IconDeviceFloppy className="mr-2 w-5 h-5" />
          )}
          {experienceId ? "Update" : "Save"}
        </Button>
      </div>
    </Form>
  )
}
