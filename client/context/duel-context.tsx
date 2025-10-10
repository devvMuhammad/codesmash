"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useDuelSession } from "@/hooks/use-duel-session"
import { useCodeSync } from "@/hooks/use-code-sync"

interface DuelContextType {
  duelSession: ReturnType<typeof useDuelSession>
  codeSync: ReturnType<typeof useCodeSync>
}

const DuelContext = createContext<DuelContextType | null>(null)

interface DuelProviderProps {
  children: ReactNode
  duelId: string
  playerId: string
}

export function DuelProvider({ children, duelId, playerId }: DuelProviderProps) {
  const duelSession = useDuelSession({ duelId, playerId })

  const codeSync = useCodeSync({
    duelId,
    playerId,
    onCodeChange: (playerId, code) => {
      console.log(`Player ${playerId} code updated:`, code.slice(0, 50) + "...")
    },
    onTypingStatusChange: (playerId, isTyping) => {
      console.log(`Player ${playerId} typing status:`, isTyping)
    },
  })

  return <DuelContext.Provider value={{ duelSession, codeSync }}>{children}</DuelContext.Provider>
}

export function useDuel() {
  const context = useContext(DuelContext)
  if (!context) {
    throw new Error("useDuel must be used within a DuelProvider")
  }
  return context
}
