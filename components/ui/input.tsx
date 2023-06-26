import { Label } from "@/components/ui/label"
import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface InputRawProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputRaw = forwardRef<HTMLInputElement, InputRawProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputRaw.displayName = "Input"

export interface InputProps extends Omit<InputRawProps, "id"> {
  label?: string
  text?: string
  id?: string
  rootProps?: ComponentProps<"div">
}
const Input = forwardRef<HTMLDivElement, InputProps>(function Input(
  { rootProps, label, id, text, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("grid w-full gap-1.5", className)}
      {...rootProps}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputRaw id={id} {...props} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
})

export { InputRaw, Input }
