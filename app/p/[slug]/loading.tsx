import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="bg-secondary/30">
      <div className="container py-6">
        <Skeleton className="mb-6 h-3 w-80" />
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-3xl" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-40" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="size-10 rounded-full" />
                ))}
              </div>
            </div>
            <Skeleton className="mt-4 h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <div className="space-y-3 pt-6">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
