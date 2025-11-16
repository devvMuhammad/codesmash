"use client"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { InviteDropdown } from "../dialogs/invite-dropdown"
import { ForfeitGameDialog } from "../dialogs/forfeit-game-dialog"
import { UserProfile } from "../shared/user-profile"
import { MatchInfo } from "./match-info"
import { RunCode } from "../controls/run-code"
import { SubmitCode } from "../controls/submit-code"
import { BattleTimer } from "./battle-timer"

interface BattleNavbarProps {
  gameId?: string
  inviteCode?: string
}

export function BattleNavbar({ gameId, inviteCode }: BattleNavbarProps) {
  return (
    <nav className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <BattleTimer />


      {/* Center - Match Info */}
      <MatchInfo />

      <div className="flex items-center gap-2">
        {gameId && inviteCode && (
          <InviteDropdown
            gameId={gameId}
            inviteCode={inviteCode}
          />
        )}
        <RunCode />
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
