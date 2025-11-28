import { API_BASE_URL } from "../config";
import { Leaderboard, leaderboardSchema } from "../validations/user";

export async function getLeaderboard(): Promise<Leaderboard> {
  const response = await fetch(`${API_BASE_URL}/api/users/leaderboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Always get fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  const data = await response.json();
  return leaderboardSchema.parse(data);
}