import { type UserChallenge } from "@/lib/api/games"
import { Target } from "lucide-react"
import { ChallengeCard } from "./challenge-card"

interface UserChallengesProps {
  challenges: UserChallenge[]
}

export function UserChallenges({ challenges }: UserChallengesProps) {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">No challenges yet</h2>
        <p className="text-muted-foreground mb-4">
          You haven&apos;t created any challenges yet. Start by creating your first challenge!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge._id} challenge={challenge} />
      ))}
    </div>
  )
}