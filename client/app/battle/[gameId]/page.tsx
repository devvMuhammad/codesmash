import { notFound } from "next/navigation"
import { getGameById } from "@/lib/api/game"
import { BattleClientWrapper } from "@/components/battle/battle-client-wrapper"

interface DuelPageProps {
  params: {
    gameId: string
  }
}

export default async function DuelPage({ params }: DuelPageProps) {
  const { gameId } = params

  if (!gameId) {
    notFound()
  }

  let gameData
  try {
    gameData = await getGameById(gameId)
  } catch (error) {
    console.error("Failed to fetch game data:", error)
    notFound()
  }

  return <BattleClientWrapper gameData={gameData} />
}
