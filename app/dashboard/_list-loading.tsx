import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export default function Loading({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-4", className)} {...props}>
      {new Array(3).fill(0).map((_, i) => (
        <Card className="min-h-[200px]">
          <CardHeader>
            <Skeleton key={i} className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Skeleton key={i} className="w-full h-16" />

              <div className="flex gap-2 items-center flex-wrap">
                {new Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="w-16 h-4" />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton key={i} className="w-20 h-6" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
