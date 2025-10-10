"use client"

import Link from "next/link"
import { Code } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserDropdown } from "@/components/user-dropdown"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"


export function CommonNavbar() {
  const { data: session, isPending: isLoading } = useSession()

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CodeSmash</span>
          </Link>

          <div className="flex items-center space-x-6">
            {session?.user && (
              <>
                <Link href="/lobby" className="text-foreground hover:text-primary transition-colors">
                  Lobby
                </Link>
                <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">
                  Leaderboard
                </Link>
                <Link href="/practice" className="text-foreground hover:text-primary transition-colors">
                  Practice
                </Link>
              </>
            )}
            <ThemeSwitcher />
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : session?.user ? (
              <UserDropdown user={session.user} />
            ) : (
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
