"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "@/context/websocket-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CopyButton } from "@/components/ui/copy-button"
import { Clock, Trophy } from "lucide-react"
import { GameData, JoinGameResponse } from "@/lib/validations/game"
import { useSession } from "@/lib/auth-client"
import { formatTimeLimit } from "@/lib/date-utils"
import { generateInviteLink, getUserInitials } from "@/lib/utils"

interface PreGameContentProps {
  gameData: GameData
  joinResult: JoinGameResponse | null
}

export function PreGameContent({ gameData, joinResult }: PreGameContentProps) {
  const { data: session } = useSession()
  const { socket } = useWebSocket()
  const [realtimeGameData, setRealtimeGameData] = useState(gameData)

  const currentUserId = session?.user?.id
  const userRole = joinResult?.role || (currentUserId === realtimeGameData.hostId ? 'host' : 'spectator')
  const hasChallenger = !!realtimeGameData.challengerId
  const isHostJoined = realtimeGameData.hostJoined
  const isChallengerJoined = realtimeGameData.challengerJoined

  const inviteLink = generateInviteLink(realtimeGameData.inviteCode, realtimeGameData._id)


  useEffect(() => {
    if (socket) {
      // Listen for player join events
      socket.on("player_joined", (data: { message: string; role: string; gameData: GameData }) => {
        setRealtimeGameData(data.gameData)
      })

      // Listen for player disconnect events
      socket.on("player_disconnected", (data: { message: string; gameData: GameData }) => {
        setRealtimeGameData(data.gameData)
      })

      // Send join notification when component mounts
      if (joinResult?.success) {
        socket.emit("player_join_notification", {
          gameId: gameData._id,
          role: userRole,
          message: joinResult.message
        })
      }
    }

    return () => {
      if (socket) {
        socket.off("player_joined")
        socket.off("player_disconnected")
      }
    }
  }, [socket, joinResult, userRole, gameData._id])

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-2">
        <p className="text-muted-foreground text-center">Joined as {userRole}</p>
        {/* Main Card */}
        <Card>
          <CardHeader className="text-center pb-4">
            {/* Game Settings */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Difficulty:</span>
                <Badge variant="outline" className="capitalize">
                  {realtimeGameData.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Limit:</span>
                <Badge variant="outline">
                  {formatTimeLimit(realtimeGameData.timeLimit)}
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
                    <AvatarImage src={realtimeGameData.host?.image || ""} alt="Host avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {getUserInitials(realtimeGameData.host?.name || session?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {realtimeGameData.host?.name || session?.user?.name || "Host"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Host</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isHostJoined ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className={`text-xs font-medium ${isHostJoined ? 'text-green-600' : 'text-yellow-600'}`}>
                    {isHostJoined ? 'Joined' : 'Connecting...'}
                  </span>
                </div>
              </div>

              {/* Challenger Side */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="size-20">
                    <AvatarImage src={realtimeGameData.challenger?.image || ""} alt="Challenger avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {hasChallenger ? getUserInitials(realtimeGameData.challenger?.name) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {hasChallenger ? (realtimeGameData.challenger?.name || "Challenger") : "Not joined"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Challenger</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${hasChallenger && isChallengerJoined ? 'bg-green-500' :
                    hasChallenger ? 'bg-yellow-500' :
                      'bg-muted-foreground/30'
                    }`} />
                  <span className={`text-xs font-medium ${hasChallenger && isChallengerJoined ? 'text-green-600' :
                    hasChallenger ? 'text-yellow-600' :
                      'text-muted-foreground'
                    }`}>
                    {hasChallenger && isChallengerJoined ? 'Joined' :
                      hasChallenger ? 'Connecting...' :
                        'Waiting...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button for Host when both players have joined */}
            {currentUserId === realtimeGameData.hostId && hasChallenger && isHostJoined && isChallengerJoined && (
              <div className="flex justify-center mt-8">
                <Button size="lg" className="px-8">
                  <Trophy className="h-4 w-4 mr-2" />
                  Start Battle
                </Button>
              </div>
            )}

            {/* Status Message for Challenger */}
            {currentUserId === realtimeGameData.challengerId && (
              <div className="text-center mt-6">
                <Badge variant="secondary">
                  {isHostJoined && isChallengerJoined ? 'Waiting for host to start' : 'Waiting for all players to join'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invite Button */}
        <div className="flex justify-center">
          <CopyButton
            textToCopy={inviteLink}
            className="px-8 mt-2"
          >
            Copy Invite Link
          </CopyButton>
        </div>
      </div>
    </div>
  )
}