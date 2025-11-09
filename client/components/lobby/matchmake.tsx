"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Zap, Swords } from "lucide-react"
import { motion } from "framer-motion"

interface MatchmakeProps {
  children?: React.ReactNode
}

export function Matchmake({ children }: MatchmakeProps) {
  const [open, setOpen] = useState(false)
  const [dots, setDots] = useState("")
  const [searchText, setSearchText] = useState("Finding opponent")

  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    const textInterval = setInterval(() => {
      setSearchText((prev) => {
        const texts = ["Finding opponent", "Analyzing skill level", "Preparing battle arena", "Almost ready"]
        const currentIndex = texts.indexOf(prev)
        return texts[(currentIndex + 1) % texts.length]
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    setDots("")
    setSearchText("Finding opponent")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* {children || (
          <Button size="lg" className="glow-blue">
            <Zap className="h-4 w-4 mr-2" />
            Find Match
          </Button>
        )} */}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-6 py-8">
          {/* Animated Swords */}
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Swords className="h-16 w-16 text-primary" />
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              />
            </motion.div>
          </div>

          {/* Search Text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {searchText}
              {dots}
            </h3>
            <p className="text-muted-foreground">This might take a few seconds, hang tight!</p>
          </div>

          {/* Cancel Button */}
          <Button variant="destructive" onClick={handleClose} className="mt-4">
            Cancel Matchmaking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}