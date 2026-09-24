"use client"

import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { useSubmitCode } from "@/hooks/use-submit-code"

export function SubmitCode() {
  const { submitCode, isPending } = useSubmitCode()

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20"
      onClick={() => submitCode()}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Send className="h-4 w-4 mr-2" />
      )}
      Submit
    </Button>
  )
}