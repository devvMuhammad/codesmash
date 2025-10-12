import { notFound } from "next/navigation"
import { getGameById, joinGame } from "@/lib/api/game"
import { BattleClientContent } from "@/components/battle/battle-client-wrapper"
import type { JoinGameResponse } from "@/lib/validations/game"
import { getSessionServerSide } from "@/lib/api/user"
import { WebSocketProvider } from "@/context/websocket-context"

interface DuelPageProps {
  params: Promise<{
    gameId: string
  }>
  searchParams: Promise<{
    invite?: string
  }>
}

export default async function DuelPage({ params, searchParams }: DuelPageProps) {
  const { gameId } = await params
  const { invite: inviteCode } = await searchParams

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
    gameData = await getGameById(gameId)
  } catch (error) {
    console.error("Failed to fetch game data:", error)
    notFound()
  }

  // try to join the game if there is an invite code
  if (inviteCode) {
    try {
      joinResult = await joinGame({
        gameId,
        userId: session.user.id,
        inviteCode
      })
    } catch (error) {
      console.error("Failed to join game:", error)
    }
  }

  return <WebSocketProvider>
    <BattleClientContent gameData={gameData} joinResult={joinResult} />
  </WebSocketProvider>
}
