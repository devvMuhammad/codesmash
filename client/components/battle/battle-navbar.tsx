"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, Settings, Flag, Play, Send } from "lucide-react"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function BattleNavbar() {
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <nav className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left - Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-semibold text-lg">CodeSmash</span>
      </Link>

      {/* Center - Match Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-blue-400" />
          <span className="font-mono text-lg font-semibold text-blue-400">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
            You
          </Badge>
          <span className="text-muted-foreground font-medium">vs</span>
          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
            Opponent
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-600/10 text-blue-400 border-blue-600/20 hover:bg-blue-600/20"
        >
          <Play className="h-4 w-4 mr-2" />
          Run Code
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit
        </Button>
        <ThemeSwitcher />
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="sm">
          <Flag className="h-4 w-4 mr-2" />
          Forfeit
        </Button>
      </div>
    </nav>
  )
}
