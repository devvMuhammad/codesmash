import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileStats } from "@/lib/validations/profile"
import { Trophy, Target, Swords, Clock } from "lucide-react"

interface HeroStatsGridProps {
  stats: ProfileStats
}

export function HeroStatsGrid({ stats }: HeroStatsGridProps) {
  const statCards = [
    {
      title: "Rank",
      value: `#${stats.globalRank.toLocaleString()}`,
      subtitle: `Top ${stats.rankPercentile}%`,
      icon: Trophy,
      iconColor: "text-yellow-500",
    },
    {
      title: "Win Rate",
      value: `${stats.winRate}%`,
      subtitle: "Rate",
      icon: Target,
      iconColor: "text-green-500",
    },
    {
      title: "Total Battles",
      value: stats.totalBattles.toString(),
      subtitle: "Battles",
      icon: Swords,
      iconColor: "text-red-500",
    },
    {
      title: "Time Played",
      value: `${stats.totalHoursPlayed}h`,
      subtitle: "Played",
      icon: Clock,
      iconColor: "text-blue-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

