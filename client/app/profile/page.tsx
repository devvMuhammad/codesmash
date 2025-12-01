import { getSessionServerSide } from "@/lib/api/user";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const session = await getSessionServerSide()

  if (!session) {
    redirect("/auth/login")
  }
  redirect(`/profile/${session.user.id}`)
}