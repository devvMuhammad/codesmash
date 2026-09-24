import { z } from "zod"

export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  memberSince: z.string(),
  aura: z.number(),
})

export type UserProfileInfo = z.infer<typeof userProfileSchema>

export const profileStatsSchema = z.object({
  globalRank: z.number(),
  aura: z.number(),
  winRate: z.number(),
  totalBattles: z.number(),
  totalHoursPlayed: z.number(),
  wins: z.number(),
  losses: z.number(),
  draws: z.number(),
})

export type ProfileStats = z.infer<typeof profileStatsSchema>

export const difficultyStatsSchema = z.object({
  wins: z.number(),
  losses: z.number(),
  draws: z.number(),
  games: z.number(),
})

export type DifficultyStats = z.infer<typeof difficultyStatsSchema>

export const difficultyBreakdownSchema = z.object({
  easy: difficultyStatsSchema,
  medium: difficultyStatsSchema,
  hard: difficultyStatsSchema,
})

export type DifficultyBreakdown = z.infer<typeof difficultyBreakdownSchema>

export const recentBattleSchema = z.object({
  id: z.string(),
  opponent: z.object({
    name: z.string(),
    username: z.string(),
  }),
  problem: z.object({
    title: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
  }),
  result: z.enum(["win", "loss", "draw"]),
  timeAgo: z.string(),
  completedAt: z.string(), // e.g., "2h ago", "1d ago"
  duration: z.string(), // e.g., "8m 32s"
  timeLimit: z.number(), // in minutes
})

export type RecentBattle = z.infer<typeof recentBattleSchema>

export const userProfileDataSchema = z.object({
  user: userProfileSchema,
  stats: profileStatsSchema,
  difficulty: difficultyBreakdownSchema,
  recentBattles: z.array(recentBattleSchema),
})

export type UserProfileData = z.infer<typeof userProfileDataSchema>

