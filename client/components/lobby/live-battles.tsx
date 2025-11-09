"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Clock, Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import type { LiveBattle } from "@/lib/validations/game"
import { formatTimeRemaining } from "@/lib/date-utils"

interface LiveBattlesProps {
  battles: LiveBattle[]
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

export function LiveBattles({ battles }: LiveBattlesProps) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {battles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {battles.map((battle) => {
              const hostAura = getHardcodedAura(battle.host.name)
              const challengerAura = getHardcodedAura(battle.challenger.name)
              const timeRemaining = formatTimeRemaining(battle.remainingSeconds)

              return (
                <Link key={battle._id} href={`/battle/${battle._id}`}>
                  <Card className="p-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:border-primary/50 cursor-pointer">
                    <div className="space-y-4">
                      {/* Players */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {getAvatarInitial(battle.host.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{battle.host.name || "Unknown"}</p>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Flame className="h-3 w-3 text-orange-500" />
                                  <span>{hostAura}</span>
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
                            <p className="text-sm font-medium">{battle.challenger.name || "Unknown"}</p>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground justify-end">
                                  <Flame className="h-3 w-3 text-orange-500" />
                                  <span>{challengerAura}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Aura points earned through victories</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {getAvatarInitial(battle.challenger.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Problem & Status */}
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Problem: <span className="text-foreground font-medium">{battle.problem.title}</span>
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{timeRemaining}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-red-500 font-semibold text-sm animate-pulse">LIVE</span>
                          </div>
                        </div>
                      </div>

                      {/* Watch Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
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
              )
            })}
          </div>
        ) : (
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
