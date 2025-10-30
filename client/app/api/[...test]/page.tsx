import { API_BASE_URL } from "@/lib/config";
import { redirect } from "next/navigation";

export default async function TestPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

  const hah = await searchParams

  return redirect(API_BASE_URL + "/api/auth/callback/google?" + Object.entries(hah).map(([key, value]) => key + "=" + value).join("&"))
}