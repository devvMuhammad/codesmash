"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, Settings, Play, Send } from "lucide-react"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserDropdown } from "../user-dropdown"
import { InviteDropdown } from "./invite-dropdown"
import { ForfeitGameDialog } from "./forfeit-game-dialog"
import { formatTime } from "@/lib/date-utils"
import { useSession } from "@/lib/auth-client"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

interface BattleNavbarProps {
  gameId?: string
  inviteCode?: string
}

export function BattleNavbar({ gameId, inviteCode }: BattleNavbarProps) {
  const { data: session, isPending: isLoading } = useSession()

  const {
    timeRemaining,
    gameStatus,
    currentPlayerCode,
    isConnected,
    opponentConnected,
    opponentName
  } = useGameStore(
    useShallow((state) => ({
      timeRemaining: state.timeRemaining,
      gameStatus: state.gameStatus,
      currentPlayerCode: state.currentPlayerCode,
      isConnected: state.isConnected,
      opponentConnected: state.opponentConnected,
      opponentName: state.opponentData?.name
    }))
  )

  const handleSubmit = () => {
    // Submit functionality would be handled through WebSocket context
    console.log("Submit code:", currentPlayerCode)
  }


  return (
    <nav className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left - Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-semibold text-lg">CodeSmash</span>
      </Link>

      {/* Center - Match Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-blue-400" />
          <span className="font-mono text-lg font-semibold text-blue-400">{formatTime(timeRemaining)}</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`${isConnected ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            You
          </Badge>
          <span className="text-muted-foreground font-medium">vs</span>
          <Badge variant="outline" className={`${opponentConnected ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {opponentName}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {gameId && inviteCode && (
          <InviteDropdown
            gameId={gameId}
            inviteCode={inviteCode}
          />
        )}
        <Button
          variant="outline"
          size="sm"
          className="bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20"
          onClick={handleSubmit}
          disabled={gameStatus !== "in_progress"}
        >
          <Send className="h-4 w-4 mr-2" />
          Submit
        </Button>
        <ThemeSwitcher />
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
        <ForfeitGameDialog
          disabled={gameStatus !== "in_progress"}
        />
        {isLoading ? (
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        ) : session?.user ? (
          <UserDropdown user={session.user} />
        ) : (
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
