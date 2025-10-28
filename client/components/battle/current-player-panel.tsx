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
import { useEffect } from "react"
import { CodeLocalStorage } from "@/lib/services/localStorage"
import { useParams } from "next/navigation"

interface CurrentPlayerPanelProps {
  collapsed: boolean
  gameId: string
}

export function CurrentPlayerPanel({ collapsed, gameId }: CurrentPlayerPanelProps) {

  return (
    <Panel defaultSize={collapsed ? 100 : 50} minSize={30}>
      <div className="h-full flex flex-col">
        <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
          <PlayerStatus />
          <SelectLanguage />
        </div>
        <div className="flex-1 min-h-0">
          <CurrentPlayerEditor gameId={gameId} />
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
  const selectedLanguage = useGameStore(state => state.selectedLanguage);
  const setSelectedLanguage = useGameStore(state => state.setSelectedLanguage)
  const gameId = useParams().gameId as string


  useEffect(() => {
    const lastSelectedLanguage = CodeLocalStorage.loadLastSelectedLanguage(gameId)
    // to avoid setting language to null and avoid unnecessary re-renders
    if (lastSelectedLanguage && lastSelectedLanguage !== selectedLanguage) {
      setSelectedLanguage(lastSelectedLanguage)
    }
  }, [gameId, setSelectedLanguage, selectedLanguage])

  return <Select
    value={selectedLanguage}
    onValueChange={(value) => {
      setSelectedLanguage(value)
      CodeLocalStorage.saveLastSelectedLanguage(gameId, value)
    }}
    defaultValue={SUPPORTED_LANGUAGES[0].name}
  >
    <SelectTrigger size="sm" className="w-32 data-[size=sm]:h-7  text-xs">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {SUPPORTED_LANGUAGES.map((language) => <SelectItem key={language.name} value={language.name}>{language.title}</SelectItem>)}
    </SelectContent>
  </Select>
}