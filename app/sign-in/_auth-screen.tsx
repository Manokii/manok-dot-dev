"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
} from "@tabler/icons-react"

export function AuthScreen() {
  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button onClick={() => signIn("discord")}>
              <IconBrandDiscordFilled className="mr-2 h-4 w-4" />
              Login with Discord
            </Button>
            <Button onClick={() => signIn("github")}>
              <IconBrandGithubFilled className="mr-2 h-4 w-4" />
              Login with Github
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
