import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-9 w-20 self-end"></Skeleton>
      <Skeleton className="h-28"></Skeleton>
    </div>
  )
}
