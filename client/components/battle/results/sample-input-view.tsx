"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

interface SampleInputViewProps {
  sampleTestCases: string
  sampleTestCasesOutput: string
}

export function SampleInputView({ sampleTestCases, sampleTestCasesOutput }: SampleInputViewProps) {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Sample Input Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Sample Input</h3>
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <pre className="text-xs font-mono text-foreground whitespace-pre-wrap break-words">
                {sampleTestCases || "No sample input provided"}
              </pre>
            </div>
          </div>

          {/* Expected Output Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Expected Output</h3>
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <pre className="text-xs font-mono text-foreground whitespace-pre-wrap break-words">
                {sampleTestCasesOutput || "No expected output provided"}
              </pre>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
