import { z } from "zod"

export const leaderboardPlayerSchema = z.object({
  _id: z.string(),
  username: z.string(),
  name: z.string(),
  image: z.string(),
  aura: z.number().default(1000),
})

export type LeaderboardPlayer = z.infer<typeof leaderboardPlayerSchema>

export const leaderboardSchema = z.array(leaderboardPlayerSchema)

export type Leaderboard = z.infer<typeof leaderboardSchema>
