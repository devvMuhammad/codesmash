"use client"

import { Panel } from "react-resizable-panels"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGameStore } from "@/providers/game-store-provider"
import { TestProgressBar } from "../shared/test-progress-bar"
import { useShallow } from "zustand/react/shallow"
import { getUserInitials } from "@/lib/utils"

interface SpectatorCodePanelProps {
  role: "host" | "challenger"
}

export function SpectatorCodePanel({ role }: SpectatorCodePanelProps) {
  const {
    playerData,
    code,
    isConnected,
    testsPassed,
    totalTests
  } = useGameStore(
    useShallow((state) => ({
      playerData: role === 'host' ? state.currentPlayerData : state.opponentData,
      code: role === 'host' ? state.currentPlayerCode : state.opponentCode,
      isConnected: role === 'host' ? state.isConnected : state.opponentConnected,
      testsPassed: role === 'host' ? state.hostTestsPassed : state.challengerTestsPassed,
      totalTests: state.problem?.totalTestCases || 0
    }))
  )

  const playerName = playerData?.name || (role === 'host' ? 'Host' : 'Challenger')
  const variant = role === 'host' ? 'self' : 'opponent'

  return (
    <Panel defaultSize={50} minSize={30}>
      <div className="h-full flex flex-col">
        {/* Test Progress Bar */}
        <TestProgressBar
          passed={testsPassed}
          total={totalTests}
          variant={variant}
        />

        {/* Player Header */}
        <div className="h-12 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
          <div className="flex items-center gap-3">
            <Avatar className="size-7">
              <AvatarImage src={playerData?.image || ""} alt={`${playerName} avatar`} />
              <AvatarFallback className="text-xs">
                {getUserInitials(playerData?.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{playerName}</span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Code Display (no blur) */}
        <div className="flex-1 min-h-0 relative overflow-hidden">
          <textarea
            value={code}
            readOnly
            className="w-full h-full p-4 bg-background font-mono text-sm resize-none border-none outline-none"
            style={{
              fontFamily: 'Monaco, "Lucida Console", monospace',
              lineHeight: '1.5',
            }}
          />
        </div>
      </div>
    </Panel>
  )
}
