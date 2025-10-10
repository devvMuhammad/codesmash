import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Swords, Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockChallenges = [
  {
    id: 1,
    player: { name: "Jordan", avatar: "J", aura: 1450 },
    preferredLanguage: "JavaScript",
    waitTime: "2 min ago",
  },
  {
    id: 2,
    player: { name: "Taylor", avatar: "T", aura: 2100 },
    preferredLanguage: "Python",
    waitTime: "5 min ago",
  },
  {
    id: 3,
    player: { name: "Casey", avatar: "C", aura: 890 },
    preferredLanguage: "Java",
    waitTime: "1 min ago",
  },
]

export function OpenChallenges() {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="space-y-4">
          {mockChallenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="p-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                {/* Player Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{challenge.player.avatar}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{challenge.player.name}</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span>{challenge.player.aura}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aura points earned through victories</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Prefers {challenge.preferredLanguage}</span>
                      <span>•</span>
                      <span>Waiting {challenge.waitTime}</span>
                    </div>
                  </div>
                </div>

                {/* Challenge Button */}
                <Button
                  className="hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <Swords className="h-4 w-4 mr-2" />
                  Challenge
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {mockChallenges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Swords className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No active challenges right now</p>
            </div>
            <Button variant="outline" className="glow-blue-sm bg-transparent">
              ⚡ Be the first to create one!
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
