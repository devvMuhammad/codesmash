import { UserX } from "lucide-react";
import { CommonNavbar } from "../common-navbar";
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-2xl mx-auto mt-16">
          <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="rounded-full bg-muted p-6 mb-6">
              <UserX className="h-16 w-16 text-muted-foreground" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Profile Not Found</h1>

            <p className="text-muted-foreground mb-6 max-w-md">
              The profile you&apos;re looking for doesn&apos;t exist or has been removed. Please
              check the URL and try again.
            </p>

            <div className="flex gap-3">
              <Button asChild variant="default">
                <Link href="/">Go to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/lobby">Browse Challenges</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}