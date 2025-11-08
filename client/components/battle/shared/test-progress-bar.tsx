"use client"

import { motion } from "framer-motion"

interface TestProgressBarProps {
  passed: number
  total: number
  variant: "self" | "opponent"
  className?: string
}
export function TestProgressBar({
  passed,
  total,
  variant,
  className = ""
}: TestProgressBarProps) {

  const percentage = total > 0 ? (passed / total) * 100 : 0
  const color = variant === "self" ? "bg-green-500" : "bg-destructive"

  return (
    <div className={`h-1 bg-muted/20 overflow-hidden ${className}`}>
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100
        }}
      />
    </div>
  )
}
