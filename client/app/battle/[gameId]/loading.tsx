import { Skeleton } from "@/components/ui/skeleton"

export default function BattleLoading() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Battle Navbar Skeleton */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex min-h-0">
        {/* Problem Panel Skeleton */}
        <div className="w-80 border-r border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-6 w-6" />
          </div>
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <div className="bg-muted rounded p-3 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Code Editors and Console Skeleton */}
        <div className="flex-1 flex flex-col">
          {/* Code Editors Skeleton */}
          <div className="flex-1 flex">
            {/* Current Player Editor */}
            <div className="flex-1 flex flex-col border-r border-border">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <Skeleton className="h-5 w-16" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            </div>

            {/* Opponent Editor */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-6" />
              </div>
              <div className="flex-1 p-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </div>
          </div>

          {/* Console Panel Skeleton */}
          <div className="h-64 border-t border-border">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-6" />
            </div>
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}