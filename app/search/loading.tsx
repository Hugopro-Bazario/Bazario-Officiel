import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container py-6">
      <Skeleton className="mb-2 h-4 w-64" />
      <Skeleton className="mb-6 h-10 w-96" />
      <div className="mb-6 flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden space-y-6 lg:block">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          ))}
        </aside>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-9 w-44" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
