import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { API_BASE_URL } from "./config";

const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [inferAdditionalFields({
    user: {
      username: {
        type: "string",
        defaultValue: "",
      },
      aura: {
        type: "number",
        defaultValue: 0,
      }
    }
  })],
});


export type Session = typeof authClient.$Infer.Session
export const { useSession, signIn, signOut, getSession } = authClient
