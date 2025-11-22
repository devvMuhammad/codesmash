"use client"

import { useGameStore } from "@/providers/game-store-provider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Trophy } from "lucide-react"
import { GameData } from "@/lib/validations/game"
import { formatTimeLimit } from "@/lib/date-utils"
import { getUserInitials, getDifficultyStyles, getTimeLimitStyles } from "@/lib/utils"
import { useShallow } from "zustand/react/shallow"

interface SpectatorPreGameContentProps {
  gameData: GameData
}

export function SpectatorPreGameContent({ gameData }: SpectatorPreGameContentProps) {
  const {
    currentPlayerData,
    opponentData,
    isConnected,
    opponentConnected,
  } = useGameStore(
    useShallow((state) => ({
      currentPlayerData: state.currentPlayerData,
      opponentData: state.opponentData,
      isConnected: state.isConnected,
      opponentConnected: state.opponentConnected,
    }))
  )

  // For spectators: currentPlayerData = host, opponentData = challenger
  const hostData = currentPlayerData
  const challengerData = opponentData
  const isHostConnected = isConnected
  const isChallengerConnected = opponentConnected

  // Get game settings from gameData
  const difficulty = gameData.difficulty
  const timeLimit = gameData.timeLimit

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-4">
        <p className="text-center text-base">
          Joined as <span className="text-purple-400 font-semibold">spectator</span>
        </p>

        <Card>
          <CardHeader className="text-center pb-4">
            {/* Game Settings */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Difficulty:</span>
                <Badge variant="outline" className={`capitalize ${getDifficultyStyles(difficulty)}`}>
                  {difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Limit:</span>
                <Badge variant="outline" className={getTimeLimitStyles(timeLimit)}>
                  {formatTimeLimit(timeLimit)}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Players Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Host Side */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="size-20">
                    <AvatarImage src={hostData?.image || ""} alt="Host avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {getUserInitials(hostData?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {hostData?.name || "Host"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Host</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isHostConnected ? 'bg-green-500' : 'bg-destructive'}`} />
                  <span className={`text-xs font-medium ${isHostConnected ? 'text-green-600' : 'text-destructive'}`}>
                    {isHostConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>

              {/* Challenger Side */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="size-20">
                    <AvatarImage src={challengerData?.image || ""} alt="Challenger avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {getUserInitials(challengerData?.name) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {challengerData?.name || "Waiting..."}
                    </h3>
                    <p className="text-sm text-muted-foreground">Challenger</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isChallengerConnected ? 'bg-green-500' : 'bg-destructive'}`} />
                  <span className={`text-xs font-medium ${isChallengerConnected ? 'text-green-600' : 'text-destructive'}`}>
                    {isChallengerConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
