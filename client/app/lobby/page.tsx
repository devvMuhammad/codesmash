import { CommonNavbar } from "@/components/common-navbar"
import { Matchmake } from "@/components/lobby/matchmake"
import { CreateChallenge } from "@/components/lobby/create-challenge"
import { LiveBattles } from "@/components/lobby/live-battles"
import { OpenChallenges } from "@/components/lobby/open-challenges"
import { getLiveBattles, getOpenChallenges } from "@/lib/api/games"
import type { Metadata } from "next"
import { getSessionServerSide } from "@/lib/api/user"

export const metadata: Metadata = {
  title: "Lobby",
  description: "Join battles, create challenges, or find your next opponent",
}

export default async function LobbyPage() {

  const userId = (await getSessionServerSide())?.user.id
  const [liveBattles, openChallenges] = await Promise.all([
    getLiveBattles(),
    getOpenChallenges(userId),
  ])

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Lobby</h1>
            <p className="text-muted-foreground">Join battles, create challenges, or find your next opponent</p>
          </div>
          <div className="flex items-center space-x-3">
            <Matchmake />
            <CreateChallenge />
          </div>
        </div>
        {/* Live Battles Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Live Battles</h2>
            <p className="text-muted-foreground">Watch ongoing battles and see them in action</p>
          </div>
          <LiveBattles battles={liveBattles} />
        </div>
        {/* Open Challenges Section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Open Challenges</h2>
            <p className="text-muted-foreground">Accept a challenge from other players</p>
          </div>
          <OpenChallenges challenges={openChallenges} />
        </div>
      </div>

    </div>
  )
}
