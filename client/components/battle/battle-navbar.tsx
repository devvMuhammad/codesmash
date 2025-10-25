"use client"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { InviteDropdown } from "./invite-dropdown"
import { ForfeitGameDialog } from "./forfeit-game-dialog"
import { UserProfile } from "./user-profile"
import { MatchInfo } from "./match-info"
import { SubmitCode } from "./submit-code"

interface BattleNavbarProps {
  gameId?: string
  inviteCode?: string
}

export function BattleNavbar({ gameId, inviteCode }: BattleNavbarProps) {
  return (
    <nav className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left - Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-semibold text-lg">CodeSmash</span>
      </Link>

      {/* Center - Match Info */}
      <MatchInfo />

      <div className="flex items-center gap-2">
        {gameId && inviteCode && (
          <InviteDropdown
            gameId={gameId}
            inviteCode={inviteCode}
          />
        )}
        <SubmitCode />
        <ThemeSwitcher />
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
        <ForfeitGameDialog />
        <UserProfile />
      </div>
    </nav>
  )
}
