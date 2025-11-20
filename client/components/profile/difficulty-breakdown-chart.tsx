import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DifficultyBreakdown } from "@/lib/validations/profile"

interface DifficultyBreakdownChartProps {
  difficulty: DifficultyBreakdown
}

export function DifficultyBreakdownChart({ difficulty }: DifficultyBreakdownChartProps) {
  const difficultyData = [
    {
      level: "Easy",
      wins: difficulty.easy.wins,
      losses: difficulty.easy.losses,
      games: difficulty.easy.games,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      level: "Medium",
      wins: difficulty.medium.wins,
      losses: difficulty.medium.losses,
      games: difficulty.medium.games,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      level: "Hard",
      wins: difficulty.hard.wins,
      losses: difficulty.hard.losses,
      games: difficulty.hard.games,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Difficulty Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {difficultyData.map((item) => {
            const winRate = item.games > 0 ? ((item.wins / item.games) * 100).toFixed(1) : "0.0"
            const progressPercentage = item.games > 0 ? (item.wins / item.games) * 100 : 0

            return (
              <div key={item.level} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="font-medium text-foreground">{item.level}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {item.wins}W-{item.losses}L ({winRate}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

