"use client"

import { Panel, PanelResizeHandle } from "react-resizable-panels"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useGameStore } from "@/providers/game-store-provider"
import { TestProgressBar } from "../shared/test-progress-bar"
import { useShallow } from "zustand/react/shallow"
import { OpponentStatus } from "./opponent-status"

interface OpponentPanelProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function OpponentPanel({ collapsed, onCollapse }: OpponentPanelProps) {
  const { isConnected, opponentCode, hostTestsPassed, challengerTestsPassed, problem, userRole } = useGameStore(
    useShallow((state) => ({
      isConnected: state.opponentConnected,
      opponentCode: state.opponentCode,
      hostTestsPassed: state.hostTestsPassed,
      challengerTestsPassed: state.challengerTestsPassed,
      problem: state.problem,
      userRole: state.userRole
    }))
  )

  const opponentTestsPassed = userRole === 'host' ? challengerTestsPassed : hostTestsPassed
  const totalTests = problem?.totalTestCases || 0

  if (collapsed) {
    return (
      <div className="w-12 border-l border-border/40 bg-muted/10 flex flex-col items-center justify-start pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(false)}
          className="h-8 w-8 p-0 hover:bg-muted mb-2"
          title="Show Opponent Editor"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap mt-4">
          Opponent
        </div>
      </div>
    )
  }

  return (
    <>
      <PanelResizeHandle className="w-1 bg-border/40 hover:bg-border transition-colors" />
      <Panel defaultSize={50} minSize={30}>
        <div className="h-full flex flex-col">
          <TestProgressBar
            passed={opponentTestsPassed}
            total={totalTests}
            variant="opponent"
          />
          <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
            <OpponentStatus isConnected={isConnected} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCollapse(true)}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

          </div>
          <div className="flex-1 min-h-0 relative">
            <textarea
              value={opponentCode}
              readOnly
              className="w-full h-full p-4 bg-background font-mono text-sm resize-none border-none outline-none filter blur-xs"
              style={{
                fontFamily: 'Monaco, "Lucida Console", monospace',
                lineHeight: '1.5',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />

          </div>
        </div>
      </Panel>
    </>
  )
}
