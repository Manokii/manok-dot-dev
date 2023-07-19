import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4 } from "./typography"
import { ComponentProps } from "react"

const commonComponents: Components = {
  p: ({ node, ...props }) => <p className="mt-4" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-400" {...props} />,
  li: ({ node, ordered, ...props }) => <li className="mb-2" {...props} />,
  pre: ({ node, ...props }) => (
    <pre {...props} className="!bg-card/30 border border-muted shadow" />
  ),
}

interface MarkdownProps extends Omit<ComponentProps<typeof ReactMarkdown>, "children"> {
  content: string
}

export function Markdown({ content, ...props }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...(props.remarkPlugins ?? [])]}
      components={{
        h1: ({ node, ...props }) => <TypographyH1 {...props} />,
        h2: ({ node, ...props }) => <TypographyH2 {...props} />,
        h3: ({ node, ...props }) => <TypographyH3 {...props} />,
        h4: ({ node, ...props }) => <TypographyH4 {...props} />,
        ...commonComponents,
        ...props.components,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export function MarkdownNoHeadings({ content, ...props }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...(props.remarkPlugins ?? [])]}
      components={{
        h1: "p",
        h2: "p",
        h3: "p",
        h4: "p",
        h5: "p",
        h6: "p",
        ...commonComponents,
        ...props.components,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
