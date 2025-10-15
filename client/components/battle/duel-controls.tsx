"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Send, Flag, Timer } from "lucide-react"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

interface DuelControlsProps {
  onRunCode?: (code: string) => void
  onSubmitCode?: (code: string) => void
  onForfeit?: () => void
}

export function DuelControls({ onRunCode, onSubmitCode, onForfeit }: DuelControlsProps) {
  const {
    timeRemaining,
    gameStatus,
    currentPlayerCode,
    isConnected,
    opponentConnected,
  } = useGameStore(
    useShallow((state) => ({
      timeRemaining: state.timeRemaining,
      gameStatus: state.gameStatus,
      currentPlayerCode: state.currentPlayerCode,
      isConnected: state.isConnected,
      opponentConnected: state.opponentConnected,
    }))
  )

  const playersCount = (isConnected ? 1 : 0) + (opponentConnected ? 1 : 0)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleRunCode = () => {
    if (onRunCode) {
      onRunCode(currentPlayerCode)
    }
  }

  const handleSubmit = () => {
    if (onSubmitCode) {
      onSubmitCode(currentPlayerCode)
    }
  }

  const handleForfeit = () => {
    if (onForfeit) {
      onForfeit()
    }
  }

  return (
    <div className="h-full flex items-center justify-between px-4 bg-card/30">
      {/* Left - Action Buttons */}
      <div className="flex items-center space-x-3">
        <Button size="sm" variant="default" className="glow-blue-sm" onClick={handleRunCode} disabled={gameStatus !== "in_progress"}>
          <Play className="h-4 w-4 mr-2" />
          Run Code
        </Button>
        <Button size="sm" variant="default" onClick={handleSubmit} disabled={gameStatus !== "in_progress"}>
          <Send className="h-4 w-4 mr-2" />
          Submit
        </Button>
        <Button size="sm" variant="destructive" onClick={handleForfeit} disabled={gameStatus !== "in_progress"}>
          <Flag className="h-4 w-4 mr-2" />
          Forfeit
        </Button>
      </div>

      {/* Center - Timer */}
      <div className="flex items-center space-x-2">
        <Timer className="h-5 w-5 text-primary" />
        <span className="text-2xl font-mono font-bold text-foreground">{formatTime(timeRemaining)}</span>
        <Badge variant="secondary">Time Remaining</Badge>
      </div>

      {/* Right - Status */}
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Status: </span>
          <span className="text-foreground font-medium capitalize">{gameStatus}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Players: </span>
          <span className="text-foreground font-medium">{playersCount}/2</span>
        </div>
      </div>
    </div>
  )
}
