export const gameConfig = {
  defaults: {
    difficulty: "medium" as const,
    timeLimit: 30, // minutes
    expiresIn: 60, // minutes
  },
  options: {
    timeLimit: [
      { value: 1, label: "1 minute" },
      { value: 5, label: "5 minutes" },
      { value: 15, label: "15 minutes" },
      { value: 30, label: "30 minutes" },
      { value: 45, label: "45 minutes" },
      { value: 60, label: "1 hour" },
      { value: 90, label: "1.5 hours" },
      { value: 120, label: "2 hours" },
    ],
    expiresIn: [
      { value: 15, label: "15 minutes" },
      { value: 30, label: "30 minutes" },
      { value: 60, label: "1 hour" },
      { value: 120, label: "2 hours" },
      { value: 1440, label: "1 day" },
    ],
  },
}