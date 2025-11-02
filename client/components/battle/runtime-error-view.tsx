"use client"

import { XCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RuntimeErrorViewProps {
  error: string
  statusDescription?: string
  source?: 'run' | 'submission'
}

export function RuntimeErrorView({ error, statusDescription }: RuntimeErrorViewProps) {
  // Parse the status description for specific error types
  const getErrorType = () => {
    if (statusDescription?.includes("Time Limit")) {
      return { label: "Time Limit Exceeded", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" }
    }
    if (statusDescription?.includes("SIGSEGV") || statusDescription?.includes("Segmentation")) {
      return { label: "Segmentation Fault", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" }
    }
    if (statusDescription?.includes("SIGFPE")) {
      return { label: "Arithmetic Error", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" }
    }
    return { label: "Runtime Error", color: "bg-red-500/10 text-red-500 border-red-500/20" }
  }

  const errorType = getErrorType()

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Error Header */}
        <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <XCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-orange-500">Runtime Error</h3>
              {statusDescription && (
                <Badge variant="outline" className={errorType.color}>
                  {errorType.label}
                </Badge>
              )}
            </div>
            {statusDescription && (
              <p className="text-xs text-muted-foreground mt-1">{statusDescription}</p>
            )}
          </div>
        </div>

        {/* Error Details */}
        <Card className="bg-muted/50 border-orange-500/20 py-0">
          <div className="p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Error Output:</h4>
            <pre className="text-xs font-mono text-orange-500 whitespace-pre-wrap break-words">
              {error}
            </pre>
          </div>
        </Card>

        {/* Helpful Tips */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
          <h4 className="text-sm font-medium text-foreground mb-2">💡 Common causes:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            {errorType.label === "Time Limit Exceeded" ? (
              <>
                <li>Your algorithm may be too slow for the given constraints</li>
                <li>Consider optimizing your solution&apos;s time complexity</li>
                <li>Look for infinite loops or unnecessary iterations</li>
              </>
            ) : errorType.label === "Segmentation Fault" ? (
              <>
                <li>Accessing array index out of bounds</li>
                <li>Dereferencing null or invalid pointers</li>
                <li>Stack overflow from deep recursion</li>
              </>
            ) : errorType.label === "Arithmetic Error" ? (
              <>
                <li>Division by zero</li>
                <li>Modulo by zero</li>
                <li>Integer overflow or underflow</li>
              </>
            ) : (
              <>
                <li>Check for null or undefined variable access</li>
                <li>Verify array or string bounds</li>
                <li>Look for unhandled edge cases</li>
                <li>Ensure proper error handling in your code</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}
