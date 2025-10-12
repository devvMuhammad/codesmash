"use client"

import { useState } from "react"
import { MonacoEditor } from "./monaco-editor"

interface OpponentEditorProps {
  playerName: string
  status: "connected" | "disconnected" | "typing"
}

export function OpponentEditor({ playerName, status }: OpponentEditorProps) {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Opponent's solution
    
}`)

  return (
    <div className="flex-1 relative h-full">
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 z-10 pointer-events-none" />
      <MonacoEditor
        value={code}
        onChange={() => { }} // No-op for opponent editor
        language="javascript"
        readOnly={true}
        playerId="opponent"
      />
    </div>
  )
}
