"use client"

import { createContext, useContext, useRef, useEffect, useCallback, type ReactNode } from "react"
import { io, type Socket } from "socket.io-client"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/lib/config"
import { Session } from "@/lib/auth-client"
import { PlayerRolesType } from "@/lib/validations/game"
import { useGameStore } from "@/providers/game-store-provider"
import { toast } from "sonner"

interface GameWebSocketContextType {
  // functions for emitting websocket events
  sendCodeUpdate: (code: string) => void
  sendRunCode: (code: string) => void
  sendSubmitCode: (code: string) => void
  forfeitAsChallenger: () => void
  forfeitAsHost: () => void
  forfeitGame: () => void
  challengerQuit: () => void
  startBattle: () => void
  markChallengerReady: () => void

  // Raw socket
  socket: Socket | null
}

const GameWebSocketContext = createContext<GameWebSocketContextType | null>(null)

interface GameWebSocketProviderProps {
  children: ReactNode
  gameId: string
  userRole: PlayerRolesType
  user: Session["user"] | null
}

export function GameWebSocketProvider({
  children,
  gameId,
  userRole,
  user
}: GameWebSocketProviderProps) {
  const socketRef = useRef<Socket | null>(null)
  const router = useRouter()

  // Game store actions
  const setConnected = useGameStore((state) => state.setConnected)
  const setOpponentConnected = useGameStore((state) => state.setOpponentConnected)
  const setOpponentData = useGameStore((state) => state.setOpponentData)
  const setGameStatus = useGameStore((state) => state.setGameStatus)
  const setOpponentCode = useGameStore((state) => state.setOpponentCode)
  const setGameResult = useGameStore((state) => state.setGameResult)

  // Socket connection initialization
  useEffect(() => {
    if (!gameId || !userRole) return

    const socket = io(API_BASE_URL, {
      auth: {
        gameId,
        role: userRole,
        user,
      }
    })

    socketRef.current = socket

    // Connection event handlers
    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id)
      setConnected(true)
    })

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected")
      setConnected(false)
    })

    // Game event handlers
    socket.on("player_joined", (data: { role: PlayerRolesType, user: Session['user'] }) => {
      console.log("Player joined:", data)

      // Update opponent connected state and data if it's not the current user
      if (data.role !== userRole) {
        console.log("setting state hahah")
        setOpponentConnected(true)
        setOpponentData({
          _id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image || undefined,
        })
      }

      toast.success(`${data.user.name} has joined the game!`, {
        description: "Get Ready to Battle!",
        duration: 1000,
      })
    })

    socket.on("player_disconnected", (data: { role: PlayerRolesType, user: Session['user'] }) => {
      console.log("Player disconnected:", data)

      // Update opponent connected state if it's not the current user
      if (data.role !== userRole) {
        setOpponentConnected(false)
      }

      toast.error(`${data.user.name} has left the game!`, {
        description: "Waiting for them to reconnect...",
        duration: 500,
      })
    })

    socket.on("challenger_quit", (data: { user: Session['user'] }) => {
      console.log("Challenger quit:", data)

      // Update game state - challenger is no longer in the game
      setOpponentConnected(false)
      setOpponentData(null)

      toast.info(`${data.user.name} has left the game`, {
        description: `${data.user.name} has quit. Waiting for someone else to join...`,
        duration: 3000,
      })
    })

    socket.on("battle_started", (data: { user: Session['user'] }) => {
      console.log("Battle started:", data)

      // Update game status to ready_to_start
      setGameStatus("ready_to_start")

      if (userRole === "challenger") {
        toast.success(`${data.user.name} has started the battle!`, {
          description: "Mark yourself as ready when you're prepared to begin.",
          duration: 4000,
        })
      }
    })

    socket.on("game_in_progress", (data: { user: Session['user'] }) => {
      console.log("Game in progress:", data.user.name)

      // Update game status to in_progress
      setGameStatus("in_progress")

      toast.success("Battle has begun!", {
        description: "Good luck! May the best coder win.",
        duration: 3000,
      })
    })

    // Code synchronization events
    socket.on("opponent_code_update", (data: { code: string, role: PlayerRolesType }) => {
      console.log("Opponent code update:", data.role)

      // Only update if it's not from the current user
      if (data.role !== userRole) {
        setOpponentCode(data.code)
      }
    })

    // Game end events
    socket.on("game_finished", (data: { result: { reason: "completed" | "forfeit" | "time_up", winner: string, message: string }, gameStatus: string }) => {
      console.log("Game finished:", data)

      // Update game status to completed
      setGameStatus("completed")

      // Store the game result
      setGameResult(data.result)

      // Show result notification
      toast.info("Game Finished", {
        description: data.result.message,
        duration: 5000,
      })
    })

    // Cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [gameId, userRole, user, setConnected, setOpponentConnected, setOpponentData, setGameStatus, setOpponentCode, setGameResult])

  // Named emit functions
  const sendCodeUpdate = useCallback((code: string) => {
    socketRef.current?.emit("code_update", { code })
  }, [])

  const sendRunCode = useCallback((code: string) => {
    socketRef.current?.emit("run_code", { code })
  }, [])

  const sendSubmitCode = useCallback((code: string) => {
    socketRef.current?.emit("submit_code", { code })
  }, [])

  const forfeitAsChallenger = useCallback(() => {
    if (userRole === "challenger") {
      socketRef.current?.emit("quit")
    }
  }, [userRole])

  const forfeitAsHost = useCallback(() => {
    if (userRole === "host") {
      socketRef.current?.emit("quit")
    }
  }, [userRole])

  const forfeitGame = useCallback(() => {
    if (userRole === "host" || userRole === "challenger") {
      socketRef.current?.emit("forfeit_game")
    }
  }, [userRole])

  const challengerQuit = useCallback(() => {
    if (userRole === "challenger") {
      socketRef.current?.emit("challenger_quit")
      // Redirect to lobby after quitting
      router.push("/lobby")
    }
  }, [userRole, router])

  const startBattle = useCallback(() => {
    if (userRole === "host") {
      socketRef.current?.emit("start_battle")
    }
  }, [userRole])

  const markChallengerReady = useCallback(() => {
    if (userRole === "challenger") {
      socketRef.current?.emit("challenger_ready")
    }
  }, [userRole])

  const contextValue: GameWebSocketContextType = {
    sendCodeUpdate,
    sendRunCode,
    sendSubmitCode,
    forfeitAsChallenger,
    forfeitAsHost,
    forfeitGame,
    challengerQuit,
    startBattle,
    markChallengerReady,
    socket: socketRef.current,
  }

  return (
    <GameWebSocketContext.Provider value={contextValue}>
      {children}
    </GameWebSocketContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameWebSocketContext)
  if (!context) {
    throw new Error("useGame must be used within GameWebSocketProvider")
  }
  return context
}