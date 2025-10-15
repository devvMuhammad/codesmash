import { createStore } from 'zustand/vanilla'
import { PlayerRolesType } from '@/lib/validations/game'

export interface GameState {
  // Core game data
  userRole: PlayerRolesType | null

  // Game state
  timeRemaining: number
  gameStatus: "waiting" | "in_progress" | "completed" | "cancelled"

  // Code state
  currentPlayerCode: string
  opponentCode: string

  // WebSocket state
  isConnected: boolean
  opponentConnected: boolean
}

export interface GameActions {
  // Connection actions
  setConnected: (connected: boolean) => void
  setOpponentConnected: (connected: boolean) => void
}

export type GameStore = GameState & GameActions

export const defaultInitState: GameState = {
  userRole: null,
  timeRemaining: 0,
  gameStatus: "waiting",
  currentPlayerCode: "",
  opponentCode: "",
  isConnected: false,
  opponentConnected: false,
}

export const createGameStore = (
  initState: GameState = defaultInitState,
) => {
  return createStore<GameStore>()((set) => ({
    ...initState,

    // Connection actions
    setConnected: (connected: boolean) =>
      set({ isConnected: connected }),

    setOpponentConnected: (connected: boolean) =>
      set({ opponentConnected: connected }),
  }))
}