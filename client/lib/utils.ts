import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSession } from "./auth-client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getHostId() {
  const session = await getSession()
  if (!session || !session.data) {
    throw new Error("User not authenticated")
  }

  return session.data.user.id
}

export function generateInviteLink(inviteCode: string, battleId: string) {
  return `${window.location.origin}/battle/${battleId}?inviteCode=${inviteCode}`
}

export function getUserInitials(name: string | undefined) {
  if (!name) return "?"
  return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

export function getDifficultyStyles(difficulty: string) {
  const normalizedDifficulty = difficulty?.toLowerCase()

  switch (normalizedDifficulty) {
    case 'easy':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
    case 'medium':
      return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
    case 'hard':
      return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
    default:
      return 'bg-secondary text-secondary-foreground'
  }
}

export function getTimeLimitStyles(timeLimit: number) {
  if (timeLimit <= 15) {
    return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
  } else if (timeLimit <= 30) {
    return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
  } else {
    return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
  }
}

export function getRoleStyles(role: string) {
  switch (role) {
    case 'host':
      return 'text-blue-600 dark:text-blue-400 font-semibold'
    case 'challenger':
      return 'text-purple-600 dark:text-purple-400 font-semibold'
    case 'spectator':
      return 'text-muted-foreground font-semibold'
    default:
      return 'font-semibold'
  }
}