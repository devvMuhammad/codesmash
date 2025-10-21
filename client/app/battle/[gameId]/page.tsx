import { notFound } from "next/navigation"
import { getGameById, joinGame } from "@/lib/api/game"
import { BattleClientContent } from "@/components/battle/battle-client"
import type { JoinGameResponse } from "@/lib/validations/game"
import { getSessionServerSide } from "@/lib/api/user"
import { GameWebSocketProvider } from "@/context/game-websocket-context"
import { GameStoreProvider } from "@/providers/game-store-provider"

interface DuelPageProps {
  params: Promise<{
    gameId?: string
  }>
  searchParams: Promise<{
    inviteCode?: string
  }>
}

export default async function DuelPage({ params, searchParams }: DuelPageProps) {
  const { gameId } = await params
  const { inviteCode } = await searchParams

  if (!gameId) {
    notFound()
  }

  // Get current user session
  const session = await getSessionServerSide()
  if (!session?.user?.id) {
    // Redirect to login or handle unauthenticated user
    notFound()
  }

  let gameData
  let joinResult: JoinGameResponse | null = null

  try {
    joinResult = await joinGame({
      gameId,
      userId: session.user.id,
      inviteCode
    })
  } catch (error) {
    console.error("Failed to join game:", error)
    // fallback to spectator role
    joinResult = {
      success: false,
      role: "spectator",
      message: "Failed to join game"
    }
  }

  // Then fetch the game data (which will include updated join status)
  try {
    gameData = await getGameById(gameId)
  } catch (error) {
    console.error("Failed to fetch game data:", error)
    notFound()
  }

  // console.log(joinResult?.role !== "host" ? joinResult : "host joined the game")

  return (
    <GameStoreProvider
      gameData={gameData}
      userRole={joinResult.role}
      user={session.user}
    >
      <GameWebSocketProvider
        gameId={gameId}
        userRole={joinResult.role}
        user={session.user}
      >
        <BattleClientContent gameData={gameData} joinResult={joinResult} user={session.user} />
      </GameWebSocketProvider>
    </GameStoreProvider>
  )
}
