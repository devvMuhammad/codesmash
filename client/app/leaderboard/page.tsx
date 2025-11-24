import { CommonNavbar } from "@/components/common-navbar"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { getLeaderboard } from "@/lib/api/user"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top players ranked by aura points",
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard()

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top players ranked by aura points</p>
        </div>

        <LeaderboardTable players={leaderboard} />
      </div>
    </div>
  )
}
