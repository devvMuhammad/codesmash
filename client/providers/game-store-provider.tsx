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
}: GameStoreProviderProps) => {
  const storeRef = useRef<GameStoreApi | null>(null)

  if (storeRef.current === null) {
    /**
     * Current player data
     * if you are participant, then its you
     * if host, then current player data refers to the host
     */
    let currentPlayerData: User | null;
    if (userRole === "host") {
      currentPlayerData = gameData.host || null
    } else if (userRole === "challenger") {
      currentPlayerData = gameData.challenger || null
    } else {
      currentPlayerData = gameData.host
    }

    /**
     * Opponent data
     * if you are participant, then its your opponent, if host then game.challenger, if challener then game.host
     * if you are spectator, then its game.challenger
     */
    let opponentData: User | null;
    if (userRole === "host") {
      opponentData = gameData.challenger || null
    } else if (userRole === "challenger") {
      opponentData = gameData.host || null
    } else {
      opponentData = gameData.challenger || null
    }

    const initState: GameState = {
      ...defaultInitState,
      userRole,
      currentPlayerData,
      opponentData,
      gameStatus: gameData.status,
      timeRemaining: gameData.timeRemaining,
      currentPlayerCode: userRole === "host"
        ? gameData.hostCode || ""
        : gameData.challengerCode || "",
      opponentCode: userRole === "host"
        ? gameData.challengerCode || ""
        : gameData.hostCode || "",
      isConnected: userRole === "host" ? gameData.hostJoined : gameData.challengerJoined,
      opponentConnected: userRole === "host" ? gameData.challengerJoined : gameData.hostJoined,
      gameResult: gameData.result || null,
      problem: gameData.problem || null,
      hostTestsPassed: gameData.hostTestsPassed || 0,
      challengerTestsPassed: gameData.challengerTestsPassed || 0,
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