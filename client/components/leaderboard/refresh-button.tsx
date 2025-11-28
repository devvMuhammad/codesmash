"use client"

import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query"
import { RefreshCcw } from "lucide-react"
import { leaderboardOptions } from "@/app/leaderboard/options"

export function RefreshButton() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.refetchQueries({ queryKey: leaderboardOptions.queryKey })
  }

  return (
    <Button
      onClick={handleRefresh}
      variant="outline"
      className="flex gap-3"
    >
      <RefreshCcw className="h-4 w-4" />
      Refresh
    </Button>
  )
}
