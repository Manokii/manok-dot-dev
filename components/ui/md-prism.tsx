"use client"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Components } from "react-markdown"
import { useTheme } from "next-themes"

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
