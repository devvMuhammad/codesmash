import { z } from "zod"

export const difficultySchema = z.enum(["easy", "medium", "hard"])

export const createGameSchema = z.object({
  difficulty: difficultySchema,
  timeLimit: z.number().min(15).max(120), // 15 minutes to 2 hours
  expiresIn: z.number().min(15).max(1440), // 15 minutes to 1 day in minutes
})

export type CreateGameFormData = z.infer<typeof createGameSchema>

export const createGameResponseSchema = z.object({
  gameId: z.string(),
  inviteLink: z.string(),
  inviteCode: z.string(),
})

export type CreateGameResponse = z.infer<typeof createGameResponseSchema>