"use client"

import { CommonNavbar } from "@/components/common-navbar"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/lib/auth-client"

export default function LoginPage() {
  const signInMutation = useMutation({
    mutationFn: async () => {
      const data = await signIn.social({
        provider: "google",
        callbackURL: process.env.NEXT_PUBLIC_APP_URL + "/lobby",
      })
      return data
    },
    onSuccess: (data) => {
      if (data.error) {
        throw new Error(data.error.message || data.error.statusText);
      }
      console.log("Sign in initiated:", data)
      // Redirect to lobby after successful sign in
      // router.push("/lobby")
    },
    onError: (error) => {
      console.error("Sign in error:", error)
      return error;
    },
  })

  return (
    <div className="min-h-screen bg-background grid grid-rows-[auto_1fr]">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Welcome to CodeSmash
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Challenge your friends in real-time coding duels. Compete, practice, and learn by solving problems together.
              </p>
              <p className="text-muted-foreground">
                Join thousands of developers in epic 1v1 battles. Improve your skills, climb the leaderboard, and have fun while coding.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Real-time coding battles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Challenge friends or find matches</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Practice with curated problems</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Track your progress and ranking</span>
              </div>
            </div>
          </div>

          {/* Right side - Sign in buttons */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="w-full max-w-md space-y-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Get Started</h2>
                <p className="text-muted-foreground">Sign in to join the coding battles</p>
              </div>

              {signInMutation.error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {signInMutation.error.message}
                </div>
              )}

              <Button
                onClick={() => signInMutation.mutate()}
                disabled={signInMutation.isPending}
                className="w-full h-12 text-base font-medium glow-blue"
                size="lg"
              >
                {signInMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
