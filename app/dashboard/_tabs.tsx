"use client"

import { LinkButton, LinkButtonProps } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function DashboardTabs() {
  const pathname = usePathname()
  const getProps = (path: string): LinkButtonProps["variant"] =>
    pathname.startsWith(path) ? "default" : "ghost"

  return (
    <div className="p-2 gap-1 rounded-md flex flex-row flex-nowrap bg-muted self-start">
      <LinkButton
        variant={getProps("/dashboard/portfolio")}
        href="/dashboard/portfolio"
        size="sm"
      >
        Portfolio
      </LinkButton>
      <LinkButton
        variant={getProps("/dashboard/accomplishments")}
        href="/dashboard/accomplishments"
        size="sm"
      >
        Accomplishments
      </LinkButton>
      <LinkButton
        variant={getProps("/dashboard/projects")}
        href="/dashboard/projects"
        size="sm"
      >
        Projects
      </LinkButton>
    </div>
  )
}
