"use client"

import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Timer, Trophy } from "lucide-react"
import { CreateGameFormData } from "@/lib/validations/game"
import { gameConfig } from "@/lib/config/game"

interface CreateChallengeFormProps {
  form: UseFormReturn<CreateGameFormData>
  onSubmit: (data: CreateGameFormData) => Promise<void>
  isLoading?: boolean
  error?: string | null
}

export function CreateChallengeForm({ form, onSubmit, isLoading, error }: CreateChallengeFormProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Label htmlFor="difficulty" className="flex items-center gap-2 min-w-[140px]">
            <Trophy className="h-4 w-4" />
            Problem Difficulty
          </Label>
          <Select
            value={form.watch("difficulty")}
            onValueChange={(value) => form.setValue("difficulty", value as "easy" | "medium" | "hard")}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {form.formState.errors.difficulty && (
          <p className="text-sm text-red-500 ml-[156px]">{form.formState.errors.difficulty.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Label htmlFor="timeLimit" className="flex items-center gap-2 min-w-[140px]">
            <Timer className="h-4 w-4" />
            Time Limit
          </Label>
          <Select
            value={form.watch("timeLimit").toString()}
            onValueChange={(value) => form.setValue("timeLimit", parseInt(value))}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select time limit" />
            </SelectTrigger>
            <SelectContent>
              {gameConfig.options.timeLimit.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {form.formState.errors.timeLimit && (
          <p className="text-sm text-red-500 ml-[156px]">{form.formState.errors.timeLimit.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full glow-blue"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Challenge"}
      </Button>

      {error && (
        <p className="text-sm text-red-500 text-center">
          {error}
        </p>
      )}
    </form>
  )
}