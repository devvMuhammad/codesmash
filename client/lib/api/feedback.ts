import { API_BASE_URL } from "@/lib/config"
import { type CreateFeedbackFormData, createFeedbackResponseSchema, type CreateFeedbackResponse } from "@/lib/validations/feedback"

export async function submitFeedback(data: CreateFeedbackFormData): Promise<CreateFeedbackResponse> {
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(errorData.message || "Failed to submit feedback")
  }

  const result = await response.json()
  return createFeedbackResponseSchema.parse(result)
}
