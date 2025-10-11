import { GameData, gameDataSchema } from "@/lib/validations/game"
import { API_BASE_URL } from "@/lib/config"

export async function getGameById(gameId: string): Promise<GameData> {
  const response = await fetch(`${API_BASE_URL}/api/games/${gameId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store', // Ensure fresh data for real-time game state
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Game not found")
    }
    throw new Error(`Failed to fetch game: ${response.statusText}`)
  }

  const result = await response.json()
  return gameDataSchema.parse(result)
}