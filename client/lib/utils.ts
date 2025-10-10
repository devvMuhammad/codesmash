import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSession } from "./auth-client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getHostId() {
  const session = await getSession()
  if (!session || !session.data) {
    throw new Error("User not authenticated")
  }

  return session.data.user.id
}