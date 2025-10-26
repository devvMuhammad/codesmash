'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type GameStore,
  createGameStore,
  type GameState,
  defaultInitState,
} from '@/lib/stores/game-store'
import { GameData, PlayerRolesType, User } from '@/lib/validations/game'
import { Session } from '@/lib/auth-client'

export type GameStoreApi = ReturnType<typeof createGameStore>

export const GameStoreContext = createContext<GameStoreApi | undefined>(
  undefined,
)

export interface GameStoreProviderProps {
  children: ReactNode
  gameData: GameData
  userRole: PlayerRolesType
  user: Session["user"] | null
}

export const GameStoreProvider = ({
  children,
  gameData,
  userRole,
  user,
}: GameStoreProviderProps) => {
  const storeRef = useRef<GameStoreApi | null>(null)

  if (storeRef.current === null) {
    // Extract current player and opponent data
    const currentPlayerData: User | null = user ? {
      _id: user.id,
      name: user.name,
      email: user.email,
      image: user.image || undefined,
    } : null

    const opponentData: User | null =
      userRole === "host" ? gameData.challenger || null : gameData.host || null

    const initState: GameState = {
      ...defaultInitState,
      userRole,
      currentPlayerData,
      opponentData,
      gameStatus: gameData.status,
      timeRemaining: gameData.timeLimit * 60, // Convert minutes to seconds
      currentPlayerCode: userRole === "host"
        ? gameData.hostCode || ""
        : gameData.challengerCode || "",
      opponentCode: userRole === "host"
        ? gameData.challengerCode || ""
        : gameData.hostCode || "",
      isConnected: userRole === "host" ? gameData.hostJoined : gameData.challengerJoined,
      opponentConnected: userRole === "host" ? gameData.challengerJoined : gameData.hostJoined,
      gameResult: gameData.result || null,
    }

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