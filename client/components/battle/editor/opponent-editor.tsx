"use client"

import { MonacoEditor } from "./monaco-editor"
import { useGameStore } from "@/providers/game-store-provider"

interface OpponentEditorProps {
  playerName: string
  status: "connected" | "disconnected" | "typing"
}

export function OpponentEditor({ playerName, status }: OpponentEditorProps) {
  const opponentCode = useGameStore((state) => state.opponentCode)

  return (
    <div className="flex-1 relative h-full">
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 z-10 pointer-events-none" />
      <MonacoEditor
        value={opponentCode}
        onChange={() => { }} // No-op for opponent editor
        language="javascript"
        readOnly={true}
        playerId="opponent"
      />
    </div>
  )
}
