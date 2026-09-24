"use client"

import { Panel, PanelResizeHandle } from "react-resizable-panels"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProblemPanel } from "./problem-panel"

interface ProblemDescriptionProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function ProblemDescription({ collapsed, onCollapse }: ProblemDescriptionProps) {
  if (collapsed) {
    return (
      <div className="w-12 border-r border-border/40 bg-muted/10 flex flex-col items-center justify-start pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(false)}
          className="h-8 w-8 p-0 hover:bg-muted mb-2"
          title="Show Problem Description"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap mt-4">Problem</div>
      </div>
    )
  }

  return (
    <>
      <Panel defaultSize={25} minSize={20} maxSize={40} className="border-r border-border/40">
        <div className="h-full flex flex-col">
          <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
            <span className="text-sm font-medium text-muted-foreground">Problem Description</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCollapse(true)}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 min-h-0">
            <ProblemPanel />
          </div>
        </div>
      </Panel>
      <PanelResizeHandle className="w-1 bg-border/40 hover:bg-border transition-colors" />

    </>
  )
}
