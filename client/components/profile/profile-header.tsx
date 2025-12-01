import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { UserProfileInfo } from "@/lib/validations/profile"
import { Flame } from "lucide-react"

interface ProfileHeaderProps {
  user: UserProfileInfo
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  // Generate initials from name for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
          <p className="text-lg text-muted-foreground mb-2">@{user.username}</p>
          <p className="text-sm text-muted-foreground mb-3">Member since: {user.memberSince}</p>

          <div className="flex items-center gap-2 text-sm">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-foreground">{user.aura} Aura</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

