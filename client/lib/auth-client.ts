import { createAuthClient } from "better-auth/react";
import { API_BASE_URL } from "./config";

const authClient = createAuthClient({
  baseURL: API_BASE_URL
});


export type Session = typeof authClient.$Infer.Session
export const { useSession, signIn, signOut, getSession } = authClient
