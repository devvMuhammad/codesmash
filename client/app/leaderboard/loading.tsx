import { CommonNavbar } from "@/components/common-navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>

        <div className="overflow-hidden rounded-lg">
          {Array.from({ length: 10 }).map((_, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={index}
                className={`p-4 ${isEven ? "bg-background" : "bg-muted/30"}`}
              >
                <div className="flex items-center justify-between">
                  {/* Rank and Player Info */}
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Rank */}
                    <div className="w-12">
                      <Skeleton className="h-6 w-8 mx-auto" />
                    </div>

                    {/* Avatar */}
                    <Skeleton className="h-12 w-12 rounded-full" />

                    {/* Name and Username */}
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>

                  {/* Aura Points */}
                  <Skeleton className="h-10 w-24 rounded-full" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
