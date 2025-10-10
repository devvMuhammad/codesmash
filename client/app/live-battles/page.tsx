"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { CommonNavbar } from "@/components/common-navbar"
import { MatchmakingDialog } from "@/components/lobby/matchmaking-dialog"
import { LiveBattles } from "@/components/lobby/live-battles"

export default function LiveBattlesPage() {
  const [isMatchmaking, setIsMatchmaking] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Live Battles</h1>
            <p className="text-muted-foreground">Watch ongoing coding battles in real-time</p>
          </div>
          <Button size="lg" className="glow-blue" onClick={() => setIsMatchmaking(true)}>
            <Zap className="h-4 w-4 mr-2" />
            Matchmake Now
          </Button>
        </div>

        <LiveBattles />
      </div>

      <MatchmakingDialog open={isMatchmaking} onOpenChange={setIsMatchmaking} />
    </div>
  )
}
