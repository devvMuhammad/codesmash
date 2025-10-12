"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Send, Flag, Timer } from "lucide-react"

export function DuelControls() {

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleRunCode = () => {
    // Get current code from editor - this would be passed as prop in real implementation
    const currentCode = `function twoSum(nums, target) {
    // Current code would be retrieved from Monaco editor
}`
    // runCode(currentCode)
  }

  const handleSubmit = () => {
    // Get current code from editor - this would be passed as prop in real implementation
    const currentCode = `function twoSum(nums, target) {
    // Current code would be retrieved from Monaco editor
}`
    // submitCode(currentCode)
  }

  return (
    <div className="h-full flex items-center justify-between px-4 bg-card/30">
      {/* Left - Action Buttons */}
      <div className="flex items-center space-x-3">
        <Button size="sm" variant="default" className="glow-blue-sm" onClick={handleRunCode}>
          <Play className="h-4 w-4 mr-2" />
          Run Code
        </Button>
        <Button size="sm" variant="default" onClick={handleSubmit}>
          <Send className="h-4 w-4 mr-2" />
          Submit
        </Button>
        <Button size="sm" variant="destructive" onClick={() => { }}>
          <Flag className="h-4 w-4 mr-2" />
          Forfeit
        </Button>
      </div>

      {/* Center - Timer */}
      <div className="flex items-center space-x-2">
        <Timer className="h-5 w-5 text-primary" />
        <span className="text-2xl font-mono font-bold text-foreground">{formatTime(0)}</span>
        <Badge variant="secondary">Time Remaining</Badge>
      </div>

      {/* Right - Status */}
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Status: </span>
          <span className="text-foreground font-medium capitalize">{'waiting'}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Players: </span>
          <span className="text-foreground font-medium">{0}/2</span>
        </div>
      </div>
    </div>
  )
}
