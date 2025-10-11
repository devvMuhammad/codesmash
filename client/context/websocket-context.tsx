"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import { io, type Socket } from "socket.io-client"
import { API_BASE_URL } from "@/lib/config"

interface WebSocketContextType {
  socket: Socket | null
  connect: (gameId: string) => void
  disconnect: () => void
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const socketRef = useRef<Socket | null>(null)

  const connect = (gameId: string) => {
    if (socketRef.current?.connected) {
      return
    }

    if (socketRef.current) {
      socketRef.current.disconnect()
    }

    const newSocket = io(API_BASE_URL, {
      auth: {
        gameId: gameId
      }
    })

    newSocket.on("connect", () => {
      console.log("WebSocket connected:", newSocket.id)
    })

    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected")
    })

    socketRef.current = newSocket
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
  }

  return (
    <WebSocketContext.Provider
      value={{
        socket: socketRef.current,
        connect,
        disconnect
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}