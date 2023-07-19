import { InputSkeleton, TextareaSkeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-4 gap-4 rounded-md grid grid-cols-1 lg:grid-cols-3">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton className="col-span-full" />
      <TextareaSkeleton className="col-span-full" />
    </div>
  )
}
