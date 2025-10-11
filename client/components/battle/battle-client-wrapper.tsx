"use client"

import { useState, useEffect } from "react"
import { BattleNavbar } from "@/components/battle/battle-navbar"
import { ConsolePanel } from "@/components/battle/console-panel"
import { CurrentPlayerPanel } from "@/components/battle/current-player-panel"
import { OpponentPanel } from "@/components/battle/opponent-panel"
import { ProblemDescription } from "@/components/battle/problem-description"
import { Panel, PanelGroup } from "react-resizable-panels"
import { WebSocketProvider, useWebSocket } from "@/context/websocket-context"
import { GameData } from "@/lib/validations/game"

const initialCode = `function twoSum(nums, target) {
  // Your solution here
}`

interface BattleClientContentProps {
  gameData: GameData
}

function BattleClientContent({ gameData }: BattleClientContentProps) {
  const { connect, disconnect } = useWebSocket()
  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [opponentEditorCollapsed, setOpponentEditorCollapsed] = useState(false)

  useEffect(() => {
    connect(gameData._id)

    return () => {
      disconnect()
    }
  }, [gameData._id, connect, disconnect])

  return (
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
                  <CurrentPlayerPanel
                    collapsed={opponentEditorCollapsed}
                    initialCode={gameData.problem?.functionSignature || initialCode}
                  />
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
  )
}

interface BattleClientWrapperProps {
  gameData: GameData
}

export function BattleClientWrapper({ gameData }: BattleClientWrapperProps) {
  return (
    <WebSocketProvider>
      <BattleClientContent gameData={gameData} />
    </WebSocketProvider>
  )
}