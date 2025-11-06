"use client"

import { useGameStore } from "@/providers/game-store-provider"
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
import { useGame } from "@/context/game-websocket-context"

interface PreGameContentProps {
  gameData: GameData
  joinResult: JoinGameResponse | null
}

export function PreGameContent({ gameData, joinResult }: PreGameContentProps) {
  const { data: session } = useSession()
  const { challengerQuit, startBattle, markChallengerReady } = useGame()

  // Listen to connection states and player data from Zustand store
  const isConnected = useGameStore((state) => state.isConnected)
  const opponentConnected = useGameStore((state) => state.opponentConnected)
  const currentPlayerData = useGameStore((state) => state.currentPlayerData)
  const opponentData = useGameStore((state) => state.opponentData)
  const gameStatus = useGameStore((state) => state.gameStatus)

  const currentUserId = session?.user?.id
  const isHost = currentUserId === gameData.hostId
  const isChallenger = currentUserId === gameData.challengerId

  const userRole = joinResult?.role || (currentUserId === gameData.hostId ? 'host' : 'spectator')

  // connections
  const isHostJoined = userRole === 'host' ? isConnected : opponentConnected
  const isChallengerJoined = userRole === 'challenger' ? isConnected : opponentConnected

  // condition variables
  const bothPlayersJoined = isHostJoined && isChallengerJoined
  const canHostStartGame = currentUserId === gameData.hostId && bothPlayersJoined && gameStatus === 'waiting'
  const canChallengerMarkReady = currentUserId === gameData.challengerId && gameStatus === 'ready_to_start'

  const inviteLink = generateInviteLink(gameData.inviteCode, gameData._id)


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
                  {gameData.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Limit:</span>
                <Badge variant="outline">
                  {formatTimeLimit(gameData.timeLimit)}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Status Messages */}
            {isChallenger && (
              <div className="text-center mb-6">
                <Badge variant="secondary">
                  {gameStatus === 'waiting'
                    ? (bothPlayersJoined ? 'Waiting for host to start' : 'Waiting for all players to join')
                    : gameStatus === 'ready_to_start'
                    ? 'Host has started the battle - Mark yourself as ready!'
                    : 'Game in progress'
                  }
                </Badge>
              </div>
            )}

            {isHost && gameStatus === 'ready_to_start' && (
              <div className="text-center mb-6">
                <Badge variant="secondary">
                  Waiting for challenger to get ready...
                </Badge>
              </div>
            )}

            {/* Players Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Host Side */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="size-20">
                    <AvatarImage src={
                      userRole === "host"
                        ? (currentPlayerData?.image || "")
                        : (opponentData?.image || "")
                    } alt="Host avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {getUserInitials(
                        userRole === "host"
                          ? (currentPlayerData?.name || session?.user?.name)
                          : (opponentData?.name)
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {userRole === "host"
                        ? (currentPlayerData?.name || session?.user?.name || "Host")
                        : (opponentData?.name || "Host")}
                    </h3>
                    <p className="text-sm text-muted-foreground">Host</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isHostJoined ? 'bg-green-500' : 'bg-destructive'}`} />
                  <span className={`text-xs font-medium ${isHostJoined ? 'text-green-600' : 'text-destructive'}`}>
                    {isHostJoined ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>

              {/* Challenger Side */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="size-20">
                    <AvatarImage src={
                      userRole === "challenger"
                        ? (currentPlayerData?.image || "")
                        : (opponentData?.image || "")
                    } alt="Challenger avatar" />
                    <AvatarFallback className="text-lg font-semibold">
                      {userRole === "challenger"
                        ? getUserInitials(currentPlayerData?.name)
                        : (getUserInitials(opponentData?.name) || "?")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {userRole === "challenger"
                        ? (currentPlayerData?.name || "Challenger")
                        : opponentData?.name || "Challenger"}
                    </h3>
                    <p className="text-sm text-muted-foreground">Challenger</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isChallengerJoined ? 'bg-green-500' : 'bg-destructive'}`} />
                  <span className={`text-xs font-medium ${isChallengerJoined ? 'text-green-600' : 'text-destructive'}`}>
                    {isChallengerJoined ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button for Host when both players have joined */}
            {canHostStartGame && (
              <div className="flex justify-center mt-8">
                <Button size="lg" className="px-8" onClick={startBattle}>
                  <Trophy className="h-4 w-4 mr-2" />
                  Start Battle
                </Button>
              </div>
            )}

            {/* Ready Button for Challenger when host has started */}
            {canChallengerMarkReady && (
              <div className="flex justify-center mt-8">
                <Button size="lg" className="px-8" onClick={markChallengerReady}>
                  <Trophy className="h-4 w-4 mr-2" />
                  Mark Yourself as Ready
                </Button>
              </div>
            )}

            {/* Leave Game Button for Challenger */}
            {isChallenger && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="destructive"
                  size="lg"
                  className="px-8"
                  onClick={challengerQuit}
                >
                  Leave Game
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invite Button */}
        {isHost && <div className="flex justify-center">
          <CopyButton
            textToCopy={inviteLink}
            className="px-8 mt-2"
          >
            Copy Invite Link
          </CopyButton>
        </div>}
      </div>
    </div>
  )
}