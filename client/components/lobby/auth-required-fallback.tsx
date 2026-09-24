"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

export function AuthRequiredFallback() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 py-4"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Lock className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Sign in to create challenges
          </h3>
          <p className="text-sm text-muted-foreground">
            You need to be signed in to challenge your friends to coding battles.
          </p>
        </div>

        <Button asChild className="w-full glow-blue" size="lg">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    </motion.div>
  )
}

