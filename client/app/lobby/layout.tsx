import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lobby",
  description: "Join battles, create challenges, or find your next opponent in the CodeSmash lobby.",
}

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

