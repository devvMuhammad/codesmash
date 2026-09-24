import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Code, Zap, Users, Trophy } from "lucide-react"
import { CommonNavbar } from "@/components/common-navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Challenge your friends in real-time coding duels. Compete, practice, and learn by solving problems together.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Challenge your friends in <span className="text-primary">real-time coding duels</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Compete, practice, and learn by solving problems together. Test your skills against friends in
              head-to-head coding battles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-blue" asChild>
                <a href="/live-battles">Enter Battle Arena</a>
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Code Preview */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Two Sum Problem</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <pre className="text-foreground">
                  {`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`}
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose CodeSmash?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate platform for competitive programming and skill development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:glow-blue-sm transition-all duration-300">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Real-time Battles</h3>
              <p className="text-muted-foreground">
                Code simultaneously with your opponent and see changes in real-time
              </p>
            </Card>

            <Card className="p-6 text-center hover:glow-blue-sm transition-all duration-300">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Multiplayer Ready</h3>
              <p className="text-muted-foreground">
                Challenge friends or get matched with developers at your skill level
              </p>
            </Card>

            <Card className="p-6 text-center hover:glow-blue-sm transition-all duration-300">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Skill Tracking</h3>
              <p className="text-muted-foreground">Track your progress and climb the leaderboards with every victory</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">CodeSmash</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 text-center text-sm text-muted-foreground">
            © 2025 CodeSmash. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
