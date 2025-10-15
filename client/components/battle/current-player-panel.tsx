"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Panel } from "react-resizable-panels"
import { useCallback, useContext } from "react"
import { MonacoEditor } from "./monaco-editor"
import { useGameStore } from "@/providers/game-store-provider"
import { GameStoreContext } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

interface CurrentPlayerPanelProps {
  collapsed: boolean
  initialCode: string
  onCodeUpdate?: (code: string) => void
}

export function CurrentPlayerPanel({ collapsed, initialCode, onCodeUpdate }: CurrentPlayerPanelProps) {
  const { currentPlayerCode, isConnected } = useGameStore(
    useShallow((state) => ({
      currentPlayerCode: state.currentPlayerCode,
      isConnected: state.isConnected,
    }))
  )
  const gameStoreApi = useContext(GameStoreContext)

  // on code change
  const handleCodeChange = useCallback((newCode: string) => {
    // Update store directly
    if (gameStoreApi) {
      gameStoreApi.setState((state) => ({ ...state, currentPlayerCode: newCode }))
    }

    // Emit to WebSocket via callback
    if (onCodeUpdate) {
      onCodeUpdate(newCode)
    }
  }, [gameStoreApi, onCodeUpdate])


  return (
    <Panel defaultSize={collapsed ? 100 : 50} minSize={30}>
      <div className="h-full flex flex-col">
        <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">You</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <Select defaultValue="javascript">
            <SelectTrigger size="sm" className="w-32 data-[size=sm]:h-7  text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-h-0">
          <MonacoEditor
            value={currentPlayerCode}
            onChange={handleCodeChange}
            language="javascript"
            readOnly={false}
            playerId="current"
          />
        </div>
      </div>
    </Panel>
  )
}
