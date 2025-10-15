'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type GameStore,
  createGameStore,
  type GameState,
  defaultInitState,
} from '@/lib/stores/game-store'
import { GameData, PlayerRolesType } from '@/lib/validations/game'
import { Session } from '@/lib/auth-client'

export type GameStoreApi = ReturnType<typeof createGameStore>

export const GameStoreContext = createContext<GameStoreApi | undefined>(
  undefined,
)

export interface GameStoreProviderProps {
  children: ReactNode
  gameData?: GameData
  userRole?: PlayerRolesType
  user?: Session["user"] | null
}

export const GameStoreProvider = ({
  children,
  gameData,
  userRole,
  user,
}: GameStoreProviderProps) => {
  const storeRef = useRef<GameStoreApi | null>(null)

  if (storeRef.current === null) {
    // Initialize with game data if provided
    const initialCode = gameData?.problem?.functionSignature || `function twoSum(nums, target) {
  // Your solution here
}`

    const initState: GameState = gameData && userRole ? {
      ...defaultInitState,
      userRole,
      gameStatus: gameData.status,
      timeRemaining: gameData.timeLimit * 60, // Convert minutes to seconds
      currentPlayerCode: userRole === "host"
        ? gameData.hostCode || initialCode
        : gameData.challengerCode || initialCode,
      opponentCode: userRole === "host"
        ? gameData.challengerCode || initialCode
        : gameData.hostCode || initialCode,
      isConnected: userRole === "host" ? gameData.hostJoined : gameData.challengerJoined,
      opponentConnected: userRole === "host" ? gameData.challengerJoined : gameData.hostJoined,
    } : defaultInitState

    storeRef.current = createGameStore(initState)
  }

  return (
    <GameStoreContext.Provider value={storeRef.current}>
      {children}
    </GameStoreContext.Provider>
  )
}

export const useGameStore = <T,>(
  selector: (store: GameStore) => T,
): T => {
  const gameStoreContext = useContext(GameStoreContext)

  if (!gameStoreContext) {
    throw new Error(`useGameStore must be used within GameStoreProvider`)
  }

  return useStore(gameStoreContext, selector)
}