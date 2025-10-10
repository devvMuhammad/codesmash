"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface WebSocketMessage {
  type: string
  payload: any
  timestamp: number
}

interface UseWebSocketOptions {
  url: string
  onMessage?: (message: WebSocketMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
  reconnectAttempts?: number
  reconnectInterval?: number
}

export function useWebSocket({
  url,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
  reconnectAttempts = 5,
  reconnectInterval = 3000,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected",
  )
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCountRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setConnectionStatus("connecting")

    try {
      // For demo purposes, we'll simulate WebSocket connection
      wsRef.current = new WebSocket(url)

      // Simulate connection delay
      setTimeout(() => {
        setIsConnected(true)
        setConnectionStatus("connected")
        reconnectCountRef.current = 0
        onConnect?.()
      }, 1000)
    } catch (error) {
      setConnectionStatus("error")
      onError?.(error as Event)

      // Attempt reconnection
      if (reconnectCountRef.current < reconnectAttempts) {
        reconnectCountRef.current++
        reconnectTimeoutRef.current = setTimeout(connect, reconnectInterval)
      }
    }
  }, [url, onConnect, onError, reconnectAttempts, reconnectInterval])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setIsConnected(false)
    setConnectionStatus("disconnected")
    onDisconnect?.()
  }, [onDisconnect])

  const sendMessage = useCallback(
    (type: string, payload: any) => {
      if (!isConnected) {
        console.warn("WebSocket not connected, message not sent:", { type, payload })
        return false
      }

      const message: WebSocketMessage = {
        type,
        payload,
        timestamp: Date.now(),
      }

      // In production: wsRef.current?.send(JSON.stringify(message))
      // For demo, we'll simulate message echo
      setTimeout(() => {
        onMessage?.(message)
      }, 100)

      return true
    },
    [isConnected, onMessage],
  )

  useEffect(() => {
    connect()
    return disconnect
  }, [connect, disconnect])

  return {
    isConnected,
    connectionStatus,
    sendMessage,
    connect,
    disconnect,
  }
}
