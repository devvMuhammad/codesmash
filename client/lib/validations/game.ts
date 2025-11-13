import { z } from "zod"

export const difficultySchema = z.enum(["easy", "medium", "hard"])
export const gameStatusSchema = z.enum(["waiting", "ready_to_start", "in_progress", "completed", "cancelled"])

export const createGameSchema = z.object({
  difficulty: difficultySchema,
  timeLimit: z.number().min(1).max(120), // 1 minute to 2 hours
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

const gameResultReasons = ["forfeit", "time_up", "completed"] as const

export const gameResultSchema = z.object({
  reason: z.enum(gameResultReasons),
  winner: z.string().optional(), // undefined for draws
  message: z.string(),
})

export type GameResult = z.infer<typeof gameResultSchema>

export const playerSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().optional(),
  joinedAt: z.string(),
  isHost: z.boolean(),
})

export type Player = z.infer<typeof playerSchema>

export const problemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: difficultySchema,
  initialCodes: z.object({
    python: z.string(),
    javascript: z.string(),
    java: z.string(),
    cpp: z.string(),
  }),
  correctOutput: z.string(),
  testCases: z.string(),
  totalTestCases: z.number(), // Calculated field from server
})

export type Problem = z.infer<typeof problemSchema>

export const gameDataSchema = z.object({
  _id: z.string(),
  hostId: z.string(), // Keep for compatibility with frontend
  challengerId: z.string().optional(), // Keep for compatibility with frontend
  inviteCode: z.string(),
  status: gameStatusSchema,
  problem: problemSchema.optional(),
  timeLimit: z.number(),
  difficulty: difficultySchema,
  hostJoined: z.boolean(),
  challengerJoined: z.boolean(),
  hostCode: z.string(),
  challengerCode: z.string(),
  hostTestsPassed: z.number().default(0),
  challengerTestsPassed: z.number().default(0),
  result: gameResultSchema.optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  timeRemaining: z.number(), // Calculated remaining time in seconds
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

// Live battles schema (in_progress games)
export const liveBattleSchema = z.object({
  _id: z.string(),
  host: userSchema,
  challenger: userSchema,
  problem: z.object({
    _id: z.string(),
    title: z.string(),
    difficulty: difficultySchema,
  }),
  status: gameStatusSchema,
  timeLimit: z.number(),
  difficulty: difficultySchema,
  startedAt: z.string().optional(),
  remainingSeconds: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type LiveBattle = z.infer<typeof liveBattleSchema>

// Open challenges schema (waiting games without challenger)
export const openChallengeSchema = z.object({
  _id: z.string(),
  host: userSchema,
  problem: z.object({
    _id: z.string(),
    title: z.string(),
    difficulty: difficultySchema,
  }).optional(),
  inviteCode: z.string(),
  status: gameStatusSchema,
  timeLimit: z.number(),
  difficulty: difficultySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type OpenChallenge = z.infer<typeof openChallengeSchema>