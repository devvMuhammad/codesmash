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
  const selectedLanguage = useGameStore((state) => state.selectedLanguage)
  const problem = useGameStore((state) => state.problem)
  const { sendCodeUpdate } = useGame()

  // Throttled WebSocket update (max once per second)
  const throttledSendCode = useRef(
    throttle((code: string) => {
      sendCodeUpdate(code)
    }, 1000)
  ).current

  // Initialize code from localStorage on mount and when language changes
  useEffect(() => {
    if (!problem) return

    // Get initial code for the current language from problem data
    const initialCode = problem.initialCodes[selectedLanguage as keyof typeof problem.initialCodes] || ""

    // Try to load saved code from localStorage for this language
    const savedCode = CodeLocalStorage.loadCode(gameId, selectedLanguage, initialCode)

    // Only update if code is different to prevent unnecessary re-renders
    if (savedCode !== currentPlayerCode) {
      setCurrentPlayerCode(savedCode)
    }
  }, [gameId, selectedLanguage, problem, currentPlayerCode, setCurrentPlayerCode])

  const handleCodeChange = useCallback((newCode: string) => {
    // Immediate localStorage save with language
    CodeLocalStorage.saveCode(gameId, selectedLanguage, newCode)

    // Update store
    setCurrentPlayerCode(newCode)

    // Throttled WebSocket update
    throttledSendCode(newCode)
  }, [gameId, selectedLanguage, setCurrentPlayerCode, throttledSendCode])

  return (
    <div className="flex-1 relative h-full">
      <MonacoEditor
        value={currentPlayerCode}
        onChange={handleCodeChange}
        language={selectedLanguage}
        readOnly={false}
        playerId="current"
      />
    </div>
  )
}
