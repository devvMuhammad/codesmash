"use client"

import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'
import { useSubmitCode } from "@/hooks/use-submit-code"

export function SubmitCode() {
  const { gameStatus } = useGameStore(
    useShallow((state) => ({
      gameStatus: state.gameStatus,
    }))
  )

  const { submitCode, isPending, isDisabled } = useSubmitCode()

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20"
      onClick={() => submitCode()}
      disabled={gameStatus !== "in_progress" || isPending || isDisabled}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Send className="h-4 w-4 mr-2" />
      )}
      Submit
    </Button>
  )
}