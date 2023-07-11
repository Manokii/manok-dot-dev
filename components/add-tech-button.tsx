import { IconCheck, IconCirclePlus } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { TechnologyAddForm } from "./add-tech-form"
import type { InsertTechnology } from "@/server/server-actions"

interface Props {
  technologies: GetTechnologies
  selectedMap: Record<number, GetTechnologies[number]>
  onSelect: (tech: InsertTechnology) => void
}

export function TechnologyAdd({ technologies, selectedMap, onSelect }: Props) {
  const [formOpen, setFormOpen] = useState(false)

  const onSuccess = (tech: InsertTechnology) => {
    onSelect(tech)
    setFormOpen(false)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-9 w-9">
                    <IconCirclePlus className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <TypographyP>Add new tech stack</TypographyP>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </PopoverTrigger>
        {/* Dialog takes over scroll listener,
         *  which makes this popover not scrollable when on dialog box.
         *  Tho, search and click & drag still works
         */}
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search technologies" />
            <CommandList>
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup>
                <CommandItem className="cursor-pointer" onSelect={() => setFormOpen(true)}>
                  <IconCirclePlus className="mr-2" />
                  Add techonology
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Technologies">
                {Object.values(technologies).map((technology) => (
                  <CommandItem
                    value={technology.name}
                    key={technology.id}
                    onSelect={() => onSelect(technology)}
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Dialog open={formOpen} onOpenChange={(open) => setFormOpen(open)}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>List new technology</DialogTitle>
          </DialogHeader>
          <TechnologyAddForm onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}
