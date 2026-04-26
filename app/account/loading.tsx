import { Skeleton } from "@/components/ui/skeleton"

export default function AccountLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-44 w-full rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  )
}
