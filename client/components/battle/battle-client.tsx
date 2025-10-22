"use client"

import { useState } from "react"
import { BattleNavbar } from "@/components/battle/battle-navbar"
import { ConsolePanel } from "@/components/battle/console-panel"
import { CurrentPlayerPanel } from "@/components/battle/current-player-panel"
import { OpponentPanel } from "@/components/battle/opponent-panel"
import { ProblemDescription } from "@/components/battle/problem-description"
import { GameResultPanel } from "@/components/battle/game-result-panel"
import { Panel, PanelGroup } from "react-resizable-panels"
import { GameData, JoinGameResponse } from "@/lib/validations/game"
import { PreGameContent } from "@/components/battle/pre-game-content"
import DuplicateChallenger from "./duplicate-challenger"
import { Session } from "@/lib/auth-client"
import { useGameStore } from "@/providers/game-store-provider"

const initialCode = `function twoSum(nums, target) {
  // Your solution here
}`

interface BattleClientContentProps {
  gameData: GameData
  joinResult: JoinGameResponse
  user: Session["user"] | null
}

export function BattleClientContent({ gameData, joinResult, user }: BattleClientContentProps) {
  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [opponentEditorCollapsed, setOpponentEditorCollapsed] = useState(false)

  const gameStatus = useGameStore((state) => state.gameStatus);

  // Determine initial code based on user role
  const userInitialCode = joinResult.role === "host"
    ? (gameData.hostCode || gameData.problem?.functionSignature || initialCode)
    : (gameData.challengerCode || gameData.problem?.functionSignature || initialCode)

  const showDuplicateModal = joinResult.success === false && joinResult.role === 'spectator' && joinResult.message.includes('already joined as challenger')

  // Show game result panel if game is completed
  if (gameStatus === 'completed' || joinResult.message.includes('finished')) {
    console.log("showing game result panel", gameData)
    return (
      <>
        <div className="h-screen flex flex-col bg-background overflow-hidden">
          <DuplicateChallenger display={showDuplicateModal} />
          <BattleNavbar
            gameId={gameData._id}
            inviteCode={gameData.inviteCode}
          />
          <GameResultPanel user={user} gameData={gameData} />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <DuplicateChallenger display={showDuplicateModal} />
        <BattleNavbar
          gameId={gameData._id}
          inviteCode={gameData.inviteCode}
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
                  {gameStatus === 'waiting' || gameStatus === 'ready_to_start' ? (
                    <PreGameContent gameData={gameData} joinResult={joinResult} />
                  ) : (
                    <PanelGroup direction="horizontal">
                      <CurrentPlayerPanel
                        collapsed={opponentEditorCollapsed}
                        gameId={gameData._id}
                        initialCode={userInitialCode}
                      />
                      <OpponentPanel
                        collapsed={opponentEditorCollapsed}
                        onCollapse={setOpponentEditorCollapsed}
                      />
                    </PanelGroup>
                  )}
                </Panel>
                {gameStatus !== 'waiting' && gameStatus !== 'ready_to_start' && (
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
