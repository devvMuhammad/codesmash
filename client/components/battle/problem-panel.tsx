import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { markdownComponents } from "@/components/markdown-renderer"

const problem = {
  title: "Two Sum",
  difficulty: "Easy",
  description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:

\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Constraints:

*   \`2 <= nums.length <= 10^4\`
*   \`-10^9 <= nums[i] <= 10^9\`
*   \`-10^9 <= target <= 10^9\`
*   **Only one valid answer exists.**
`
}

export function ProblemPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">{problem.title}</h1>
          <Badge variant="secondary">{problem.difficulty}</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}>
          {problem.description}
        </ReactMarkdown>
      </div>
    </div>
  )
}
