/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        // Headers
        h1: ({ ...props }) => (
          <h1 className="text-2xl font-bold my-4" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-xl font-bold my-3" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-lg font-bold my-2" {...props} />
        ),

        // Text formatting
        strong: ({ ...props }) => (
          <strong className="font-bold" {...props} />
        ),
        em: ({ ...props }) => <em className="italic" {...props} />,

        // Lists
        ul: ({ ...props }) => (
          <ul className="list-disc pl-5 my-2" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal pl-5 my-2" {...props} />
        ),
        li: ({ ...props }) => <li className="my-1" {...props} />,

        // Code blocks (your existing implementation)
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={materialDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Paragraphs
        p: ({ ...props }) => <p className="my-3" {...props} />,

        // Links
        a: ({ ...props }) => (
          <a
            className="text-blue-600 hover:underline dark:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
