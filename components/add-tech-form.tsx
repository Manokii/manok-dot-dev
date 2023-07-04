import { insertTechnologiesSchema } from "@/lib/validators"
import {
  type InsertTechnology,
  insertTechnology,
} from "@/server/server-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Button } from "./ui/button"
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface Props {
  onSuccess: (newTech: InsertTechnology) => void
}

export function TechnologyAddForm({ onSuccess }: Props) {
  const [pending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(insertTechnologiesSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      icon: "",
    },
  })

  const submit = form.handleSubmit((data) => {
    startTransition(async () => {
      try {
        const result = await insertTechnology(data)
        onSuccess(result)
      } catch (e) {
        console.error(e)
      }
    })
  }, console.error)

  return (
    <Form {...form}>
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="NextJs..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="nextjs" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A React framework for the web..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>
            {pending ? (
              <IconLoader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <IconDeviceFloppy className="mr-2 h-5 w-5" />
            )}
            Add
          </Button>
        </div>
      </form>
    </Form>
  )
}
