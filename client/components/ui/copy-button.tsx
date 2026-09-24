"use client"

import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Copy, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

interface CopyButtonProps extends React.ComponentProps<"button"> {
  textToCopy: string
  children?: React.ReactNode
  copiedText?: string
  copiedDuration?: number
  onCopy?: () => void
}

export function CopyButton({
  textToCopy,
  children,
  copiedText = "Copied!",
  className,
  size = "sm",
  variant = "default",
  copiedDuration = 2000,
  onCopy,
  ...buttonProps
}: CopyButtonProps & VariantProps<typeof buttonVariants>) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), copiedDuration)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  return (
    <Button
      {...buttonProps}
      onClick={handleCopy}
      variant={copied ? "outline" : variant}
      size={size}
      className={cn(className)}
    >
      {copied ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          {copiedText}
        </>
      ) : (
        children || (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </>
        )
      )}
    </Button>
  )
}
