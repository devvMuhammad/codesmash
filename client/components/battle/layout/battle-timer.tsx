"use client"

import { useState, useEffect } from "react"
import { Timer } from "lucide-react"
import { formatTime } from "@/lib/date-utils"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

export function BattleTimer() {
  const { initialTimeRemaining, gameStatus } = useGameStore(
    useShallow((state) => ({
      initialTimeRemaining: state.timeRemaining,
      gameStatus: state.gameStatus,
    }))
  )

  const [localTimeRemaining, setLocalTimeRemaining] = useState(initialTimeRemaining)

  // Initialize local state from store
  useEffect(() => {
    setLocalTimeRemaining(initialTimeRemaining)
  }, [initialTimeRemaining])

  // Timer tick effect - only runs when game is in_progress
  useEffect(() => {
    if (gameStatus !== 'in_progress') {
      return
    }

    const intervalId = setInterval(() => {
      setLocalTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId)
          return 0
        }
        return prev - 1
      })
    }, 1000) // Tick every second

    return () => clearInterval(intervalId)
  }, [gameStatus])

  return (
    <div className="flex items-center gap-2">
      <Timer className="h-4 w-4 text-blue-400" />
      <span className="font-mono text-lg font-semibold text-blue-400">
        {formatTime(localTimeRemaining)}
      </span>
    </div>
  )
}
