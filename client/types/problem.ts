import type { z } from "zod"
import { difficultySchema } from "@/lib/validations/game"

export type DifficultyType = z.infer<typeof difficultySchema>

export interface IProblem {
  _id?: string;
  title: string;
  description: string;
  difficulty: DifficultyType;
  testCases: string;
  sampleTestCases: string;
  sampleTestCasesOutput: string;
  initialCodes: {
    python: string;
    javascript: string;
    java: string;
    cpp: string;
  };
  correctOutput: string;
  createdAt: Date;
  updatedAt: Date;
}

// Language types for code submission
export type SupportedLanguage = "javascript" | "python" | "java" | "cpp";

// Test result status
export type TestStatus = "PASS" | "FAIL" | "ERROR";

// Single test case result
export interface TestResult {
  testCase: number;
  input: unknown;
  expected: unknown;
  actual: unknown;
  status: TestStatus;
  error?: string;
}

// Code submission request
export interface SubmitCodeRequest {
  code: string;
  language: SupportedLanguage;
  gameId: string;
  userId: string;
}

// Code submission response
export interface SubmitCodeResponse {
  success: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  executionTime: string;
  memory: number;
  testResults: TestResult[];
  allTestsPassed: boolean;
  compileError?: string;
  runtimeError?: string;
  statusDescription?: string;
}

// Sample test result (for run code feature)
export interface SampleTestResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

// Run code request (lighter than submit - only sample tests)
export interface RunCodeRequest {
  code: string;
  language: SupportedLanguage;
  gameId?: string;
}

// Run code response (includes stdout + sample test comparisons)
export interface RunCodeResponse {
  success: boolean;
  stdout: string;
  sampleTestResults: SampleTestResult[];
  executionTime: string;
  memory: number;
  compileError?: string;
  runtimeError?: string;
  statusDescription?: string;
}

