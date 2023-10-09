"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";
import { MarkdownProps, commonMdComponents } from "./md";
import remarkGfm from "remark-gfm";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "./typography";

export function MarkdownWithCode({ content, ...props }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...(props.remarkPlugins ?? [])]}
      components={{
        h1: ({ node, ref, ...props }) => <TypographyH1 {...props} />,
        h2: ({ node, ref, ...props }) => <TypographyH2 {...props} />,
        h3: ({ node, ref, ...props }) => <TypographyH3 {...props} />,
        h4: ({ node, ref, ...props }) => <TypographyH4 {...props} />,
        ...commonMdComponents,
        ...props.components,
        code: ({ node, ref, className, children, ...props }) => {
          const { theme } = useTheme();
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            // type broke when upgraded from @types/react@18.2.14 -> @types/react@18.2.25
            // https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/539
            // @ts-ignore
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={theme === "light" ? oneLight : oneDark}
              className="bg-transparent"
              language={match[1]}
              PreTag="div"
            ></SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
