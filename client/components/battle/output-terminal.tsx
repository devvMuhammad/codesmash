"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, AlertCircle, XCircle, Play, Clock, Zap } from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  type: "info" | "success" | "error" | "warning"
  message: string
}

export function OutputTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const simulateExecution = () => {
    setIsRunning(true)
    setLogs([])

    const executionLogs: Omit<LogEntry, "id">[] = [
      { timestamp: "12:05:33", type: "info", message: "▶ Running test cases..." },
      { timestamp: "12:05:34", type: "success", message: "✔ Test Case 1 Passed" },
      { timestamp: "12:05:35", type: "success", message: "✔ Test Case 2 Passed" },
      { timestamp: "12:05:36", type: "warning", message: "⚠ Memory usage: 42.1MB" },
      { timestamp: "12:05:37", type: "info", message: "ℹ Execution time: 1.32s" },
      { timestamp: "12:05:38", type: "success", message: "🎉 All tests passed!" },
    ]

    executionLogs.forEach((log, index) => {
      setTimeout(
        () => {
          setLogs((prev) => [...prev, { ...log, id: `log-${index}` }])
          if (index === executionLogs.length - 1) {
            setIsRunning(false)
          }
        },
        (index + 1) * 800,
      )
    })
  }

  useEffect(() => {
    // Auto-run simulation on mount
    const timer = setTimeout(simulateExecution, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getLogIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <Play className="h-4 w-4 text-blue-400" />
    }
  }

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400"
      case "error":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-blue-400"
    }
  }

  return (
    <Tabs defaultValue="output" className="h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-4 rounded-none border-b border-border/40 bg-muted/20">
        <TabsTrigger value="output" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
          Output
        </TabsTrigger>
        <TabsTrigger value="input" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
          Input
        </TabsTrigger>
        <TabsTrigger value="errors" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
          Errors
        </TabsTrigger>
        <TabsTrigger value="results" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
          Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="output" className="flex-1 mt-0">
        <ScrollArea className="h-full">
          <div className="p-4 font-mono text-sm space-y-1 bg-muted/10">
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-center space-x-2 ${getLogColor(log.type)}`}
                >
                  <span className="text-muted-foreground text-xs">[{log.timestamp}]</span>
                  {getLogIcon(log.type)}
                  <span>{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {isRunning && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="flex items-center space-x-2 text-blue-400"
              >
                <span className="text-muted-foreground text-xs">[{new Date().toLocaleTimeString()}]</span>
                <Clock className="h-4 w-4" />
                <span>Processing...</span>
                <span className="bg-blue-400 w-2 h-4 inline-block ml-1"></span>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="input" className="flex-1 mt-0">
        <ScrollArea className="h-full">
          <div className="p-4 font-mono text-sm bg-muted/10">
            <div className="text-muted-foreground mb-2">Test Case 1:</div>
            <div className="bg-muted/50 p-3 rounded border border-border">
              <span className="text-blue-400">nums</span> = <span className="text-green-400">[2,7,11,15]</span>
              <br />
              <span className="text-blue-400">target</span> = <span className="text-yellow-400">9</span>
            </div>

            <div className="text-muted-foreground mb-2 mt-4">Test Case 2:</div>
            <div className="bg-muted/50 p-3 rounded border border-border">
              <span className="text-blue-400">nums</span> = <span className="text-green-400">[3,2,4]</span>
              <br />
              <span className="text-blue-400">target</span> = <span className="text-yellow-400">6</span>
            </div>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="errors" className="flex-1 mt-0">
        <ScrollArea className="h-full">
          <div className="p-4 font-mono text-sm bg-muted/10">
            <div className="text-green-400 flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No errors found</span>
            </div>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="results" className="flex-1 mt-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4 bg-muted/10">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Your Solution</span>
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>2/2 Passed</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Opponent Solution</span>
              <div className="flex items-center space-x-2 text-yellow-400">
                <AlertCircle className="h-4 w-4" />
                <span>Still coding...</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Performance
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-green-400">Runtime: 68ms (beats 85.2%)</div>
                <div className="text-blue-400">Memory: 42.1MB (beats 91.4%)</div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
