import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RecentBattle } from "@/lib/validations/profile"
import { Clock, Timer, Calendar } from "lucide-react"

interface RecentActivityTimelineProps {
  battles: RecentBattle[]
}

export function RecentActivityTimeline({ battles }: RecentActivityTimelineProps) {
  const getResultStyles = (result: "win" | "loss" | "draw") => {
    switch (result) {
      case "win":
        return {
          badge: "bg-green-500/10 text-green-500 border-green-500/30",
          text: "Won",
        }
      case "loss":
        return {
          badge: "bg-red-500/10 text-red-500 border-red-500/30",
          text: "Lost",
        }
      case "draw":
        return {
          badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
          text: "Draw",
        }
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Last 10 battles</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {battles.map((battle) => {
            const resultStyles = getResultStyles(battle.result)

            return (
              <div
                key={battle.id}
                className="p-4 rounded-lg border border-border hover:border-border/80 hover:bg-muted/30 transition-all"
              >
                {/* Top Row: Result, Opponent, Problem */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Badge
                      variant="outline"
                      className={`${resultStyles.badge} font-semibold shrink-0`}
                    >
                      {resultStyles.text}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">
                          vs {battle.opponent.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          @{battle.opponent.username}
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-medium mt-1 truncate">
                        {battle.problem.title}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getDifficultyColor(battle.problem.difficulty)} shrink-0 capitalize`}
                  >
                    {battle.problem.difficulty}
                  </Badge>
                </div>

                {/* Bottom Row: Battle Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{battle.completedAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Finished in {battle.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3.5 w-3.5" />
                    <span>{battle.timeLimit}m limit</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

