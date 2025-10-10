"use client"

import { CommonNavbar } from "@/components/common-navbar"
import { Matchmake } from "@/components/lobby/matchmake"
import { CreateChallenge } from "@/components/lobby/create-challenge"
import { LiveBattles } from "@/components/lobby/live-battles"

export default function LobbyPage() {

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Live Battles</h1>
            <p className="text-muted-foreground">Watch ongoing battles and join the action</p>
          </div>
          <div className="flex items-center space-x-3">
            <Matchmake />
            <CreateChallenge />
          </div>
        </div>

        <LiveBattles />
      </div>

    </div>
  )
}
