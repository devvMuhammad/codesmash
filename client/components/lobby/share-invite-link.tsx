"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share2, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ShareInviteLinkProps {
  gameData: {
    gameId: string
    inviteLink: string
    inviteCode: string
  }
  onDone: () => void
}

export function ShareInviteLink({ gameData, onDone }: ShareInviteLinkProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (!gameData?.inviteLink) return

    try {
      await navigator.clipboard.writeText(gameData.inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareLink = () => {
    if (!gameData?.inviteLink) return

    if (navigator.share) {
      navigator.share({
        title: "CodeSmash Challenge",
        text: "Join me for a coding duel!",
        url: gameData.inviteLink,
      })
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Challenge Created!</h3>
          <p className="text-muted-foreground text-sm">Share the invite link or visit the battle yourself</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Invite Link</Label>
          <div className="flex mt-1">
            <Input value={gameData.inviteLink} readOnly className="rounded-r-none" />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="rounded-l-none border-l-0 bg-transparent"
            >
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          {copied && <p className="text-green-500 text-xs mt-1">Copied to clipboard!</p>}
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={shareLink}
            variant="outline"
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Link href={`/battle/${gameData.gameId}`}>
            <Button
              onClick={() => window.open(`/battle/${gameData.gameId}`, '_blank')}
              variant="outline"
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Battle
            </Button>
          </Link>

        </div>

        <Button onClick={onDone} className="w-full">
          Done
        </Button>
      </div>
    </div>
  )
}