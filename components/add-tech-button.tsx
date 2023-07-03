"use client"
import { IconCheck, IconCirclePlus } from "@tabler/icons-react"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { TypographyP } from "./ui/typography"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Command,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command"
import { GetTechnologies } from "@/queries/get-technologies"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "./ui/dialog"

interface Props {
  technologies: GetTechnologies
  onSelect?: () => void
  selectedMap: Record<number, boolean>
}

export function TechnologyAdd({ onSelect, technologies, selectedMap }: Props) {
  const [formOpen, setFormOpen] = useState(false)
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <IconCirclePlus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <TypographyP>Add new tech stack</TypographyP>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search technologies" />
            <CommandList>
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup heading="Technologies">
                {technologies.map((technology) => (
                  <CommandItem
                    value={technology.name}
                    key={technology.id}
                    onSelect={onSelect}
                  >
                    <IconCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedMap[technology.id] ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {technology.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  className="cursor-pointer"
                  onSelect={() => setFormOpen(true)}
                >
                  <IconCirclePlus className="mr-2" />
                  Add techonology
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Dialog open={formOpen} onOpenChange={(open) => setFormOpen(open)}>
        <DialogContent className="z-50">qwew</DialogContent>
      </Dialog>
    </>
  )
}
