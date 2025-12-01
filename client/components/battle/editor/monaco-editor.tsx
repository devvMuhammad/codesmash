"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"
import Editor, { OnMount } from "@monaco-editor/react"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  readOnly?: boolean
  playerId: string
}

export function MonacoEditor({ value, onChange, language, readOnly = false }: MonacoEditorProps) {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || theme || "dark"
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco

    // Configure Monaco Editor dark theme
    monaco.editor.defineTheme("CodeSmashDark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A737D" },
        { token: "keyword", foreground: "79C0FF" },
        { token: "string", foreground: "A5D6FF" },
        { token: "number", foreground: "79C0FF" },
        { token: "function", foreground: "D2A8FF" },
        { token: "variable", foreground: "FFA657" },
      ],
      colors: {
        "editor.background": "#0d1117",
        "editor.foreground": "#e6edf3",
        "editor.lineHighlightBackground": "#161b22",
        "editor.selectionBackground": "#264f78",
        "editor.inactiveSelectionBackground": "#3a3d41",
        "editorCursor.foreground": "#79c0ff",
        "editorLineNumber.foreground": "#6e7681",
        "editorLineNumber.activeForeground": "#e6edf3",
        "editor.selectionHighlightBackground": "#264f7840",
        "editor.wordHighlightBackground": "#264f7840",
        "editor.findMatchBackground": "#ffd33d44",
        "editor.findMatchHighlightBackground": "#ffd33d22",
      },
    })

    // Configure Monaco Editor light theme
    monaco.editor.defineTheme("CodeSmashLight", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A737D" },
        { token: "keyword", foreground: "0969DA" },
        { token: "string", foreground: "0A3069" },
        { token: "number", foreground: "005CC5" },
        { token: "function", foreground: "6F42C1" },
        { token: "variable", foreground: "E36209" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#24292F",
        "editor.lineHighlightBackground": "#f6f8fa",
        "editor.selectionBackground": "#B6E3FF",
        "editor.inactiveSelectionBackground": "#E8EAED",
        "editorCursor.foreground": "#0969DA",
        "editorLineNumber.foreground": "#8C959F",
        "editorLineNumber.activeForeground": "#24292F",
        "editor.selectionHighlightBackground": "#B6E3FF80",
        "editor.wordHighlightBackground": "#B6E3FF80",
        "editor.findMatchBackground": "#FFD33D",
        "editor.findMatchHighlightBackground": "#FFD33D80",
      },
    })

    // Apply the theme based on current theme
    const themeName = currentTheme === "dark" ? "CodeSmashDark" : "CodeSmashLight"
    monaco.editor.setTheme(themeName)
  }

  // Update theme when it changes
  useEffect(() => {
    if (!monacoRef.current) return

    const themeName = currentTheme === "dark" ? "CodeSmashDark" : "CodeSmashLight"
    monacoRef.current.editor.setTheme(themeName)
  }, [currentTheme])

  const themeName = currentTheme === "dark" ? "CodeSmashDark" : "CodeSmashLight"

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme={themeName}
      onChange={(value) => onChange(value || "")}
      onMount={handleEditorDidMount}
      options={{
        readOnly,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        // fontFamily: "var(--font-geist-mono), 'Fira Code', 'JetBrains Mono', monospace",
        lineNumbers: "on",
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 15,
        lineNumbersMinChars: 2,
        renderLineHighlight: "line",
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: "on",
        contextmenu: false,
        selectOnLineNumbers: true,
        roundedSelection: false,
        cursorStyle: "line",
        cursorBlinking: "blink",
        smoothScrolling: true,
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
        },
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
      }}
    />
  )
}
