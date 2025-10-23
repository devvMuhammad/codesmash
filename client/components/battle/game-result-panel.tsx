"use client"

import { Trophy, Flag, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/providers/game-store-provider"
import { Session } from "@/lib/auth-client"
import { GameData } from "@/lib/validations/game"
import Link from "next/link"

interface GameResultPanelProps {
  user: Session["user"] | null
  gameData: GameData
}

export function GameResultPanel({ user, gameData }: GameResultPanelProps) {
  const gameResult = useGameStore((state) => state.gameResult)
  const userRole = useGameStore((state) => state.userRole)

  if (!gameResult) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">Game result not available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get host and challenger data from gameData
  const hostData = gameData.host
  const challengerData = gameData.challenger

  // Determine if current user won
  const currentUserId = user?.id
  const isWinner = gameResult.winner === currentUserId
  const isDraw = !gameResult.winner

  // Determine who won based on winner ID
  const hostWon = gameResult.winner === hostData?._id
  const challengerWon = gameResult.winner === challengerData?._id

  // Check if current user is a participant
  const isHost = currentUserId === hostData?._id
  const isChallenger = currentUserId === challengerData?._id
  const isParticipant = isHost || isChallenger

  // Get result icon and color based on reason
  const getResultIcon = () => {
    switch (gameResult.reason) {
      case 'forfeit':
        return <Flag className="h-8 w-8" />
      case 'time_up':
        return <Clock className="h-8 w-8" />
      case 'completed':
        return <Trophy className="h-8 w-8" />
      default:
        return <Trophy className="h-8 w-8" />
    }
  }

  const getResultColor = () => {
    if (isDraw) return "text-muted-foreground"
    if (isWinner) return "text-green-400"
    return "text-red-400"
  }

  const getResultTitle = () => {
    if (isDraw) return "Game Draw"
    if (!isParticipant) return "Game Result"
    if (isWinner) return "Victory!"
    return "Defeat"
  }

  const getResultBadgeVariant = () => {
    if (isDraw) return "secondary"
    if (isWinner) return "default"
    return "destructive"
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-background p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-6">
          <div className={`mx-auto mb-4 ${getResultColor()}`}>
            {getResultIcon()}
          </div>
          <CardTitle className="text-3xl font-bold">{getResultTitle()}</CardTitle>
          <Badge variant={getResultBadgeVariant()} className="mx-auto mt-2">
            {gameResult.reason === 'forfeit' && 'Game Forfeited'}
            {gameResult.reason === 'time_up' && 'Time\'s Up'}
            {gameResult.reason === 'completed' && 'Game Completed'}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Result Message */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground">{gameResult.message}</p>
          </div>

          {/* Player Summary - Host vs Challenger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Host (Left Side) */}
            <div className={`p-4 rounded-lg border ${hostWon && !isDraw ? 'border-green-500 bg-green-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {hostData?.image ? (
                    <img src={hostData.image} alt={hostData.name || "Host"} className="h-10 w-10 rounded-full" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{hostData?.name || "Host"}</p>
                  <p className="text-sm text-muted-foreground">
                    Host
                  </p>
                </div>
                {hostWon && !isDraw && (
                  <Trophy className="h-5 w-5 text-green-400" />
                )}
              </div>
            </div>

            {/* Challenger (Right Side) */}
            <div className={`p-4 rounded-lg border ${challengerWon && !isDraw ? 'border-green-500 bg-green-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {challengerData?.image ? (
                    <img src={challengerData.image} alt={challengerData.name || "Challenger"} className="h-10 w-10 rounded-full" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{challengerData?.name || "Challenger"}</p>
                  <p className="text-sm text-muted-foreground">
                    Challenger
                  </p>
                </div>
                {challengerWon && !isDraw && (
                  <Trophy className="h-5 w-5 text-green-400" />
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-3 pt-4">
            <Button asChild>
              <Link href="/lobby">Back to Lobby</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}