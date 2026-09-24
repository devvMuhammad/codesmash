import { getLeaderboard } from '@/lib/api/leaderboard'
import { queryOptions } from '@tanstack/react-query'

export const leaderboardOptions = queryOptions({
  queryKey: ['leaderboard'],
  queryFn: getLeaderboard,
})