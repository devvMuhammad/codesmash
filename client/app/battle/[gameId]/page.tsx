import { redirect } from "next/navigation"
import { getGameById, joinGame } from "@/lib/api/game"
import { BattleClient } from "@/components/battle/battle-client"
import { getSessionServerSide } from "@/lib/api/user"
import { GameWebSocketProvider } from "@/context/game-websocket-context"
import { GameStoreProvider } from "@/providers/game-store-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Battle",
  description: "Compete in a real-time 1v1 coding battle.",
}

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
    redirect("/lobby")
  }

  const session = await getSessionServerSide()

  const joinResult = await joinGame({
    gameId,
    userId: session?.user.id,
    inviteCode
  })
  const gameData = await getGameById(gameId)

  return (
    <GameStoreProvider
      gameData={gameData}
      userRole={joinResult.role}
      user={session?.user || null}
    >
      <GameWebSocketProvider
        gameId={gameId}
        userRole={joinResult.role}
        user={session?.user || null}
        gameOver={gameData.status === 'completed'}
      >
        <BattleClient gameData={gameData} joinResult={joinResult} user={session?.user || null} />
      </GameWebSocketProvider>
    </GameStoreProvider>
  )
}
