import { CommonNavbar } from "@/components/common-navbar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function LobbyLoading() {
  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        {/* Open Challenges Section */}
        <div className="mb-12">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  {/* Player Info */}
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  {/* Challenge Button */}
                  <Skeleton className="h-10 w-32" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Battles Section */}
        <div>
          <div className="mb-6">
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  {/* Players */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-8" />
                    <div className="flex items-center space-x-2">
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                  {/* Problem & Status */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  {/* Watch Button */}
                  <Skeleton className="h-9 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

