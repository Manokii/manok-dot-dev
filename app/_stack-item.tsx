"use client"
import type { GetPortfolio } from "@/queries"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface Props {
  tech: GetPortfolio["experiences"][number]["stack"][number]["tech"]
}

export function StackItem({ tech }: Props) {
  const [opened, setOpened] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip open={opened} onOpenChange={setOpened}>
        <TooltipTrigger className="leading-none">
          <Badge
            variant="secondary"
            className="text-muted-foreground hover:text-foreground"
          >
            {tech.name}
          </Badge>
        </TooltipTrigger>
        {tech.description && (
          <TooltipContent>{tech.description}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
