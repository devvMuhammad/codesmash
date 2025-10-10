"use client"

import { Panel, PanelResizeHandle } from "react-resizable-panels"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { OutputTerminal } from "./output-terminal"

interface ConsolePanelProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function ConsolePanel({ collapsed, onCollapse }: ConsolePanelProps) {
  if (collapsed) {
    return (
      <div className="h-12 border-t border-border/40 bg-muted/10 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-muted-foreground">Console Output</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(false)}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Show Console"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <PanelResizeHandle className="h-1 bg-border/40 hover:bg-border transition-colors" />
      <Panel defaultSize={30} minSize={15} maxSize={50} className="border-t border-border/40">
        <div className="h-full flex flex-col">
          <div className="h-12 border-b border-border/40 flex items-center justify-between px-4 bg-muted/20">
            <span className="text-sm font-medium text-muted-foreground">Console Output</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCollapse(true)}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 min-h-0">
            <OutputTerminal />
          </div>
        </div>
      </Panel>
    </>
  )
}
