import { createAuthClient } from "better-auth/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

export const { useSession, signIn, signOut, getSession } = createAuthClient({
  baseURL: apiBaseUrl,
});
