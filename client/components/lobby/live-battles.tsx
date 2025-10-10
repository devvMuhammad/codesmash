"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Clock, Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

const mockBattles = [
  {
    id: 1,
    player1: { name: "Alex", avatar: "A", aura: 1250 },
    player2: { name: "Sarah", avatar: "S", aura: 1890 },
    problem: "Two Sum",
    timeElapsed: "5:23",
    status: "LIVE",
  },
  {
    id: 2,
    player1: { name: "Mike", avatar: "M", aura: 890 },
    player2: { name: "Emma", avatar: "E", aura: 1340 },
    problem: "Binary Search",
    timeElapsed: "12:45",
    status: "LIVE",
  },
  {
    id: 3,
    player1: { name: "David", avatar: "D", aura: 2100 },
    player2: { name: "Lisa", avatar: "L", aura: 2450 },
    problem: "Merge Intervals",
    timeElapsed: "3:12",
    status: "LIVE",
  },
]

export function LiveBattles() {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockBattles.map((battle) => (
            <Link key={battle.id} href={`/duel/${battle.id}`}>
              <Card className="p-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:border-primary/50 cursor-pointer">
                <div className="space-y-4">
                  {/* Players */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{battle.player1.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{battle.player1.name}</p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Flame className="h-3 w-3 text-orange-500" />
                              <span>{battle.player1.aura}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Aura points earned through victories</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="text-muted-foreground text-sm font-bold">VS</div>

                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{battle.player2.name}</p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground justify-end">
                              <Flame className="h-3 w-3 text-orange-500" />
                              <span>{battle.player2.aura}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Aura points earned through victories</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{battle.player2.avatar}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Problem & Status */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Problem: <span className="text-foreground font-medium">{battle.problem}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{battle.timeElapsed}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-red-500 font-semibold text-sm animate-pulse">{battle.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Watch Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600 hover:to-purple-600 hover:text-white border-blue-500/50 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Watch Battle
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {mockBattles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No live battles right now</p>
            </div>
            <Button variant="outline">Refresh</Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
