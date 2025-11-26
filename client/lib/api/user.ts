"use server";
import { cache } from "react";
import { getSession, Session } from "@/lib/auth-client"
import { headers } from "next/headers";
import { API_BASE_URL } from "@/lib/config";
import { leaderboardSchema, type Leaderboard } from "@/lib/validations/user";

export const getSessionServerSide = cache(async (): Promise<Session | null> => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return session.data;
});

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
