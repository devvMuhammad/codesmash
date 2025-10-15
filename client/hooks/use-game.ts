import { useRef, useCallback, useEffect } from "react"
import { PlayerRolesType } from "@/lib/validations/game"
import { Session } from "@/lib/auth-client"
import { io, Socket } from "socket.io-client"
import { API_BASE_URL } from "@/lib/config"
import { toast } from "sonner"
import { useGameStore } from "@/providers/game-store-provider"

interface UseGameProps {
  gameId: string
  userRole: PlayerRolesType
  user: Session["user"] | null
}

export function useGame({ gameId, userRole, user }: UseGameProps) {
  const socketRef = useRef<Socket | null>(null)
  const setConnected = useGameStore((state) => state.setConnected)
  const setOpponentConnected = useGameStore((state) => state.setOpponentConnected)

  useEffect(() => {
    if (!gameId || !userRole) return

    const socket = io(API_BASE_URL, {
      auth: {
        gameId,
        role: userRole,
        user,
      }
    })

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);
      setConnected(true);
    })
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    })

    socket.on("player_joined", (data: { role: PlayerRolesType, user: Session['user'] }) => {
      console.log("Player joined:", data);

      // Update opponent connected state if it's not the current user
      if (data.role !== userRole) {
        setOpponentConnected(true);
      }

      toast.success(`${data.user.name} has joined the game!`, {
        description: "Get Ready to Battle!"
      })
    })

    socket.on("player_disconnected", (data: { role: PlayerRolesType, user: Session['user'] }) => {
      console.log("Player disconnected:", data);

      // Update opponent connected state if it's not the current user
      if (data.role !== userRole) {
        setOpponentConnected(false);
      }

      toast.error(`${data.user.name} has left the game!`, {
        description: "Waiting for them to reconnect..."
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [gameId, userRole, user, setConnected, setOpponentConnected])


  // Emit functions that components can use
  const emitCodeUpdate = useCallback((code: string) => {
    socketRef.current?.emit("code_update", { code })
  }, [])

  const emitRunCode = useCallback((code: string) => {
    socketRef.current?.emit("run_code", { code })
  }, [])

  const emitSubmitCode = useCallback((code: string) => {
    socketRef.current?.emit("submit_code", { code })
  }, [])

  const emitForfeit = useCallback(() => {
    socketRef.current?.emit("forfeit")
  }, [])

  return {
    emitCodeUpdate,
    emitRunCode,
    emitSubmitCode,
    emitForfeit,
  }
}