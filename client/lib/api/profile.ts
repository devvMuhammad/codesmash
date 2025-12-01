import { UserProfileData, userProfileDataSchema } from "@/lib/validations/profile"

/**
 * Fetch user profile data from the server
 */
export async function getUserProfile(profileId: string): Promise<UserProfileData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${profileId}/profile`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`)
  }

  const data = await response.json()
  return userProfileDataSchema.parse(data)
}

