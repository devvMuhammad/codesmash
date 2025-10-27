"use client"

import { useCallback, useRef, useEffect } from "react"
import throttle from 'lodash.throttle'
import { MonacoEditor } from "./monaco-editor"
import { useGameStore } from "@/providers/game-store-provider"
import { useGame } from "@/context/game-websocket-context"
import { CodeLocalStorage } from "@/lib/services/localStorage"

interface CurrentPlayerEditorProps {
  gameId: string
}

export function CurrentPlayerEditor({ gameId }: CurrentPlayerEditorProps) {
  const currentPlayerCode = useGameStore((state) => state.currentPlayerCode)
  const setCurrentPlayerCode = useGameStore((state) => state.setCurrentPlayerCode)
  const { sendCodeUpdate } = useGame()

  // Throttled WebSocket update (max once per second)
  const throttledSendCode = useRef(
    throttle((code: string) => {
      sendCodeUpdate(code)
    }, 1000)
  ).current

  // Initialize code from localStorage on mount
  useEffect(() => {
    const savedCode = CodeLocalStorage.loadCode(gameId, "")
    // initially, player code is prefilled form server, if it is same as what is in local storage then we can prevent one useless re-render
    if (savedCode !== currentPlayerCode) {
      setCurrentPlayerCode(savedCode)
    }
  }, [gameId, currentPlayerCode, setCurrentPlayerCode])

  const handleCodeChange = useCallback((newCode: string) => {
    // Immediate localStorage save
    CodeLocalStorage.saveCode(gameId, newCode)

    // Update store
    setCurrentPlayerCode(newCode)

    // Throttled WebSocket update
    throttledSendCode(newCode)
  }, [gameId, setCurrentPlayerCode, throttledSendCode])

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
