import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { markdownComponents } from "@/components/markdown-renderer"
import { useGameStore } from "@/providers/game-store-provider"

const getDifficultyStyles = (difficulty: string | undefined) => {
  const normalizedDifficulty = difficulty?.toLowerCase()

  switch (normalizedDifficulty) {
    case 'easy':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
    case 'medium':
      return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
    case 'hard':
      return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
    default:
      return 'bg-secondary text-secondary-foreground'
  }
}

export function ProblemPanel() {

  const problem = useGameStore(state => state.problem)

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">{problem?.title}</h1>
          <Badge
            variant="outline"
            className={getDifficultyStyles(problem?.difficulty)}
          >
            {problem?.difficulty}
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}>
          {problem?.description}
        </ReactMarkdown>
      </div>
    </div>
  )
}
