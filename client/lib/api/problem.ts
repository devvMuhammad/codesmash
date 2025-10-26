import { API_BASE_URL } from "@/lib/config"
import type { SubmitCodeRequest, SubmitCodeResponse } from "@/types/problem"

export async function submitCode(
  problemId: string,
  request: SubmitCodeRequest
): Promise<SubmitCodeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/problems/${problemId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || `Failed to submit code: ${response.statusText}`)
  }

  return response.json()
}

