import { CreateGameFormData, CreateGameResponse, createGameResponseSchema, User, LiveBattle, liveBattleSchema, OpenChallenge, openChallengeSchema } from "@/lib/validations/game"
import { getHostId } from "@/lib/utils"
import { API_BASE_URL } from "@/lib/config"
import { z } from "zod"

export interface CreateGameRequest {
  host: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit: number // in seconds
}

export async function createGame(data: CreateGameFormData): Promise<CreateGameResponse> {
  const hostId = await getHostId();

  // Convert form data to API request format
  const requestData: CreateGameRequest = {
    host: hostId,
    difficulty: data.difficulty,
    timeLimit: data.timeLimit * 60, // Convert minutes to seconds
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

export interface UserChallenge {
  _id: string
  host: User
  challenger?: User
  inviteCode: string
  status: "waiting" | "in_progress" | "completed" | "cancelled"
  problem: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit: number
  hostJoined: boolean
  challengerJoined: boolean
  hostCode: string
  challengerCode: string
  createdAt: string
  updatedAt: string
  __v: number
}

export async function getUserChallenges(userId: string): Promise<UserChallenge[]> {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/challenges`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch user challenges: ${response.statusText}`)
  }

  const challenges = await response.json()
  return challenges
}

export async function getLiveBattles(): Promise<LiveBattle[]> {
  const response = await fetch(`${API_BASE_URL}/api/games/live`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store', // Ensure fresh data for real-time game state
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch live battles: ${response.statusText}`)
  }

  const result = await response.json()
  return z.array(liveBattleSchema).parse(result)
}

export async function getOpenChallenges(userId: string | undefined): Promise<OpenChallenge[]> {
  const url = new URL(`${API_BASE_URL}/api/games/open`)
  if (userId) {
    url.searchParams.append('userId', userId)
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store', // Ensure fresh data for real-time game state
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch open challenges: ${response.statusText}`)
  }

  const result = await response.json()
  return z.array(openChallengeSchema).parse(result)
}