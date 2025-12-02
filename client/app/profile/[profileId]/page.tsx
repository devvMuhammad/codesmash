import { getUserProfile } from "@/lib/api/profile"
import { ProfileHeader } from "@/components/profile/profile-header"
import { HeroStatsGrid } from "@/components/profile/hero-stats-grid"
import { DifficultyBreakdownChart } from "@/components/profile/difficulty-breakdown-chart"
import { CommonNavbar } from "@/components/common-navbar"
import type { Metadata } from "next"
import { RecentActivityTimeline } from "@/components/profile/recent-activity-timeline"

import { ProfileNotFound } from "@/components/profile/profile-not-found"

interface ProfilePageProps {
  params: Promise<{
    profileId: string
  }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  try {
    const { profileId } = await params
    const profile = await getUserProfile(profileId)

    return {
      title: `${profile.user.name} (@${profile.user.username})`,
      description: `View ${profile.user.name}'s CodeSmash profile - Rank #${profile.stats.globalRank}, ${profile.stats.winRate}% win rate, ${profile.stats.totalBattles} battles`,
    }
  } catch {
    return {
      title: "Profile Not Found",
      description: "This profile could not be found on CodeSmash",
    }
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  let profile
  try {
    const { profileId } = await params
    profile = await getUserProfile(profileId)
  } catch {
    return <ProfileNotFound />
  }

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader user={profile.user} />

        {/* Hero Stats Grid */}
        <HeroStatsGrid stats={profile.stats} />

        {/* Two Column Layout */}
        <div className="flex flex-col gap-y-6">
          <DifficultyBreakdownChart difficulty={profile.difficulty} />
          <RecentActivityTimeline battles={profile.recentBattles} />
        </div>
      </div>
    </div>
  )
}

