import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { markdownComponents } from "@/components/markdown-renderer"
import { useGameStore } from "@/providers/game-store-provider"
import { getDifficultyStyles } from "@/lib/utils"

export function ProblemPanel() {

  const problem = useGameStore(state => state.problem)

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">{problem?.title}</h1>
          <Badge
            variant="outline"
            className={getDifficultyStyles(problem?.difficulty ?? '')}
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
