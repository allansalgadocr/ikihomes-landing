import Markdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="type-heading text-xl sm:text-2xl mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="type-heading text-lg sm:text-xl mt-10 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="type-body text-gray-700 leading-relaxed mb-6">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 type-body text-gray-700 mb-6">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 type-body text-gray-700 mb-6">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/30 pl-4 my-6 text-gray-600 italic">
      {children}
    </blockquote>
  ),
};

interface BlogMarkdownProps {
  content: string;
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return <Markdown components={components}>{content}</Markdown>;
}
