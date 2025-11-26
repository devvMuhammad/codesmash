"use client"

import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

export function MatchInfo() {
  const {
    currentPlayerConnected,
    opponentConnected,
    opponentName,
  } = useGameStore(
    useShallow((state) => ({
      currentPlayerConnected: state.currentPlayerConnected,
      opponentConnected: state.opponentConnected,
      opponentName: state.opponentData?.name,
    }))
  )

  return (
    <div className="flex items-center gap-6">

      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={`${currentPlayerConnected
            ? 'bg-green-500/10 text-green-400 border-green-500/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}
        >
          You
        </Badge>
        <span className="text-muted-foreground font-medium">vs</span>
        <Badge
          variant="outline"
          className={`${opponentConnected
            ? 'bg-green-500/10 text-green-400 border-green-500/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}
        >
          {opponentName || "Not Decided Yet"}
        </Badge>
      </div>
    </div>
  )
}

