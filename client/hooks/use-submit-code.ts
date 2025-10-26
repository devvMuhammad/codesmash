import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import { submitCode } from "@/lib/api/problem"
import type { SubmitCodeRequest, SubmitCodeResponse } from "@/types/problem"
import { toast } from "sonner"

interface SubmitCodeParams {
  problemId: string
  code: string
  language: string
  gameId: string
  userId: string
}

export function useSubmitCode(): UseMutationResult<
  SubmitCodeResponse,
  Error,
  SubmitCodeParams
> {
  return useMutation({
    mutationFn: async ({ problemId, code, language, gameId, userId }: SubmitCodeParams) => {
      const request: SubmitCodeRequest = {
        code,
        language: language as SubmitCodeRequest["language"],
        gameId,
        userId
      }
      return submitCode(problemId, request)
    },
    onSuccess: (data) => {
      if (data.allTestsPassed) {
        toast.success(`All tests passed! (${data.passedTests}/${data.totalTests})`, {
          description: `Execution time: ${data.executionTime}ms | Memory: ${data.memory}KB`,
        })
      } else {
        toast.warning(`${data.passedTests}/${data.totalTests} tests passed`, {
          description: `${data.failedTests} test(s) failed`,
        })
      }
    },
    onError: (error) => {
      toast.error("Failed to submit code", {
        description: error.message,
      })
    },
  })
}

