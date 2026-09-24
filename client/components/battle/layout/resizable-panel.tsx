"use client"

import type React from "react"

import { useState, useRef, useCallback, type ReactNode } from "react"
import { motion } from "framer-motion"

interface ResizablePanelProps {
  children: ReactNode
  direction: "horizontal" | "vertical"
  size: number // percentage
  onResize: (size: number) => void
  minSize?: number
  maxSize?: number
  className?: string
}

export function ResizablePanel({
  children,
  direction,
  size,
  onResize,
  minSize = 10,
  maxSize = 90,
  className = "",
}: ResizablePanelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return

        const container = containerRef.current.parentElement
        if (!container) return

        const rect = container.getBoundingClientRect()
        let newSize: number

        if (direction === "horizontal") {
          const x = e.clientX - rect.left
          newSize = (x / rect.width) * 100
        } else {
          const y = e.clientY - rect.top
          newSize = (y / rect.height) * 100
        }

        newSize = Math.max(minSize, Math.min(maxSize, newSize))
        onResize(newSize)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [direction, minSize, maxSize, onResize],
  )

  const panelStyle = direction === "horizontal" ? { width: `${size}%` } : { height: `${size}%` }

  const handleStyle =
    direction === "horizontal"
      ? { cursor: "col-resize", right: -2, top: 0, bottom: 0, width: 4 }
      : { cursor: "row-resize", left: 0, right: 0, bottom: -2, height: 4 }

  return (
    <motion.div
      ref={containerRef}
      style={panelStyle}
      className={`relative ${className}`}
      animate={panelStyle}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}

      {/* Resize Handle */}
      <div
        className={`absolute z-10 ${
          direction === "horizontal"
            ? "hover:bg-blue-500/20 active:bg-blue-500/30"
            : "hover:bg-blue-500/20 active:bg-blue-500/30"
        } ${isDragging ? "bg-blue-500/30" : ""}`}
        style={handleStyle}
        onMouseDown={handleMouseDown}
      />
    </motion.div>
  )
}
