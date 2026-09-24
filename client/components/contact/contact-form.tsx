"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createFeedbackSchema, type CreateFeedbackFormData } from "@/lib/validations/feedback"
import { submitFeedback } from "@/lib/api/feedback"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const MESSAGE_MAX_LENGTH = 1000

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateFeedbackFormData>({
    resolver: zodResolver(createFeedbackSchema),
  })

  const messageValue = watch("message") || ""
  const messageLength = messageValue.length

  const onSubmit = async (data: CreateFeedbackFormData) => {
    setIsSubmitting(true)
    try {
      const response = await submitFeedback(data)
      if (response.success) {
        toast.success("Success!", {
          description: response.message,
        })
        reset()
      }
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to submit feedback. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Your name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="your.email@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message (Max Limit: {MESSAGE_MAX_LENGTH} characters)
        </Label>
        <div className="relative">
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Your message..."
            rows={6}
            aria-invalid={!!errors.message}
            maxLength={MESSAGE_MAX_LENGTH}
          />
          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
            {messageLength}/{MESSAGE_MAX_LENGTH}
          </span>
        </div>
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
