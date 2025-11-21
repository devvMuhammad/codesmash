import { UserProfileData, userProfileDataSchema } from "@/lib/validations/profile"

/**
 * Mock function to fetch user profile data
 * In production, this would make an API call to the server
 */
export async function getUserProfile(profileId: string): Promise<UserProfileData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock data with realistic values
  const mockData: UserProfileData = {
    user: {
      id: profileId,
      name: "Alex Johnson",
      username: "alexcodes",
      avatar: undefined, // Will use default avatar
      memberSince: "October 2024",
      currentStreak: 12,
    },
    stats: {
      globalRank: 1234,
      rankPercentile: 15, // Top 15%
      winRate: 67.5,
      totalBattles: 156,
      totalHoursPlayed: 12.5,
      wins: 105,
      losses: 48,
      draws: 3,
      bestWinStreak: 8,
      worstLossStreak: 5,
    },
    difficulty: {
      easy: {
        wins: 45,
        losses: 12,
        games: 57,
      },
      medium: {
        wins: 38,
        losses: 22,
        games: 60,
      },
      hard: {
        wins: 22,
        losses: 14,
        games: 36,
      },
    },
    recentBattles: [
      {
        id: "1",
        opponent: { name: "Alice Chen", username: "alice" },
        problem: { title: "Two Sum", difficulty: "easy" },
        result: "win",
        timeAgo: "2h",
        completedAt: "2 hours ago",
        duration: "4m 23s",
        timeLimit: 15,
      },
      {
        id: "2",
        opponent: { name: "Bob Smith", username: "bob" },
        problem: { title: "Trapping Rain Water", difficulty: "hard" },
        result: "loss",
        timeAgo: "5h",
        completedAt: "5 hours ago",
        duration: "14m 52s",
        timeLimit: 30,
      },
      {
        id: "3",
        opponent: { name: "Charlie Davis", username: "charlie" },
        problem: { title: "Longest Substring", difficulty: "medium" },
        result: "win",
        timeAgo: "1d",
        completedAt: "1 day ago",
        duration: "8m 15s",
        timeLimit: 20,
      },
      {
        id: "4",
        opponent: { name: "Diana Lee", username: "diana" },
        problem: { title: "Binary Search", difficulty: "easy" },
        result: "win",
        timeAgo: "1d",
        completedAt: "1 day ago",
        duration: "3m 47s",
        timeLimit: 15,
      },
      {
        id: "5",
        opponent: { name: "Ethan Brown", username: "ethan" },
        problem: { title: "Merge Intervals", difficulty: "medium" },
        result: "draw",
        timeAgo: "2d",
        completedAt: "2 days ago",
        duration: "19m 58s",
        timeLimit: 20,
      },
      {
        id: "6",
        opponent: { name: "Fiona Wilson", username: "fiona" },
        problem: { title: "Valid Parentheses", difficulty: "easy" },
        result: "win",
        timeAgo: "2d",
        completedAt: "2 days ago",
        duration: "5m 12s",
        timeLimit: 15,
      },
      {
        id: "7",
        opponent: { name: "George Taylor", username: "george" },
        problem: { title: "LRU Cache", difficulty: "hard" },
        result: "loss",
        timeAgo: "3d",
        completedAt: "3 days ago",
        duration: "28m 34s",
        timeLimit: 30,
      },
      {
        id: "8",
        opponent: { name: "Hannah Martinez", username: "hannah" },
        problem: { title: "Reverse Linked List", difficulty: "easy" },
        result: "win",
        timeAgo: "3d",
        completedAt: "3 days ago",
        duration: "6m 08s",
        timeLimit: 15,
      },
      {
        id: "9",
        opponent: { name: "Ian Anderson", username: "ian" },
        problem: { title: "Word Break", difficulty: "medium" },
        result: "win",
        timeAgo: "4d",
        completedAt: "4 days ago",
        duration: "11m 29s",
        timeLimit: 20,
      },
      {
        id: "10",
        opponent: { name: "Julia Thomas", username: "julia" },
        problem: { title: "Climbing Stairs", difficulty: "easy" },
        result: "win",
        timeAgo: "4d",
        completedAt: "4 days ago",
        duration: "7m 41s",
        timeLimit: 15,
      },
    ],
    problemStats: {
      totalAttempted: 47,
      solved: 38,
      unsolved: 9,
      bestProblem: {
        title: "Two Sum",
        record: "5W-0L",
      },
      nemesis: {
        title: "Trapping Rain Water",
        record: "0W-3L",
      },
    },
  }

  // Validate the mock data with Zod schema
  return userProfileDataSchema.parse(mockData)
}

