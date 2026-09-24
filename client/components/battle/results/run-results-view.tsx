"use client"

import { CheckCircle, XCircle, Clock, Zap, Terminal } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SampleTestCaseCard } from "../test-cases/sample-test-case-card"
import type { SampleTestResult } from "@/lib/stores/game-store"

interface RunResultsViewProps {
  stdout: string
  sampleTestResults: SampleTestResult[]
  executionTime: string
  memory: number
}

export function RunResultsView({
  stdout,
  sampleTestResults,
  executionTime,
  memory
}: RunResultsViewProps) {
  const passedTests = sampleTestResults.filter(t => t.passed).length
  const totalTests = sampleTestResults.length
  const allTestsPassed = passedTests === totalTests

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Summary Header */}
        <div className={`p-4 rounded-lg border ${allTestsPassed
          ? "bg-blue-500/10 border-blue-500/20"
          : "bg-orange-500/10 border-orange-500/20"
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className={`h-5 w-5 ${allTestsPassed ? "text-blue-500" : "text-orange-500"}`} />
              <div>
                <h3 className={`text-sm font-semibold ${allTestsPassed ? "text-blue-500" : "text-orange-500"
                  }`}>
                  Run Complete
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {passedTests} of {totalTests} sample test(s) passed
                </p>
              </div>
            </div>
            <Badge
              variant={allTestsPassed ? "default" : "destructive"}
              className={allTestsPassed
                ? "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/20"
                : "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 border-orange-500/20"
              }
            >
              {passedTests}/{totalTests}
            </Badge>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-muted/30 border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Execution Time</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {executionTime}s
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-muted/30 border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Memory Used</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {(memory / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stdout Output */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Your Output:</h4>
          <Card className="bg-muted/50 border-border/40 py-0">
            <div className="p-4">
              <pre className="text-xs font-mono text-foreground whitespace-pre-wrap break-words">
                {stdout || "(no output)"}
              </pre>
            </div>
          </Card>
        </div>

        {/* Sample Test Cases Header */}
        <div className="flex items-center justify-between pt-2">
          <h4 className="text-sm font-medium text-foreground">Sample Test Cases</h4>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-green-500">
              <CheckCircle className="h-3 w-3" />
              {passedTests}
            </span>
            {totalTests - passedTests > 0 && (
              <span className="flex items-center gap-1 text-red-500">
                <XCircle className="h-3 w-3" />
                {totalTests - passedTests}
              </span>
            )}
          </div>
        </div>

        {/* Sample Test Results */}
        <div className="space-y-3">
          {sampleTestResults.map((testResult) => (
            <SampleTestCaseCard key={testResult.testCase} testResult={testResult} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
