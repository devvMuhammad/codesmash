import { z } from "zod"

export const difficultySchema = z.enum(["easy", "medium", "hard"])
export const gameStatusSchema = z.enum(["waiting", "ready_to_start", "in_progress", "completed", "cancelled"])

export const createGameSchema = z.object({
  difficulty: difficultySchema,
  timeLimit: z.number().min(15).max(120), // 15 minutes to 2 hours
  expiresIn: z.number().min(15).max(1440), // 15 minutes to 1 day
})

export type CreateGameFormData = z.infer<typeof createGameSchema>

export const createGameResponseSchema = z.object({
  gameId: z.string(),
  inviteLink: z.string(),
  inviteCode: z.string(),
})

export type CreateGameResponse = z.infer<typeof createGameResponseSchema>

export const userSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
})

export type User = z.infer<typeof userSchema>

export const playerSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().optional(),
  joinedAt: z.string(),
  isHost: z.boolean(),
})

export type Player = z.infer<typeof playerSchema>

export const problemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: difficultySchema,
  examples: z.array(z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional(),
  })),
  constraints: z.array(z.string()),
  functionSignature: z.string(),
})

export type Problem = z.infer<typeof problemSchema>

export const gameDataSchema = z.object({
  _id: z.string(),
  hostId: z.string(), // Keep for compatibility with frontend
  challengerId: z.string().optional(), // Keep for compatibility with frontend
  inviteCode: z.string(),
  status: gameStatusSchema,
  problemId: z.string(),
  problem: problemSchema.optional(),
  timeLimit: z.number(),
  difficulty: difficultySchema,
  hostJoined: z.boolean(),
  challengerJoined: z.boolean(),
  hostCode: z.string(),
  challengerCode: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  // Populated user data from MongoDB
  host: userSchema.optional(),
  challenger: userSchema.optional(),
})

export type GameData = z.infer<typeof gameDataSchema>

export const joinGameSchema = z.object({
  gameId: z.string(),
  userId: z.string(),
  inviteCode: z.string(),
})

export type JoinGameRequest = z.infer<typeof joinGameSchema>

export const joinGameResponseSchema = z.object({
  success: z.boolean(),
  role: z.enum(["host", "challenger", "spectator"]),
  message: z.string(),
})

export type JoinGameResponse = z.infer<typeof joinGameResponseSchema>
export type PlayerRolesType = JoinGameResponse['role']