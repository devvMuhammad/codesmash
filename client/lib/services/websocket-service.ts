import { io, type Socket } from "socket.io-client"
import { API_BASE_URL } from "@/lib/config"
import { PlayerRolesType } from "@/lib/validations/game"
import { Session } from "@/lib/auth-client"
import { createGameStore, type GameStore } from "@/lib/stores/game-store"
import { toast } from "sonner"

class WebSocketService {
  private static instance: WebSocketService | null = null
  private socket: Socket | null = null
  private gameStore: ReturnType<typeof createGameStore> | null = null
  private currentUserRole: PlayerRolesType | null = null
  private currentUserId: string | null = null

  private constructor() { }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  connect(gameId: string, userRole: PlayerRolesType, user: Session["user"] | null): void {
    if (this.socket?.connected) {
      return
    }

    this.currentUserRole = userRole
    this.currentUserId = user?.id || null

    this.socket = io(API_BASE_URL, {
      auth: {
        gameId,
        role: userRole,
        user,
      }
    })

    this.setupEventListeners()
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.currentUserRole = null
    this.currentUserId = null
  }

  // Emit functions for components to use
  emitCodeUpdate(code: string): void {
    if (this.socket?.connected) {
      this.socket.emit("code_update", { code })
    }
  }

  emitRunCode(code: string): void {
    if (this.socket?.connected) {
      this.socket.emit("run_code", { code })
    }
  }

  emitSubmitCode(code: string): void {
    if (this.socket?.connected) {
      this.socket.emit("submit_code", { code })
    }
  }

  emitForfeit(): void {
    if (this.socket?.connected) {
      this.socket.emit("forfeit_game")
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return

    // Connection events
    this.socket.on("connect", this.handleConnect.bind(this))
    this.socket.on("disconnect", this.handleDisconnect.bind(this))

    // Game events
    this.socket.on("player_joined", this.handlePlayerJoined.bind(this))
    this.socket.on("player_left", this.handlePlayerLeft.bind(this))
    this.socket.on("code_update", this.handleCodeUpdate.bind(this))
    this.socket.on("game_status_update", this.handleGameStatusUpdate.bind(this))
    this.socket.on("timer_update", this.handleTimerUpdate.bind(this))
    this.socket.on("opponent_connected", this.handleOpponentConnected.bind(this))
    this.socket.on("opponent_disconnected", this.handleOpponentDisconnected.bind(this))
  }

  private handleConnect(): void {
    console.log("WebSocket connected:", this.socket?.id)
    this.updateStore({ isConnected: true })
  }

  private handleDisconnect(): void {
    console.log("WebSocket disconnected")
    this.updateStore({
      isConnected: false,
      opponentConnected: false
    })
  }

  private handlePlayerJoined(data: { role: PlayerRolesType, user: Session["user"] }): void {
    console.log('Player joined:', data)

    // Update connection status based on role
    if (data.role === this.currentUserRole) {
      this.updateStore({ isConnected: true })
    } else {
      this.updateStore({ opponentConnected: true })
      toast.success(`${data.user.name} has joined the game!`, {
        description: "Get Ready to Battle!"
      })
    }
  }

  private handlePlayerLeft(data: { role: PlayerRolesType }): void {
    console.log('Player left:', data)

    // Update connection status based on role
    if (data.role === this.currentUserRole) {
      this.updateStore({ isConnected: false })
    } else {
      this.updateStore({ opponentConnected: false })
      toast.error("Opponent has left the game", {
        description: "Waiting for them to reconnect..."
      })
    }
  }

  private handleCodeUpdate(data: { role: PlayerRolesType, code: string, userId: string }): void {
    // Only update opponent's code
    if (data.userId !== this.currentUserId) {
      this.updateStore({ opponentCode: data.code })
    }
  }

  private handleGameStatusUpdate(data: { status: "waiting" | "in_progress" | "completed" | "cancelled" }): void {
    this.updateStore({ gameStatus: data.status })

    if (data.status === "in_progress") {
      toast.success("Game started!", {
        description: "Good luck!"
      })
    } else if (data.status === "completed") {
      toast.info("Game completed!", {
        description: "Check the results!"
      })
    }
  }

  private handleTimerUpdate(data: { timeRemaining: number }): void {
    this.updateStore({ timeRemaining: data.timeRemaining })
  }

  private handleOpponentConnected(): void {
    this.updateStore({ opponentConnected: true })
  }

  private handleOpponentDisconnected(): void {
    this.updateStore({ opponentConnected: false })
  }

  private updateStore(updates: Partial<GameStore>): void {
    if (this.gameStore) {
      this.gameStore.setState((state) => ({ ...state, ...updates }))
    }
  }
}

export default WebSocketService