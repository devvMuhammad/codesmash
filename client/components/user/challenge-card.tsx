"use client";
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type UserChallenge } from "@/lib/api/games"
import { Clock, Users, Calendar, Target, Play, Clipboard } from "lucide-react"
import { formatTimeAgo, formatDate } from "@/lib/date-utils"
import Link from "next/link"

interface ChallengeCardProps {
  challenge: UserChallenge
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
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
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

  console.log(challenge)
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">Challenge #{challenge.inviteCode}</CardTitle>
            <Badge className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
          </div>
          <Badge className={getStatusColor(challenge.status)}>
            {challenge.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{challenge.challenger?.name ? 2 : 1} players</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{Math.floor(challenge.timeLimit / 60)}m</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatTimeAgo(challenge.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>Problem #{challenge.problem}</span>
          </div>
        </div>

        {challenge.createdAt && new Date(new Date(challenge.createdAt).getTime() + challenge.timeLimit * 1000) > new Date() && (
          <div className="text-xs text-muted-foreground">
            Expires {formatDate(new Date(new Date(challenge.createdAt).getTime() + challenge.timeLimit * 1000).toISOString())}
          </div>
        )}

        {!isGameFinished && (
          <div className="pt-2 flex gap-2">
            <Button asChild className="flex-1">
              <Link href={`/battle/${challenge._id}`}>
                <Play className="h-4 w-4" />
                Join Game
              </Link>
            </Button>
            <Button
              onClick={copyInviteLink}
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <Clipboard className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}