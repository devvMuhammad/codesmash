"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { User, Wifi, WifiOff } from "lucide-react"
import { MonacoEditor } from "./monaco-editor"
import { useDuel } from "@/context/duel-context"

interface CodeEditorProps {
  playerId: string
  playerName: string
  status: "connected" | "disconnected" | "typing"
}

export function CodeEditor({ playerId, playerName, status }: CodeEditorProps) {
  const { codeSync } = useDuel()
  const [code, setCode] = useState(() => {
    if (playerId === "player1") {
      return `function twoSum(nums, target) {
    // Your solution here
    
}`
    } else {
      return `function twoSum(nums, target) {
    // Opponent's solution
    
}`
    }
  })

  const statusConfig = {
    connected: { icon: Wifi, color: "bg-green-500", text: "Connected" },
    disconnected: { icon: WifiOff, color: "bg-red-500", text: "Disconnected" },
    typing: { icon: User, color: "bg-blue-500", text: "Typing..." },
  }

  const StatusIcon = statusConfig[status].icon

  // Sync code changes with other players
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode)
      codeSync.syncCode(newCode)
      codeSync.setTypingStatus(true)

      // Stop typing indicator after 1 second of inactivity
      const timer = setTimeout(() => {
        codeSync.setTypingStatus(false)
      }, 1000)

      return () => clearTimeout(timer)
    },
    [codeSync],
  )

  // Update code from other players
  useEffect(() => {
    const otherPlayerCode = codeSync.playerCode[playerId]
    if (otherPlayerCode && otherPlayerCode !== code && playerId === "player2") {
      setCode(otherPlayerCode)
    }
  }, [codeSync.playerCode, playerId, code])

  // Update status based on typing
  const currentStatus = codeSync.typingStatus[playerId] ? "typing" : status

  return (
    <Card className="h-full rounded-none border-0 flex flex-col">
      {/* Player Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/40 bg-card/50">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{playerName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${statusConfig[currentStatus].color}`} />
          <StatusIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{statusConfig[currentStatus].text}</span>
        </div>
      </div>

      {/* Editor Area - Monaco Editor */}
      <div className="flex-1 relative min-h-0">
        {/* Subtle blur overlay for opponent code */}
        {playerId === "player2" && (
          <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 z-10 pointer-events-none" />
        )}
        <MonacoEditor
          value={code}
          onChange={handleCodeChange}
          language="javascript"
          readOnly={playerId === "player2"}
          playerId={playerId}
        />
      </div>
    </Card>
  )
}
