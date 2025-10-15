"use client"

import { useCallback, useContext } from "react"
import { MonacoEditor } from "./monaco-editor"
import { useGameStore } from "@/providers/game-store-provider"
import { GameStoreContext } from "@/providers/game-store-provider"

interface CurrentPlayerEditorProps {
  playerName: string
  onCodeUpdate?: (code: string) => void
}

export function CurrentPlayerEditor({ playerName, onCodeUpdate }: CurrentPlayerEditorProps) {
  const currentPlayerCode = useGameStore((state) => state.currentPlayerCode)
  const gameStoreApi = useContext(GameStoreContext)

  const handleCodeChange = useCallback((newCode: string) => {
    // Update store directly
    if (gameStoreApi) {
      gameStoreApi.setState((state) => ({ ...state, currentPlayerCode: newCode }))
    }

    // Emit to WebSocket via callback
    if (onCodeUpdate) {
      onCodeUpdate(newCode)
    }
  }, [gameStoreApi, onCodeUpdate])

  return (
    <div className="flex-1 relative h-full">
      <MonacoEditor
        value={currentPlayerCode}
        onChange={handleCodeChange}
        language="javascript"
        readOnly={false}
        playerId="current"
      />
    </div>
  )
}
