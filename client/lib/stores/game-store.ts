import { createStore } from 'zustand/vanilla'
import { PlayerRolesType, User } from '@/lib/validations/game'

export interface GameState {
  // Core game data
  userRole: PlayerRolesType | null

  // Player data
  currentPlayerData: User | null
  opponentData: User | null

  // Game state
  timeRemaining: number
  gameStatus: "waiting" | "ready_to_start" | "in_progress" | "completed" | "cancelled"

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

  // Player data actions
  setCurrentPlayerData: (data: User | null) => void
  setOpponentData: (data: User | null) => void

  // Code actions
  setCurrentPlayerCode: (code: string) => void
  setOpponentCode: (code: string) => void

  // Game state actions
  setGameStatus: (status: "waiting" | "ready_to_start" | "in_progress" | "completed" | "cancelled") => void
}

export type GameStore = GameState & GameActions

export const defaultInitState: GameState = {
  userRole: null,
  currentPlayerData: null,
  opponentData: null,
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

    // Player data actions
    setCurrentPlayerData: (data: User | null) =>
      set({ currentPlayerData: data }),

    setOpponentData: (data: User | null) =>
      set({ opponentData: data }),

    // Code actions
    setCurrentPlayerCode: (code: string) =>
      set({ currentPlayerCode: code }),

    setOpponentCode: (code: string) =>
      set({ opponentCode: code }),

    // Game state actions
    setGameStatus: (status: "waiting" | "ready_to_start" | "in_progress" | "completed" | "cancelled") =>
      set({ gameStatus: status }),
  }))
}