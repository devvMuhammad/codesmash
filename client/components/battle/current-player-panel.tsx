"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Panel } from "react-resizable-panels"
import { CurrentPlayerEditor } from "./current-player-editor"
import { useGameStore } from "@/providers/game-store-provider"
import { SUPPORTED_LANGUAGES } from "@/lib/config"

interface CurrentPlayerPanelProps {
  collapsed: boolean
  gameId: string
}

export function CurrentPlayerPanel({ collapsed, gameId }: CurrentPlayerPanelProps) {
  const currentPlayerCode = useGameStore(state => state.currentPlayerCode)

  return (
    <Panel defaultSize={collapsed ? 100 : 50} minSize={30}>
      <div className="h-full flex flex-col">
        <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
          <PlayerStatus />
          <SelectLanguage />
        </div>
        <div className="flex-1 min-h-0">
          <CurrentPlayerEditor gameId={gameId} initialCode={currentPlayerCode} />
        </div>
      </div>
    </Panel>
  )
}

function PlayerStatus() {
  const isConnected = useGameStore(state => state.isConnected)

  return <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-muted-foreground">You</span>
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  </div>
}

function SelectLanguage() {

  const selectedLanguae = useGameStore(state => state.selectedLanguage);
  const setSelectedLanguage = useGameStore(state => state.setSelectedLanguage)

  return <Select value={selectedLanguae} onValueChange={setSelectedLanguage} defaultValue={SUPPORTED_LANGUAGES[0].name}>
    <SelectTrigger size="sm" className="w-32 data-[size=sm]:h-7  text-xs">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {SUPPORTED_LANGUAGES.map((language) => <SelectItem key={language.name} value={language.name}>{language.title}</SelectItem>)}
    </SelectContent>
  </Select>
}