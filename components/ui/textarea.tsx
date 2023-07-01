import * as React from "react"

import { cn } from "@/lib/utils"
import { ComponentProps, forwardRef } from "react"
import { Label } from "./label"

export type TextareaRawProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaRaw = forwardRef<HTMLTextAreaElement, TextareaRawProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextareaRaw.displayName = "Textarea"

export interface TextareaProps extends Omit<TextareaRawProps, "id"> {
  label?: string
  text?: string
  error?: string
  id?: string
  rootProps?: ComponentProps<"div">
}
const Textarea = forwardRef<HTMLDivElement, TextareaProps>(function Textarea(
  { rootProps, label, id, text, error, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col gap-1.5", rootProps?.className)}
      {...rootProps}
    >
      {label && (
        <Label className="text-muted-foreground" htmlFor={id}>
          {label}
        </Label>
      )}
      <TextareaRaw id={id} {...props} />
      {(text || error) && (
        <p
          className={cn(
            "mt-1 text-sm",
            error ? "text-red-400" : "text-muted-foreground"
          )}
        >
          {error || text}
        </p>
      )}
    </div>
  )
})

export { Textarea }
