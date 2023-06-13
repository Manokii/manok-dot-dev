"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"

export default function AuthScreen() {
  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn("discord")}>
            <Github className="mr-2 h-4 w-4" />
            Login with Discord
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
