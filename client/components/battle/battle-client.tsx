"use client"

import { useState } from "react"
import { BattleNavbar } from "@/components/battle/battle-navbar"
import { ConsolePanel } from "@/components/battle/console-panel"
import { CurrentPlayerPanel } from "@/components/battle/current-player-panel"
import { OpponentPanel } from "@/components/battle/opponent-panel"
import { ProblemDescription } from "@/components/battle/problem-description"
import { Panel, PanelGroup } from "react-resizable-panels"
import { GameData, JoinGameResponse } from "@/lib/validations/game"
import { PreGameContent } from "@/components/battle/pre-game-content"
import DuplicateChallenger from "./duplicate-challenger"
import { Session } from "@/lib/auth-client"
import { GameStoreProvider } from "@/providers/game-store-provider"
import { useGameStore } from "@/providers/game-store-provider"
import { useGame } from "@/hooks/use-game"

const initialCode = `function twoSum(nums, target) {
  // Your solution here
}`

interface BattleClientContentProps {
  gameData: GameData
  joinResult: JoinGameResponse
  user: Session["user"] | null
}

// Inner component that uses the game store
function BattleClientInner({ gameData, joinResult, user }: BattleClientContentProps) {
  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [opponentEditorCollapsed, setOpponentEditorCollapsed] = useState(false)

  const gameStatus = useGameStore((state) => state.gameStatus)

  // Initialize WebSocket connection and get emit functions
  const gameActions = useGame({
    gameId: gameData._id,
    userRole: joinResult.role,
    user: user,
  })

  const showDuplicateModal = joinResult.success === false && joinResult.role === 'spectator' && joinResult.message.includes('already joined as challenger')

  return (
    <>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <DuplicateChallenger display={showDuplicateModal} />
        <BattleNavbar
          onRunCode={gameActions.emitRunCode}
          onSubmitCode={gameActions.emitSubmitCode}
          onForfeit={gameActions.emitForfeit}
        />
        <div className="flex-1 flex min-h-0">
          <PanelGroup direction="horizontal">
            <ProblemDescription
              collapsed={problemSidebarCollapsed}
              onCollapse={setProblemSidebarCollapsed}
            />
            <Panel>
              <PanelGroup direction="vertical">
                <Panel defaultSize={consoleCollapsed ? 100 : 70}>
                  {gameStatus === 'waiting' ? (
                    <PreGameContent gameData={gameData} joinResult={joinResult} />
                  ) : (
                    <PanelGroup direction="horizontal">
                      <CurrentPlayerPanel
                        collapsed={opponentEditorCollapsed}
                        initialCode={gameData.problem?.functionSignature || initialCode}
                        onCodeUpdate={gameActions.emitCodeUpdate}
                      />
                      <OpponentPanel
                        collapsed={opponentEditorCollapsed}
                        onCollapse={setOpponentEditorCollapsed}
                      />
                    </PanelGroup>
                  )}
                </Panel>
                {gameStatus !== 'waiting' && (
                  <ConsolePanel
                    collapsed={consoleCollapsed}
                    onCollapse={setConsoleCollapsed}
                  />
                )}
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </>
  )
}

// Main export component that wraps with the store provider
export function BattleClientContent({ gameData, joinResult, user }: BattleClientContentProps) {
  return (
    <GameStoreProvider
      gameData={gameData}
      userRole={joinResult.role}
      user={user}
    >
      <BattleClientInner gameData={gameData} joinResult={joinResult} user={user} />
    </GameStoreProvider>
  )
}
