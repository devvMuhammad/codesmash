"use client";
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type UserChallenge } from "@/lib/api/games"
import { Clock, Calendar, Target, Play, Clipboard, Users, Flame } from "lucide-react"
import { formatTimeAgo } from "@/lib/date-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface ChallengeCardProps {
  challenge: UserChallenge
}

function getAvatarInitial(name: string | undefined): string {
  if (!name) return "?"
  return name.charAt(0).toUpperCase()
}

function getHardcodedAura(name: string | undefined): number {
  if (!name) return 1000
  // Generate consistent aura based on name length and first character
  const base = name.charCodeAt(0) * 100
  const modifier = name.length * 50
  return Math.floor((base + modifier) % 3000) + 500
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [copied, setCopied] = useState(false)

  const copyInviteLink = async () => {
    const inviteLink = `${window.location.origin}/battle/${challenge._id}?invite=${challenge.inviteCode}`
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy invite link:", err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "ready_to_start":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "in_progress":
        return "bg-green-500/10 text-green-500 border-green-500/20 animate-pulse"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const isGameFinished = challenge.status === "completed" || challenge.status === "cancelled"
  const hostAura = getHardcodedAura(challenge.host.name)
  const challengerAura = challenge.challenger ? getHardcodedAura(challenge.challenger.name) : 0

  return (
    <TooltipProvider>
      <Card className="p-5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:border-primary/50">
        <div className="space-y-4">
          {/* Top Row - Players */}
          <div className="flex items-center justify-between gap-6">
            {/* Host */}
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarFallback className="text-sm font-semibold">{getAvatarInitial(challenge.host.name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{challenge.host.name || "Unknown"}</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      <span>{hostAura}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Aura points earned through victories</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* VS or Waiting */}
            <div className="text-muted-foreground text-xl font-bold px-4">VS</div>

            {/* Challenger */}
            {challenge.challenger ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarFallback className="text-sm font-semibold">{getAvatarInitial(challenge.challenger.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{challenge.challenger.name || "Unknown"}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                        <Flame className="h-3.5 w-3.5 text-orange-500" />
                        <span>{challengerAura}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Aura points earned through victories</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Waiting for opponent...</span>
              </div>
            )}
          </div>

          {/* Second Row - Problem Info */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Target className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">{challenge.problem.title}</span>
                <p className="text-xs text-muted-foreground line-clamp-1">{challenge.problem.description}</p>
              </div>
            </div>
            <Badge className={getDifficultyColor(challenge.problem.difficulty)}>
              {challenge.problem.difficulty.charAt(0).toUpperCase() + challenge.problem.difficulty.slice(1)}
            </Badge>
          </div>

          {/* Third Row - Game Details & Actions */}
          <div className="flex items-center justify-between gap-4">
            {/* Left - Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {/* Status Badge */}
              <Badge className={getStatusColor(challenge.status)}>
                {challenge.status.replace("_", " ").toUpperCase()}
              </Badge>

              {/* Time Limit */}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(challenge.timeLimit / 60)} min</span>
              </div>

              {/* Created Time */}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatTimeAgo(challenge.createdAt)}</span>
              </div>
            </div>

            {/* Right - Action Buttons */}
            <div className="flex items-center gap-2">
              {!isGameFinished ? (
                <>
                  <Button
                    asChild
                    size="default"
                    className="hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                  >
                    <Link href={`/battle/${challenge._id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      {challenge.status === "in_progress" || challenge.status === "ready_to_start" ? "Continue" : "Join"}
                    </Link>
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={copyInviteLink}
                        variant="outline"
                        size="icon"
                      >
                        <Clipboard className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy invite link"}</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <Button asChild variant="outline" size="default">
                  <Link href={`/battle/${challenge._id}`}>
                    <Target className="h-4 w-4 mr-2" />
                    View Results
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  )
}