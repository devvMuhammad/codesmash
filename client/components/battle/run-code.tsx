"use client"

import { Button } from "@/components/ui/button"
import { Play, Loader2 } from "lucide-react"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'
import { useRunCode } from "@/hooks/use-run-code"

export function RunCode() {
  const { gameStatus } = useGameStore(
    useShallow((state) => ({
      gameStatus: state.gameStatus,
    }))
  )

  const { runCode, isPending, isDisabled } = useRunCode()

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-blue-600/10 text-blue-400 border-blue-600/20 hover:bg-blue-600/20"
      onClick={() => runCode()}
      disabled={gameStatus !== "in_progress" || isPending || isDisabled}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Play className="h-4 w-4 mr-2" />
      )}
      Run Code
    </Button>
  )
}
