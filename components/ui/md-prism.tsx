"use client"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown, { Components } from "react-markdown"
import { useTheme } from "next-themes"
import { MarkdownProps, commonMdComponents } from "./md"
import remarkGfm from "remark-gfm"
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4 } from "./typography"

export const Code: Components["code"] = ({ node, inline, className, children, ...props }) => {
  const { theme } = useTheme()
  const match = /language-(\w+)/.exec(className || "")
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      children={String(children).replace(/\n$/, "")}
      style={theme === "light" ? oneLight : oneDark}
      className="bg-transparent"
      language={match[1]}
      PreTag="div"
    />
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  )
}

export function MarkdownWithCode({ content, ...props }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...(props.remarkPlugins ?? [])]}
      components={{
        h1: ({ node, ...props }) => <TypographyH1 {...props} />,
        h2: ({ node, ...props }) => <TypographyH2 {...props} />,
        h3: ({ node, ...props }) => <TypographyH3 {...props} />,
        h4: ({ node, ...props }) => <TypographyH4 {...props} />,
        ...commonMdComponents,
        ...props.components,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
