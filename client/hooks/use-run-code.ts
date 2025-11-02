import { useMutation } from "@tanstack/react-query"
import { runCode } from "@/lib/api/problem"
import type { RunCodeRequest } from "@/types/problem"
import { toast } from "sonner"
import { useGameStore } from "@/providers/game-store-provider"
import { useShallow } from 'zustand/react/shallow'
import { useParams } from "next/navigation"

export function useRunCode() {
  const params = useParams()
  const gameId = params?.gameId as string

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
      if (!problemId) {
        throw new Error("Problem ID not found")
      }

      const request: RunCodeRequest = {
        code: currentPlayerCode,
        language: selectedLanguage as RunCodeRequest["language"],
        gameId
      }
      return runCode(problemId, request)
    },
    onSuccess: (data) => {
      const timestamp = new Date().toISOString()

      // Handle compilation error
      if (data.compileError) {
        setConsoleOutput({
          type: 'compilation_error',
          source: 'run',
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
          source: 'run',
          timestamp,
          error: data.runtimeError,
          statusDescription: data.statusDescription
        })
        toast.error("Runtime Error", {
          description: data.statusDescription || "Check the console for details"
        })
        return
      }

      // Handle successful run with sample test results
      setConsoleOutput({
        type: 'run_results',
        source: 'run',
        timestamp,
        stdout: data.stdout,
        sampleTestResults: data.sampleTestResults,
        executionTime: data.executionTime,
        memory: data.memory
      })

      const passedTests = data.sampleTestResults.filter(t => t.passed).length
      const totalTests = data.sampleTestResults.length

      if (passedTests === totalTests) {
        toast.success(`All sample tests passed! (${passedTests}/${totalTests})`, {
          description: `Execution time: ${data.executionTime}s`,
        })
      } else {
        toast.warning(`${passedTests}/${totalTests} sample tests passed`, {
          description: `${totalTests - passedTests} test(s) failed`,
        })
      }
    },
    onError: (error) => {
      toast.error("Failed to run code", {
        description: error.message,
      })
    },
  })

  return {
    runCode: mutation.mutate,
    isPending: mutation.isPending,
    isDisabled: !problem?._id
  }
}
