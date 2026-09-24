"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Swords, Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { OpenChallenge } from "@/lib/validations/game"
import { formatTimeAgo } from "@/lib/date-utils"
import Link from "next/link"
import { generateInviteLink } from "@/lib/utils"

interface OpenChallengesProps {
  challenges: OpenChallenge[]
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

export function OpenChallenges({ challenges }: OpenChallengesProps) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {challenges.length > 0 ? (
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const aura = getHardcodedAura(challenge.host.name)
              const waitTime = formatTimeAgo(challenge.createdAt)

              return (
                <Card
                  key={challenge._id}
                  className="p-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    {/* Player Info */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{getAvatarInitial(challenge.host.name)}</AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{challenge.host.name || "Unknown"}</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Flame className="h-4 w-4 text-orange-500" />
                                <span>{aura}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Aura points earned through victories</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)} difficulty</span>
                          <span>•</span>
                          <span>Waiting {waitTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Challenge Button */}

                    <Link href={generateInviteLink(challenge.inviteCode, challenge._id)}>
                      <Button
                        className="hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-105"
                        size="lg"
                      >
                        <Swords className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
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
