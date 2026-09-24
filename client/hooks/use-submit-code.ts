import { useMutation } from "@tanstack/react-query"
import { submitCode } from "@/lib/api/problem"
import type { SubmitCodeRequest } from "@/types/problem"
import { toast } from "sonner"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'
import { useParams } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export function useSubmitCode() {
  const params = useParams()
  const gameId = params?.gameId as string
  const { data: session } = useSession()

  const { setConsoleOutput, problem, currentPlayerCode, selectedLanguage } = useGameStore(
    useShallow((state) => ({
      setConsoleOutput: state.setConsoleOutput,
      problem: state.problem,
      currentPlayerCode: state.currentPlayerCode,
      selectedLanguage: state.selectedLanguage,
    }))
  )

  const mutation = useMutation({
    mutationFn: async () => {
      const problemId = problem?._id
      const userId = session?.user?.id

      if (!problemId) {
        throw new Error("Problem ID not found")
      }

      if (!userId) {
        throw new Error("User ID not found")
      }

      if (!gameId) {
        throw new Error("Game ID not found")
      }

      const request: SubmitCodeRequest = {
        code: currentPlayerCode,
        language: selectedLanguage as SubmitCodeRequest["language"],
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
          source: 'submission',
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
          source: 'submission',
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
        source: 'submission',
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

  return {
    submitCode: mutation.mutate,
    isPending: mutation.isPending,
    isDisabled: !problem?._id || !session?.user?.id || !gameId
  }
}

