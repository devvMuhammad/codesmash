"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserPlus, Users, Copy, CheckCircle, ChevronDown } from "lucide-react"
import { generateInviteLink } from "@/lib/utils"

interface InviteDropdownProps {
  gameId: string
  inviteCode: string
  disabled?: boolean
}

export function InviteDropdown({ gameId, inviteCode, disabled = false }: InviteDropdownProps) {
  const [copiedType, setCopiedType] = useState<'challenger' | 'spectator' | null>(null)

  const challengerInviteLink = generateInviteLink(inviteCode, gameId)
  const spectatorLink = `${window.location.origin}/battle/${gameId}`

  const copyToClipboard = async (link: string, type: 'challenger' | 'spectator') => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-600/10 text-purple-400 border-purple-600/20 hover:bg-purple-600/20"
          disabled={disabled}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Invite
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem
          onClick={() => copyToClipboard(challengerInviteLink, 'challenger')}
          className="cursor-pointer"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          <span className="flex-1">Invite a challenger</span>
          {copiedType === 'challenger' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyToClipboard(spectatorLink, 'spectator')}
          className="cursor-pointer"
        >
          <Users className="h-4 w-4 mr-2" />
          <span className="flex-1">Invite a spectator</span>
          {copiedType === 'spectator' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}