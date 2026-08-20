import Markdown from "react-markdown";
import type { Components } from "react-markdown";

/**
 * Long-form article body.
 *
 * Typography lives in `.prose` (mockup.css), not in utility classes on these
 * elements. mockup.css is imported unlayered after Tailwind, so its bare
 * `p{margin:0}` and `h2{font-size:clamp(30px,3.9vw,46px)}` rules outrank every
 * Tailwind utility: the previous `mb-6` / `text-xl` classes here were dead, and
 * articles rendered as a wall of text under 46px headings.
 *
 * Only elements that need behaviour or a semantic class are overridden; the
 * rest fall through to plain HTML that `.prose` styles.
 */
const components: Components = {
  // Markdown blockquotes become the editorial pull quote.
  blockquote: ({ children }) => (
    <blockquote className="pullquote">{children}</blockquote>
  ),

  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },

  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />
    ) : null,
};

interface BlogMarkdownProps {
  content: string;
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return <Markdown components={components}>{content}</Markdown>;
}
