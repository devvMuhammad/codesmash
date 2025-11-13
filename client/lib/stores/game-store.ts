import { createStore } from 'zustand/vanilla'
import { PlayerRolesType, Problem, User } from '@/lib/validations/game'
import { SUPPORTED_LANGUAGES } from '../config'
import type { TestResult } from '@/types/problem'

export interface GameResult {
  reason: 'forfeit' | 'time_up' | 'completed'
  winner?: string // undefined for draws
  message: string
}

// Sample test result (for run code feature)
export interface SampleTestResult {
  testCase: number
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
}

// Base interface for common fields
interface BaseConsoleOutput {
  timestamp: string
}

// Idle state - no output yet
interface IdleConsoleOutput extends BaseConsoleOutput {
  type: 'idle'
  source: null
}

// Compilation error (can be from run or submission)
interface CompilationErrorOutput extends BaseConsoleOutput {
  type: 'compilation_error'
  source: 'run' | 'submission'
  error: string
  statusDescription?: string
}

// Runtime error (can be from run or submission)
interface RuntimeErrorOutput extends BaseConsoleOutput {
  type: 'runtime_error'
  source: 'run' | 'submission'
  error: string
  statusDescription?: string
}

// Test results from submission (all test cases)
interface SubmissionTestResultsOutput extends BaseConsoleOutput {
  type: 'test_results'
  source: 'submission'
  totalTests: number
  passedTests: number
  failedTests: number
  executionTime: string
  memory: number
  testResults: TestResult[]
  allTestsPassed: boolean
}

// Run results from run code (sample test cases + stdout)
interface RunCodeResultsOutput extends BaseConsoleOutput {
  type: 'run_results'
  source: 'run'
  stdout: string
  sampleTestResults: SampleTestResult[]
  executionTime: string
  memory: number
}

// Discriminated union of all console output types
export type ConsoleOutput =
  | IdleConsoleOutput
  | CompilationErrorOutput
  | RuntimeErrorOutput
  | SubmissionTestResultsOutput
  | RunCodeResultsOutput

export interface GameState {
  // Core game data
  userRole: PlayerRolesType | null

  // Problem data
  problem: Problem | null

  // Player data
  currentPlayerData: User | null
  opponentData: User | null

  // Game state
  timeRemaining: number
  gameStatus: "waiting" | "ready_to_start" | "in_progress" | "completed" | "cancelled"
  gameResult: GameResult | null

  // Code state
  currentPlayerCode: string
  opponentCode: string

  // Language
  selectedLanguage: string;

  // WebSocket state
  isConnected: boolean
  opponentConnected: boolean

  // Console output state
  consoleOutput: ConsoleOutput | null

  // Test progress state
  hostTestsPassed: number
  challengerTestsPassed: number
}

export interface GameActions {
  // Connection actions
  setConnected: (connected: boolean) => void
  setOpponentConnected: (connected: boolean) => void

  // Player data actions
  setCurrentPlayerData: (data: User | null) => void
  setOpponentData: (data: User | null) => void

  // Code actions
  setCurrentPlayerCode: (code: string) => void
  setOpponentCode: (code: string) => void

  // Game state actions
  setGameStatus: (status: "waiting" | "ready_to_start" | "in_progress" | "completed" | "cancelled") => void
  setGameResult: (result: GameResult | null) => void

  // Language state actions
  setSelectedLanguage: (language: string) => void

  // Console output actions
  setConsoleOutput: (output: ConsoleOutput | null) => void
  clearConsoleOutput: () => void

  // Test progress actions
  setHostTestsPassed: (passed: number) => void
  setChallengerTestsPassed: (passed: number) => void
  updateTestProgress: (role: PlayerRolesType, passed: number) => void
  // used to set time remaining to 0 when game is finished
  setTimeRemaining: (remaining: number) => void
}

export type GameStore = GameState & GameActions

export const defaultInitState: GameState = {
  userRole: null,
  problem: null,
  currentPlayerData: null,
  opponentData: null,
  timeRemaining: 0,
  gameStatus: "waiting",
  gameResult: null,
  currentPlayerCode: "",
  opponentCode: "",
  isConnected: false,
  opponentConnected: false,
  selectedLanguage: SUPPORTED_LANGUAGES[0].name,
  consoleOutput: null,
  hostTestsPassed: 0,
  challengerTestsPassed: 0,
}

export const createGameStore = (
  initState: GameState = defaultInitState,
) => {
  return createStore<GameStore>()((set) => ({
    ...initState,

    // Connection actions
    setConnected: (connected: boolean) =>
      set({ isConnected: connected }),

    setOpponentConnected: (connected: boolean) =>
      set({ opponentConnected: connected }),

    // Player data actions
    setCurrentPlayerData: (data: User | null) =>
      set({ currentPlayerData: data }),

    setOpponentData: (data: User | null) =>
      set({ opponentData: data }),

    // Code actions
    setCurrentPlayerCode: (code: string) =>
      set({ currentPlayerCode: code }),

    setOpponentCode: (code: string) =>
      set({ opponentCode: code }),

    // Game state actions
    setGameStatus: (status: "waiting" | "ready_to_start" | "in_progress" | "completed" | "cancelled") =>
      set({ gameStatus: status }),

    setGameResult: (result: GameResult | null) =>
      set({ gameResult: result }),

    // Language state actions
    setSelectedLanguage: (language: string) =>
      set({ selectedLanguage: language }),

    // Console output actions
    setConsoleOutput: (output: ConsoleOutput | null) =>
      set({ consoleOutput: output }),

    clearConsoleOutput: () =>
      set({ consoleOutput: null }),

    // Test progress actions
    setHostTestsPassed: (passed: number) =>
      set({ hostTestsPassed: passed }),

    setChallengerTestsPassed: (passed: number) =>
      set({ challengerTestsPassed: passed }),

    setTimeRemaining: (remaining: number) =>
      set({ timeRemaining: remaining }),

    updateTestProgress: (role: PlayerRolesType, passed: number) => {
      if (role === 'host') {
        set({ hostTestsPassed: passed })
      } else if (role === 'challenger') {
        set({ challengerTestsPassed: passed })
      }
    },
  }))
}