"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Panel } from "react-resizable-panels"
import { useCallback, useEffect, useState } from "react"
import { MonacoEditor } from "./monaco-editor"
import { useWebSocket } from "@/context/websocket-context"
import { useSession } from "@/lib/auth-client"


interface CurrentPlayerPanelProps {
  collapsed: boolean
  initialCode: string
}


export function CurrentPlayerPanel({ collapsed, initialCode }: CurrentPlayerPanelProps) {

  const { data: session } = useSession()
  const currentUserId = session?.user.id as string

  const [code, setCode] = useState(initialCode)

  const { socket } = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.on("code_change", (data: { code: string, playerId: string }) => {
        if (data.playerId !== currentUserId) {
          return
        }
        setCode(data.code)
      })
    }
  }, [socket, currentUserId])

  // on code change
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
    socket?.emit("code_change", { code: newCode, playerId: currentUserId })
  }, [socket, currentUserId])


  return (
    <Panel defaultSize={collapsed ? 100 : 50} minSize={30}>
      <div className="h-full flex flex-col">
        <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">You</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400">Connected</span>
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
            value={code}
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
