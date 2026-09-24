import { CommonNavbar } from "@/components/common-navbar"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function ChallengeCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="space-y-4">
        {/* Top Row - Players */}
        <div className="flex items-center justify-center gap-6">
          {/* Host */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* VS Text */}
          <Skeleton className="h-6 w-10" />

          {/* Challenger */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Second Row - Problem Info */}
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Third Row - Details & Actions */}
        <div className="flex items-center justify-between gap-4">
          {/* Left - Metadata */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function UserChallengesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ChallengeCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}