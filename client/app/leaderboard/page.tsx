import { CommonNavbar } from "@/components/common-navbar"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { RefreshButton } from "@/components/leaderboard/refresh-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top players ranked by aura points",
}

export default async function LeaderboardPage() {

  // const queryClient = getQueryClient()
  // await queryClient.prefetchQuery(leaderboardOptions)

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
            <RefreshButton />
          </div>
          <p className="text-muted-foreground">Top players ranked by aura points</p>
        </div>


        <LeaderboardTable />

      </div>
    </div>
  )
}
