"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Flag } from "lucide-react"
import { useGame } from "@/context/game-websocket-context"
import { useGameStore } from "@/providers/game-store-provider"

export function ForfeitGameDialog() {
  const [open, setOpen] = useState(false)
  const { forfeitGame } = useGame()
  const gameStatus = useGameStore((state) => state.gameStatus)

  const handleForfeit = () => {
    forfeitGame()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          disabled={gameStatus !== "in_progress"}
        >
          <Flag className="h-4 w-4 mr-2" />
          Forfeit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Forfeit Game?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to forfeit this game? This action cannot be undone.
            <br />
            <br />
            <strong>Consequences:</strong>
            <br />
            • You will lose the game immediately
            <br />
            • Your opponent will be declared the winner
            <br />
            • The game will end for both players
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleForfeit}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, Forfeit Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}