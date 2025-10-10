"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createGameSchema, CreateGameFormData } from "@/lib/validations/game"
import { useCreateGame } from "@/lib/api/games"
import { gameConfig } from "@/lib/config/game"
import { CreateChallengeForm } from "@/components/forms/create-challenge-form"
import { ShareInviteLink } from "./share-invite-link"

interface CreateChallengeProps {
  children?: React.ReactNode
}

export function CreateChallenge({ children }: CreateChallengeProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [gameData, setGameData] = useState<{ gameId: string; inviteLink: string; inviteCode: string } | null>(null)

  const form = useForm<CreateGameFormData>({
    resolver: zodResolver(createGameSchema),
    defaultValues: gameConfig.defaults,
  })

  const createGameMutation = useCreateGame()

  const onSubmit = async (data: CreateGameFormData) => {
    try {
      const result = await createGameMutation.mutateAsync(data)
      setGameData(result)
      setStep("success")
    } catch (error) {
      console.error("Failed to create game:", error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setStep("form")
    setGameData(null)
    form.reset()
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            size="lg"
            variant="outline"
            className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 bg-transparent"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Challenge Friend
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step === "form" ? "Create Challenge" : "Challenge Created!"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 py-4"
            >
              <CreateChallengeForm
                form={form}
                onSubmit={onSubmit}
                isLoading={createGameMutation.isPending}
                error={createGameMutation.error?.message}
              />
            </motion.div>
          )}

          {step === "success" && gameData && (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ShareInviteLink gameData={gameData} onDone={handleClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}