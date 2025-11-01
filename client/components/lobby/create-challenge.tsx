"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CreateChallengeForm } from "@/components/forms/create-challenge-form"
import { ShareInviteLink } from "./share-invite-link"
import { useCreateChallenge } from "@/hooks/use-create-challenge"

interface CreateChallengeProps {
  children?: React.ReactNode
}

export function CreateChallenge({ children }: CreateChallengeProps) {
  const [open, setOpen] = useState(false)

  const { form, mutation, step, gameData, onSubmit, resetChallenge } = useCreateChallenge()

  const handleClose = () => {
    setOpen(false)
    resetChallenge()
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
                isLoading={mutation.isPending}
                error={mutation.error?.message}
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