import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import { submitCode } from "@/lib/api/problem"
import type { SubmitCodeRequest, SubmitCodeResponse } from "@/types/problem"
import { toast } from "sonner"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'

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
  const { setConsoleOutput } = useGameStore(
    useShallow((state) => ({
      setConsoleOutput: state.setConsoleOutput,
    }))
  )

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
      const timestamp = new Date().toISOString()

      // Handle compilation error
      if (data.compileError) {
        setConsoleOutput({
          type: 'compilation_error',
          timestamp,
          error: data.compileError,
          statusDescription: data.statusDescription
        })
        toast.error("Compilation Error", {
          description: "Check the console for details"
        })
        return
      }

      // Handle runtime error
      if (data.runtimeError) {
        setConsoleOutput({
          type: 'runtime_error',
          timestamp,
          error: data.runtimeError,
          statusDescription: data.statusDescription
        })
        toast.error("Runtime Error", {
          description: data.statusDescription || "Check the console for details"
        })
        return
      }

      // Handle test results
      setConsoleOutput({
        type: 'test_results',
        timestamp,
        totalTests: data.totalTests,
        passedTests: data.passedTests,
        failedTests: data.failedTests,
        executionTime: data.executionTime,
        memory: data.memory,
        testResults: data.testResults,
        allTestsPassed: data.allTestsPassed
      })

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

