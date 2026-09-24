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
      draws: difficulty.easy.draws,
      games: difficulty.easy.games,
      color: "bg-green-500",
      textColor: "text-green-500",
      barWinColor: "bg-green-500",
      barLossColor: "bg-red-500",
      barDrawColor: "bg-yellow-500",
    },
    {
      level: "Medium",
      wins: difficulty.medium.wins,
      losses: difficulty.medium.losses,
      draws: difficulty.medium.draws,
      games: difficulty.medium.games,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      barWinColor: "bg-green-500",
      barLossColor: "bg-red-500",
      barDrawColor: "bg-yellow-500",
    },
    {
      level: "Hard",
      wins: difficulty.hard.wins,
      losses: difficulty.hard.losses,
      draws: difficulty.hard.draws,
      games: difficulty.hard.games,
      color: "bg-red-500",
      textColor: "text-red-500",
      barWinColor: "bg-green-500",
      barLossColor: "bg-red-500",
      barDrawColor: "bg-yellow-500",
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
            const winPercentage = item.games > 0 ? (item.wins / item.games) * 100 : 0
            const lossPercentage = item.games > 0 ? (item.losses / item.games) * 100 : 0
            const drawPercentage = item.games > 0 ? (item.draws / item.games) * 100 : 0

            return (
              <div key={item.level} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="font-medium text-foreground">{item.level}</span>
                  </div>
                  <div className="flex items-center gap-3 font-medium">
                    <span className={item.textColor}>
                      {item.wins}W
                    </span>
                    <span className="text-red-500">
                      {item.losses}L
                    </span>
                    <span className="text-yellow-500">
                      {item.draws}D
                    </span>
                    <span className="text-muted-foreground">
                      ({winRate}%)
                    </span>
                    <span className="text-muted-foreground">
                      {item.games} total
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                  {winPercentage > 0 && (
                    <div
                      className={`h-full ${item.barWinColor} transition-all duration-300`}
                      style={{ width: `${winPercentage}%` }}
                    />
                  )}
                  {lossPercentage > 0 && (
                    <div
                      className={`h-full ${item.barLossColor} transition-all duration-300`}
                      style={{ width: `${lossPercentage}%` }}
                    />
                  )}
                  {drawPercentage > 0 && (
                    <div
                      className={`h-full ${item.barDrawColor} transition-all duration-300`}
                      style={{ width: `${drawPercentage}%` }}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

