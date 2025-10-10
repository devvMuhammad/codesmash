"use client"

import { useState } from "react"
import { BattleNavbar } from "@/components/battle/battle-navbar"
import { ConsolePanel } from "@/components/battle/console-panel"
import { CurrentPlayerPanel } from "@/components/battle/current-player-panel"
import { OpponentPanel } from "@/components/battle/opponent-panel"
import { ProblemDescription } from "@/components/battle/problem-description"
import { Panel, PanelGroup } from "react-resizable-panels"
import { DuelProvider } from "@/context/duel-context"

export default function DuelPage() {
  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [opponentEditorCollapsed, setOpponentEditorCollapsed] = useState(false)

  return (
    <DuelProvider duelId="demo-duel-123" playerId="player1">
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <BattleNavbar />
        <div className="flex-1 flex min-h-0">
          <PanelGroup direction="horizontal">
            <ProblemDescription
              collapsed={problemSidebarCollapsed}
              onCollapse={setProblemSidebarCollapsed}
            />
            <Panel>
              <PanelGroup direction="vertical">
                <Panel defaultSize={consoleCollapsed ? 100 : 70}>
                  <PanelGroup direction="horizontal">
                    <CurrentPlayerPanel collapsed={opponentEditorCollapsed} />
                    <OpponentPanel
                      collapsed={opponentEditorCollapsed}
                      onCollapse={setOpponentEditorCollapsed}
                    />
                  </PanelGroup>
                </Panel>
                <ConsolePanel
                  collapsed={consoleCollapsed}
                  onCollapse={setConsoleCollapsed}
                />
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </DuelProvider>

  )
}
