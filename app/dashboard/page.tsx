"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn, useSession } from "next-auth/react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
        </TabsList>
        <div className="pt-2">
          <TabsContent value="about">qweqwe</TabsContent>
          <TabsContent value="experience">experience</TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
