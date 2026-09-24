import { z } from "zod"

export const createFeedbackSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
})

export type CreateFeedbackFormData = z.infer<typeof createFeedbackSchema>

export const createFeedbackResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  feedbackId: z.string().optional(),
})

export type CreateFeedbackResponse = z.infer<typeof createFeedbackResponseSchema>
