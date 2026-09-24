import { CommonNavbar } from "@/components/common-navbar"
import { type UserChallenge } from "@/lib/api/games"
import { UserChallenges } from "@/components/user/user-challenges"
import { getSessionServerSide } from "@/lib/api/user"
import { API_BASE_URL } from "@/lib/config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Challenges",
  description: "View and manage all the coding challenges you've created on CodeSmash.",
}

async function getUserChallengesServer(userId: string): Promise<UserChallenge[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/challenges`, {
      cache: 'no-store', // Ensure fresh data on each request
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user challenges: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user challenges:', error)
    return []
  }
}

export default async function UserChallengesPage() {
  const session = await getSessionServerSide()

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <CommonNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Please sign in to view your challenges</h1>
          </div>
        </div>
      </div>
    )
  }

  const challenges = await getUserChallengesServer(session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Challenges</h1>
          <p className="text-muted-foreground">
            View and manage all the coding challenges you&apos;ve created
          </p>
        </div>

        <UserChallenges challenges={challenges} />
      </div>
    </div>
  )
}