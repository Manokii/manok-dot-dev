import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "./typography";
import { ComponentProps } from "react";

export const commonMdComponents: Components = {
  p: ({ node, ...props }) => <p className="mt-4" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-400" {...props} />,
  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
  pre: ({ node, ...props }) => (
    <pre {...props} className="!bg-card/30 border border-muted shadow" />
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ node, ...props }) => (
    <img {...props} style={{ maxHeight: 512, ...props.style }} />
  ),
};

export interface MarkdownProps
  extends Omit<ComponentProps<typeof ReactMarkdown>, "children"> {
  content: string;
}

export function Markdown({ content, ...props }: MarkdownProps) {
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
      }}
    >
      {content}
    </ReactMarkdown>
  );
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
        ...commonMdComponents,
        ...props.components,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
