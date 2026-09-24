import { useState } from "react"
import { useForm, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import { createGame } from "@/lib/api/games"
import { createGameSchema, type CreateGameFormData, type CreateGameResponse } from "@/lib/validations/game"
import { gameConfig } from "@/lib/config/game"
import { toast } from "sonner"

interface CreateChallengeState {
  step: "form" | "success"
  gameData: { gameId: string; inviteLink: string; inviteCode: string } | null
}

interface UseCreateChallengeReturn {
  form: UseFormReturn<CreateGameFormData>
  mutation: UseMutationResult<CreateGameResponse, Error, CreateGameFormData>
  step: "form" | "success"
  gameData: { gameId: string; inviteLink: string; inviteCode: string } | null
  onSubmit: (data: CreateGameFormData) => Promise<void>
  resetChallenge: () => void
}

export function useCreateChallenge(): UseCreateChallengeReturn {
  const [state, setState] = useState<CreateChallengeState>({
    step: "form",
    gameData: null,
  })

  const form = useForm<CreateGameFormData>({
    resolver: zodResolver(createGameSchema),
    defaultValues: gameConfig.defaults,
  })

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      setState({
        step: "success",
        gameData: data,
      })
      toast.success("Challenge created!", {
        description: "Share the invite link with your friend",
      })
    },
    onError: (error) => {
      toast.error("Failed to create challenge", {
        description: error.message,
      })
    },
  })

  const onSubmit = async (data: CreateGameFormData) => {
    mutation.mutate(data)
  }

  const resetChallenge = () => {
    setState({
      step: "form",
      gameData: null,
    })
    form.reset()
  }

  return {
    form,
    mutation,
    step: state.step,
    gameData: state.gameData,
    onSubmit,
    resetChallenge,
  }
}

