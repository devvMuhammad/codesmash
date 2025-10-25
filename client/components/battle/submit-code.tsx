"use client"

import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

export function SubmitCode() {
  const {
    gameStatus,
    currentPlayerCode,
  } = useGameStore(
    useShallow((state) => ({
      gameStatus: state.gameStatus,
      currentPlayerCode: state.currentPlayerCode,
    }))
  )

  const handleSubmit = () => {
    // Submit functionality would be handled through WebSocket context
    console.log("Submit code:", currentPlayerCode)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20"
      onClick={handleSubmit}
      disabled={gameStatus !== "in_progress"}
    >
      <Send className="h-4 w-4 mr-2" />
      Submit
    </Button>
  )
}

