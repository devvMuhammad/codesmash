"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Flame, Trophy } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { leaderboardOptions } from "@/app/leaderboard/options"
import LeaderboardSkeleton from "./leaderboard-skeleton"


function getAvatarInitial(name: string | undefined): string {
  if (!name) return "?"
  return name.charAt(0).toUpperCase()
}

function getRankIcon(rank: number) {
  if (rank === 1) {
    return <Trophy className="h-6 w-6 text-yellow-500" />
  }
  if (rank === 2) {
    return <Trophy className="h-6 w-6 text-gray-400" />
  }
  if (rank === 3) {
    return <Trophy className="h-6 w-6 text-amber-700" />
  }
  return null
}

export function LeaderboardTable() {

  const { data: players, isLoading, isError, isRefetching, error } = useQuery(leaderboardOptions)

  if (isError) return <h1>Something just went wrong! {error.message}</h1>
  if (isLoading || isRefetching || !players) return <LeaderboardSkeleton />

  if (players.length === 0) {
    return (
      <div className="p-8 bg-muted/30 rounded-lg">
        <div className="text-center">
          <Flame className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No players found on the leaderboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg">
      {players.map((player, index) => {
        const rank = index + 1
        const rankIcon = getRankIcon(rank)
        const isEven = index % 2 === 0

        return (
          <div
            key={player._id}
            className={`p-4 transition-colors duration-200 ${isEven ? "bg-background" : "bg-muted/30"}`}
          >
            <div className="flex items-center justify-between">
              {/* Rank and Player Info */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Rank */}
                <div className="w-12 text-center">
                  {rankIcon ? (
                    <div className="flex justify-center">{rankIcon}</div>
                  ) : (
                    <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-base font-semibold">
                    {getAvatarInitial(player.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Name and Username */}
                <div className="flex-1">
                  <Link
                    href={`/profile/${player._id}`}
                    className="block text-lg font-semibold text-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {player.name || "Unknown"}
                  </Link>
                  <p className="text-sm text-muted-foreground">@{player.username}</p>
                </div>
              </div>

              {/* Aura Points */}
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-orange-500/10">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-bold text-orange-500">{player.aura}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
