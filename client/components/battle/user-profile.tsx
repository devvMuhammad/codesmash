"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession } from "@/lib/auth-client"
import { UserDropdown } from "../user-dropdown"

export function UserProfile() {
  const { data: session, isPending: isLoading } = useSession()

  if (isLoading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  if (session?.user) {
    return <UserDropdown user={session.user} />
  }

  return (
    <Button asChild>
      <Link href="/auth/login">Sign In</Link>
    </Button>
  )
}

