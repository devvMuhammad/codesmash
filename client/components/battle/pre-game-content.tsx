"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "@/context/websocket-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Clock, Trophy, CheckCircle } from "lucide-react"
import { GameData, JoinGameResponse } from "@/lib/validations/game"
import { useSession } from "@/lib/auth-client"
import { formatTimeLimit } from "@/lib/date-utils"
import { generateInviteLink } from "@/lib/utils"

interface PreGameContentProps {
  gameData: GameData
  joinResult: JoinGameResponse | null
}

export function PreGameContent({ gameData, joinResult }: PreGameContentProps) {
  const { data: session } = useSession()
  const { socket } = useWebSocket()
  const [copied, setCopied] = useState(false)
  const [realtimeGameData, setRealtimeGameData] = useState(gameData)

  const currentUserId = session?.user?.id
  const userRole = joinResult?.role || (currentUserId === realtimeGameData.hostId ? 'host' : 'spectator')
  const hasChallenger = !!realtimeGameData.challengerId

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

  const copyInviteLink = async () => {
    const inviteLink = generateInviteLink(realtimeGameData.inviteCode, realtimeGameData._id)
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get user initials for avatar fallback
  const getUserInitials = (name: string | undefined) => {
    if (!name) return "?"
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
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
                    <AvatarImage src="" alt="Host avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {getUserInitials(session?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {session?.user?.name || "Host"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Host</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600 font-medium">Joined</span>
                </div>
              </div>

              {/* Challenger Side */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="size-20">
                    <AvatarImage src="" alt="Challenger avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {hasChallenger ? "C" : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {hasChallenger ? "Challenger" : "Not joined"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Challenger</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${hasChallenger ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                  <span className={`text-xs font-medium ${hasChallenger ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {hasChallenger ? 'Joined' : 'Waiting...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button for Host when challenger joined */}
            {currentUserId === realtimeGameData.hostId && hasChallenger && (
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
                <Badge variant="secondary">Waiting for host to start</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invite Button */}
        <div className="flex justify-center">
          <Button
            onClick={copyInviteLink}
            variant={copied ? "outline" : "default"}
            size="lg"
            className="px-8"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Invite Link
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}