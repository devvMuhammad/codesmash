"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { TestResult } from "@/types/problem"

interface TestCaseCardProps {
  testResult: TestResult
}

export function TestCaseCard({ testResult }: TestCaseCardProps) {
  const isPassed = testResult.status === "PASS"

  return (
    <Card className={`p-4 border ${
      isPassed
        ? "border-green-500/20 bg-green-500/5"
        : "border-red-500/20 bg-red-500/5"
    }`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPassed ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm font-medium text-foreground">
              Test Case {testResult.testCase}
            </span>
          </div>
          <span className={`text-xs font-semibold ${
            isPassed ? "text-green-500" : "text-red-500"
          }`}>
            {testResult.status}
          </span>
        </div>

        {/* Test Details */}
        <div className="space-y-2 text-xs font-mono">
          {/* Input */}
          <div>
            <span className="text-muted-foreground">Input: </span>
            <span className="text-blue-400">{String(testResult.input)}</span>
          </div>

          {/* Expected Output */}
          <div>
            <span className="text-muted-foreground">Expected: </span>
            <span className="text-green-400">{String(testResult.expected)}</span>
          </div>

          {/* Actual Output */}
          <div>
            <span className="text-muted-foreground">Your Output: </span>
            <span className={isPassed ? "text-green-400" : "text-red-400"}>
              {String(testResult.actual) || "(empty)"}
            </span>
          </div>
        </div>

        {/* Error message if present */}
        {testResult.error && (
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs text-red-400 font-mono">{testResult.error}</p>
          </div>
        )}
      </div>
    </Card>
  )
}