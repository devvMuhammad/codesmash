"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SampleTestResult } from "@/lib/stores/game-store"

interface SampleTestCaseCardProps {
  testResult: SampleTestResult
}

export function SampleTestCaseCard({ testResult }: SampleTestCaseCardProps) {
  return (
    <Card
      className={`p-4 border ${
        testResult.passed
          ? "bg-green-500/5 border-green-500/20"
          : "bg-red-500/5 border-red-500/20"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {testResult.passed ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm font-medium text-foreground">
            Test Case {testResult.testCase}
          </span>
        </div>
        <Badge
          variant={testResult.passed ? "default" : "destructive"}
          className={testResult.passed
            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20"
            : "bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/20"
          }
        >
          {testResult.passed ? "Passed" : "Failed"}
        </Badge>
      </div>

      <div className="space-y-2">
        {/* Input */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Input:</p>
          <div className="p-2 bg-muted/50 rounded border border-border/40">
            <code className="text-xs font-mono text-foreground">
              {testResult.input}
            </code>
          </div>
        </div>

        {/* Expected Output */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Expected Output:</p>
          <div className="p-2 bg-muted/50 rounded border border-border/40">
            <code className="text-xs font-mono text-foreground">
              {testResult.expectedOutput}
            </code>
          </div>
        </div>

        {/* Your Output */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Your Output:</p>
          <div className={`p-2 rounded border ${
            testResult.passed
              ? "bg-green-500/5 border-green-500/20"
              : "bg-red-500/5 border-red-500/20"
          }`}>
            <code className={`text-xs font-mono ${
              testResult.passed ? "text-green-500" : "text-red-500"
            }`}>
              {testResult.actualOutput || "(no output)"}
            </code>
          </div>
        </div>
      </div>
    </Card>
  )
}
