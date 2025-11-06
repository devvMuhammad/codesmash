"use client"

import { Trophy, Flag, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/providers/game-store-provider"
import { Session } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"

interface GameResultPanelProps {
  user: Session["user"] | null
}

export function GameResultPanel({ user }: GameResultPanelProps) {
  const gameResult = useGameStore((state) => state.gameResult)
  const currentPlayerData = useGameStore((state) => state.currentPlayerData)
  const opponentData = useGameStore((state) => state.opponentData)

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

  // Determine if current user won
  const currentUserId = user?.id
  const isWinner = gameResult.winner === currentUserId
  const isDraw = !gameResult.winner

  // Determine who won based on winner ID
  const currentPlayerWon = gameResult.winner === currentPlayerData?._id
  const opponentWon = gameResult.winner === opponentData?._id

  // Check if current user is a participant
  const isParticipant = currentUserId === currentPlayerData?._id

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

          {/* Player Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Player (Left Side) */}
            <div className={`p-4 rounded-lg border ${currentPlayerWon && !isDraw ? 'border-green-500 bg-green-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {currentPlayerData?.image ? (
                    <Image src={currentPlayerData.image} alt={currentPlayerData.name || "You"} width={40} height={40} className="h-10 w-10 rounded-full" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{currentPlayerData?.name || "You"}</p>
                  <p className="text-sm text-muted-foreground">
                    You
                  </p>
                </div>
                {currentPlayerWon && !isDraw && (
                  <Trophy className="h-5 w-5 text-green-400" />
                )}
              </div>
            </div>

            {/* Opponent (Right Side) */}
            <div className={`p-4 rounded-lg border ${opponentWon && !isDraw ? 'border-green-500 bg-green-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {opponentData?.image ? (
                    <Image src={opponentData.image} alt={opponentData.name || "Opponent"} width={40} height={40} className="h-10 w-10 rounded-full" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{opponentData?.name || "Opponent"}</p>
                  <p className="text-sm text-muted-foreground">
                    Opponent
                  </p>
                </div>
                {opponentWon && !isDraw && (
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