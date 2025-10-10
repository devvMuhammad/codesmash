"use client"

import Editor, { OnMount } from "@monaco-editor/react"
import type * as monaco from "monaco-editor"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  readOnly?: boolean
  playerId: string
}

export function MonacoEditor({ value, onChange, language, readOnly = false, playerId }: MonacoEditorProps) {
  const handleEditorDidMount: OnMount = (_, monaco) => {
    // Configure Monaco Editor theme
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

    // Apply the theme
    monaco.editor.setTheme("CodeSmashDark")

    // Configure Monaco Editor for better integration
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    })

    // Add custom completions for common coding interview patterns
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (
        model: monaco.editor.ITextModel,
        position: monaco.IPosition,
        context: monaco.languages.CompletionContext,
        token: monaco.CancellationToken
      ) => {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }


        return { suggestions: [] }
      },
    })
  }

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme="CodeSmashDark"
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
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 3,
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
