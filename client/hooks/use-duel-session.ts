"use client"

import { useState, useCallback, useEffect } from "react"
import { useWebSocket } from "./use-websocket"

const websocketBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/ws";
if (!websocketBaseUrl) {
  throw new Error("WEBSOCKET_BASE_URL environment variable is not set");
}

interface DuelState {
  id: string
  status: "waiting" | "in-progress" | "completed" | "cancelled"
  players: {
    id: string
    name: string
    status: "connected" | "disconnected" | "typing"
  }[]
  problem: {
    id: string
    title: string
    difficulty: "easy" | "medium" | "hard"
    description: string
  }
  timeRemaining: number
  results?: {
    [playerId: string]: {
      code: string
      testsPassed: number
      totalTests: number
      submissionTime: number
    }
  }
}

interface UseDuelSessionOptions {
  duelId: string
  playerId: string
  onStateChange?: (state: DuelState) => void
}

export function useDuelSession({ duelId, playerId, onStateChange }: UseDuelSessionOptions) {
  const [duelState, setDuelState] = useState<DuelState>({
    id: duelId,
    status: "waiting",
    players: [
      { id: "player1", name: "You", status: "connected" },
      { id: "player2", name: "Opponent", status: "connected" },
    ],
    problem: {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "easy",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    },
    timeRemaining: 900, // 15 minutes
  })

  const handleMessage = useCallback(
    (message: any) => {
      switch (message.type) {
        case "duel_state_update":
          setDuelState(message.payload)
          onStateChange?.(message.payload)
          break

        case "player_status_update":
          setDuelState((prev) => ({
            ...prev,
            players: prev.players.map((player) =>
              player.id === message.payload.playerId ? { ...player, status: message.payload.status } : player,
            ),
          }))
          break

        case "timer_update":
          setDuelState((prev) => ({
            ...prev,
            timeRemaining: message.payload.timeRemaining,
          }))
          break

        case "submission_result":
          setDuelState((prev) => ({
            ...prev,
            results: {
              ...prev.results,
              [message.payload.playerId]: message.payload.result,
            },
          }))
          break
      }
    },
    [onStateChange],
  )

  const { isConnected, sendMessage } = useWebSocket({
    url: `${websocketBaseUrl}/duel/${duelId}`,
    onMessage: handleMessage,
  })

  const submitCode = useCallback(
    (code: string) => {
      sendMessage("submit_code", { playerId, code, duelId })
    },
    [sendMessage, playerId, duelId],
  )

  const runCode = useCallback(
    (code: string) => {
      sendMessage("run_code", { playerId, code, duelId })
    },
    [sendMessage, playerId, duelId],
  )

  const forfeit = useCallback(() => {
    sendMessage("forfeit", { playerId, duelId })
  }, [sendMessage, playerId, duelId])

  const joinDuel = useCallback(() => {
    sendMessage("join_duel", { playerId, duelId })
  }, [sendMessage, playerId, duelId])

  // Start timer simulation
  useEffect(() => {
    if (duelState.status === "in-progress" && duelState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setDuelState((prev) => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [duelState.status, duelState.timeRemaining])

  // Auto-join duel on mount
  useEffect(() => {
    if (isConnected) {
      joinDuel()
      // Start the duel after a short delay (simulate matchmaking)
      setTimeout(() => {
        setDuelState((prev) => ({ ...prev, status: "in-progress" }))
      }, 2000)
    }
  }, [isConnected, joinDuel])

  return {
    duelState,
    isConnected,
    submitCode,
    runCode,
    forfeit,
    joinDuel,
  }
}
