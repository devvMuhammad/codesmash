import { useMutation } from "@tanstack/react-query"
import { CreateGameFormData, CreateGameResponse, createGameResponseSchema } from "@/lib/validations/game"
import { getHostId } from "../utils"
import { API_BASE_URL } from "../config"

export interface CreateGameRequest {
  hostId: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit: number // in seconds
  expiresAt: Date
}

export async function createGame(data: CreateGameFormData): Promise<CreateGameResponse> {
  const hostId = await getHostId();

  // Convert form data to API request format
  const requestData: CreateGameRequest = {
    hostId,
    difficulty: data.difficulty,
    timeLimit: data.timeLimit * 60, // Convert minutes to seconds
    expiresAt: new Date(Date.now() + data.expiresIn * 60 * 1000), // Convert minutes to milliseconds
  }

  const response = await fetch(API_BASE_URL + "/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create game: ${response.statusText}`)
  }

  const result = await response.json()
  return createGameResponseSchema.parse(result)
}

export function useCreateGame() {

  return useMutation({
    mutationFn: createGame,
  })
}