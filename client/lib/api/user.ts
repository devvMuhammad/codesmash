import { cache } from "react";
import { getSession, Session } from "@/lib/auth-client"
import { headers } from "next/headers";

export const getSessionServerSide = cache(async (): Promise<Session | null> => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return session.data;
});


