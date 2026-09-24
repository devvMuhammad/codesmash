"use client"

import { useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { ProblemDescription } from "../layout/problem-description"
import { SpectatorCodePanel } from "./spectator-code-panel"

export function SpectatorBattleView() {
  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)

  return (
    <PanelGroup direction="horizontal">
      {/* Problem Description Sidebar */}
      <ProblemDescription
        collapsed={problemSidebarCollapsed}
        onCollapse={setProblemSidebarCollapsed}
      />

      {/* Code Panels Container */}
      <Panel>
        <PanelGroup direction="horizontal">
          {/* Host Code Panel */}
          <SpectatorCodePanel role="host" />

          {/* Resize Handle */}
          <PanelResizeHandle className="w-1 bg-border/40 hover:bg-border transition-colors" />

          {/* Challenger Code Panel */}
          <SpectatorCodePanel role="challenger" />
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
