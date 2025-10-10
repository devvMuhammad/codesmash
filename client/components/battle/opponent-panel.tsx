"use client"

import { Panel, PanelResizeHandle } from "react-resizable-panels"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OpponentEditor } from "./opponent-editor"
import { MonacoEditor } from "./monaco-editor"
import { useState } from "react"

interface OpponentPanelProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function OpponentPanel({ collapsed, onCollapse }: OpponentPanelProps) {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Opponent's solution
    
}`)
  if (collapsed) {
    return (
      <div className="w-12 border-l border-border/40 bg-muted/10 flex flex-col items-center justify-start pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(false)}
          className="h-8 w-8 p-0 hover:bg-muted mb-2"
          title="Show Opponent Editor"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap mt-4">
          Opponent
        </div>
      </div>
    )
  }

  return (
    <>
      <PanelResizeHandle className="w-1 bg-border/40 hover:bg-border transition-colors" />
      <Panel defaultSize={50} minSize={30}>
        <div className="h-full flex flex-col">
          <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Opponent</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">Connected</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCollapse(true)}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 min-h-0">
            <div className="flex-1 relative h-full">
              <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 z-10 pointer-events-none" />
              <MonacoEditor
                value={code}
                onChange={setCode} // No-op for opponent editor
                language="javascript"
                readOnly={true}
                playerId="opponent"
              />
            </div>
          </div>
        </div>
      </Panel>
    </>
  )
}
