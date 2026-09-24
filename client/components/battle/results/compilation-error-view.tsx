"use client"

import { AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

interface CompilationErrorViewProps {
  error: string
  statusDescription?: string
  source?: 'run' | 'submission'
}

export function CompilationErrorView({ error, statusDescription }: CompilationErrorViewProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Error Header */}
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-destructive">Compilation Error</h3>
            {statusDescription && (
              <p className="text-xs text-muted-foreground mt-1">{statusDescription}</p>
            )}
          </div>
        </div>

        {/* Error Details */}
        <Card className="bg-muted/50 border-destructive/20">
          <div className="p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Error Details:</h4>
            <pre className="text-xs font-mono text-destructive whitespace-pre-wrap break-words">
              {error}
            </pre>
          </div>
        </Card>

        {/* Helpful Tips */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
          <h4 className="text-sm font-medium text-foreground mb-2">💡 Tips to fix:</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Check for syntax errors in your code</li>
            <li>Ensure all brackets and parentheses are properly closed</li>
            <li>Verify variable and function names are spelled correctly</li>
            <li>Make sure you&apos;re using the correct language syntax</li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}
