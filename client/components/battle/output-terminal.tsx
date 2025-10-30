"use client"

import { Terminal } from "lucide-react"
import { CompilationErrorView } from "./compilation-error-view"
import { RuntimeErrorView } from "./runtime-error-view"
import { TestResultsView } from "./test-results-view"
import type { ConsoleOutput } from "@/lib/stores/game-store"

interface OutputTerminalProps {
  output: ConsoleOutput | null
}

export function OutputTerminal({ output }: OutputTerminalProps) {
  // Empty state - no submission yet
  if (!output || output.type === 'idle') {
    return (
      <div className="h-full flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-3 max-w-md px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50">
            <Terminal className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-foreground">No Output Yet</h3>
            <p className="text-xs text-muted-foreground">
              Submit your code to see test results, compilation errors, or runtime output here.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Display appropriate view based on output type
  if (output.type === 'compilation_error') {
    return (
      <CompilationErrorView
        error={output.error || "Unknown compilation error"}
        statusDescription={output.statusDescription}
      />
    )
  }

  if (output.type === 'runtime_error') {
    return (
      <RuntimeErrorView
        error={output.error || "Unknown runtime error"}
        statusDescription={output.statusDescription}
      />
    )
  }

  if (output.type === 'test_results') {
    return (
      <TestResultsView
        totalTests={output.totalTests || 0}
        passedTests={output.passedTests || 0}
        failedTests={output.failedTests || 0}
        executionTime={output.executionTime || "0"}
        memory={output.memory || 0}
        testResults={output.testResults || []}
        allTestsPassed={output.allTestsPassed || false}
      />
    )
  }

  return null
}
