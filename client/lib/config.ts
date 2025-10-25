export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

export const SUPPORTED_LANGUAGES = [
  { title: "JavaScript", name: "javascript" },
  { title: "Python", name: "python" },
  { title: "C++", name: "cpp" },
  { title: "Java", name: "java" },
]