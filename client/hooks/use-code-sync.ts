"use client"

import { useState, useCallback } from "react"
import { useWebSocket } from "./use-websocket"

const websocketBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/ws";
if (!websocketBaseUrl) {
  throw new Error("WEBSOCKET_BASE_URL environment variable is not set");
}

interface CodeSyncState {
  playerCode: { [playerId: string]: string }
  cursors: { [playerId: string]: { line: number; column: number } }
  typingStatus: { [playerId: string]: boolean }
}

interface UseCodeSyncOptions {
  duelId: string
  playerId: string
  onCodeChange?: (playerId: string, code: string) => void
  onCursorChange?: (playerId: string, position: { line: number; column: number }) => void
  onTypingStatusChange?: (playerId: string, isTyping: boolean) => void
}

export function useCodeSync({
  duelId,
  playerId,
  onCodeChange,
  onCursorChange,
  onTypingStatusChange,
}: UseCodeSyncOptions) {
  const [syncState, setSyncState] = useState<CodeSyncState>({
    playerCode: {},
    cursors: {},
    typingStatus: {},
  })

  const handleMessage = useCallback(
    (message: any) => {
      switch (message.type) {
        case "code_change":
          setSyncState((prev) => ({
            ...prev,
            playerCode: {
              ...prev.playerCode,
              [message.payload.playerId]: message.payload.code,
            },
          }))
          onCodeChange?.(message.payload.playerId, message.payload.code)
          break

        case "cursor_change":
          setSyncState((prev) => ({
            ...prev,
            cursors: {
              ...prev.cursors,
              [message.payload.playerId]: message.payload.position,
            },
          }))
          onCursorChange?.(message.payload.playerId, message.payload.position)
          break

        case "typing_status":
          setSyncState((prev) => ({
            ...prev,
            typingStatus: {
              ...prev.typingStatus,
              [message.payload.playerId]: message.payload.isTyping,
            },
          }))
          onTypingStatusChange?.(message.payload.playerId, message.payload.isTyping)
          break
      }
    },
    [onCodeChange, onCursorChange, onTypingStatusChange],
  )

  const { isConnected, sendMessage } = useWebSocket({
    url: `${websocketBaseUrl}/duel/${duelId}`,
    onMessage: handleMessage,
  })

  const syncCode = useCallback(
    (code: string) => {
      sendMessage("code_change", { playerId, code, duelId })
    },
    [sendMessage, playerId, duelId],
  )

  const syncCursor = useCallback(
    (position: { line: number; column: number }) => {
      sendMessage("cursor_change", { playerId, position, duelId })
    },
    [sendMessage, playerId, duelId],
  )

  const setTypingStatus = useCallback(
    (isTyping: boolean) => {
      sendMessage("typing_status", { playerId, isTyping, duelId })
    },
    [sendMessage, playerId, duelId],
  )

  return {
    isConnected,
    playerCode: syncState.playerCode,
    cursors: syncState.cursors,
    typingStatus: syncState.typingStatus,
    syncCode,
    syncCursor,
    setTypingStatus,
  }
}
