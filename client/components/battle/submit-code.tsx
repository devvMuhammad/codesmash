"use client"

import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'
import { useSubmitCode } from "@/hooks/use-submit-code"
import { useSession } from "@/lib/auth-client"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getGameById } from "@/lib/api/game"

export function SubmitCode() {
  const params = useParams()
  const gameId = params?.gameId as string
  const { data: session } = useSession()

  const {
    gameStatus,
    currentPlayerCode,
    selectedLanguage,
  } = useGameStore(
    useShallow((state) => ({
      gameStatus: state.gameStatus,
      currentPlayerCode: state.currentPlayerCode,
      selectedLanguage: state.selectedLanguage,
    }))
  )

  // Fetch game data to get problemId
  const { data: gameData } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameById(gameId),
    enabled: !!gameId,
  })

  const { mutate: submitCode, isPending } = useSubmitCode()

  const handleSubmit = () => {
    if (!session?.user?.id || !gameId) {
      console.error("Missing user ID or game ID")
      return
    }

    const problemId = gameData?.problem?._id
    if (!problemId) {
      console.error("Problem ID not found")
      return
    }

    submitCode({
      problemId,
      code: currentPlayerCode,
      language: selectedLanguage,
      gameId,
      userId: session.user.id,
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20"
      onClick={handleSubmit}
      disabled={gameStatus !== "in_progress" || isPending || !session?.user?.id || !gameData?.problem?._id}
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

