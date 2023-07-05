"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <IconSunFilled className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <IconMoonFilled className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
