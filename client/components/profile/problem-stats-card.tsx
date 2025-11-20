import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProblemStats } from "@/lib/validations/profile"

interface ProblemStatsCardProps {
  problemStats: ProblemStats
}

export function ProblemStatsCard({ problemStats }: ProblemStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Problem Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Attempted</span>
            <span className="text-lg font-semibold text-foreground">
              {problemStats.totalAttempted}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Problems Solved (Won)</span>
            <span className="text-lg font-semibold text-green-500">
              {problemStats.solved}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Unsolved (Lost)</span>
            <span className="text-lg font-semibold text-red-500">
              {problemStats.unsolved}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

