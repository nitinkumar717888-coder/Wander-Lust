import React from "react";
import Link from "next/link";

interface ArticleContentProps {
  content: string;
  className?: string;
}

/**
 * Editorial Article Content Renderer
 *
 * Lightweight, zero-dependency renderer supporting:
 * - Headings (h2, h3, h4)
 * - Blockquotes and editorial pullquotes
 * - Unordered bullet lists (- or *)
 * - Ordered numbered lists (1., 2., etc.)
 * - Markdown tables (| col | col |)
 * - Inline formatting (**bold**, *italic*, [link](url))
 *
 * Designed to ensure future travel essays, field notes, and guides
 * render with magazine-quality typography without needing heavy CMS or external libraries.
 */
export function ArticleContent({ content, className }: ArticleContentProps) {
  if (!content) {
    return <p className="italic text-stone-500">Full editorial guide coming soon.</p>;
  }

  // Split into paragraph/section blocks by double line-breaks
  const blocks = content.split(/\n\n+/);

  return (
    <div className={`space-y-6 text-stone-700 leading-relaxed text-lg font-serif ${className || ""}`}>
      {blocks.map((block, index) => renderBlock(block.trim(), index))}
    </div>
  );
}

function renderBlock(block: string, key: number) {
  if (!block) return null;

  // H2 Heading
  if (block.startsWith("## ")) {
    const text = block.replace(/^##\s+/, "");
    return (
      <h2
        key={key}
        className="text-2xl font-sans font-bold text-stone-900 pt-8 pb-1 tracking-tight border-b border-stone-100"
      >
        {renderInline(text)}
      </h2>
    );
  }

  // H3 Heading
  if (block.startsWith("### ")) {
    const text = block.replace(/^###\s+/, "");
    return (
      <h3
        key={key}
        className="text-xl font-sans font-semibold text-stone-900 pt-5 pb-1 tracking-tight"
      >
        {renderInline(text)}
      </h3>
    );
  }

  // H4 Heading
  if (block.startsWith("#### ")) {
    const text = block.replace(/^####\s+/, "");
    return (
      <h4 key={key} className="text-lg font-sans font-medium text-stone-900 pt-3">
        {renderInline(text)}
      </h4>
    );
  }

  // Blockquote / Pullquote
  if (block.startsWith("> ")) {
    const lines = block
      .split("\n")
      .map((l) => l.replace(/^>\s?/, ""))
      .join(" ");
    return (
      <blockquote
        key={key}
        className="border-l-4 border-amber-500 pl-5 py-3 my-6 bg-stone-50/80 rounded-r-xl italic text-stone-800 text-lg leading-relaxed font-serif"
      >
        {renderInline(lines)}
      </blockquote>
    );
  }

  // Unordered list (starts with - or *)
  if (block.startsWith("- ") || block.startsWith("* ")) {
    const items = block.split("\n").filter((line) => line.trim().length > 0);
    return (
      <ul
        key={key}
        className="list-disc pl-6 space-y-2 text-stone-700 font-sans text-base my-4"
      >
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(item.replace(/^[-*]\s+/, ""))}
          </li>
        ))}
      </ul>
    );
  }

  // Ordered list (starts with 1., 2., etc.)
  if (/^\d+\.\s/.test(block)) {
    const items = block.split("\n").filter((line) => line.trim().length > 0);
    return (
      <ol
        key={key}
        className="list-decimal pl-6 space-y-2 text-stone-700 font-sans text-base my-4"
      >
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(item.replace(/^\d+\.\s+/, ""))}
          </li>
        ))}
      </ol>
    );
  }

  // Markdown Table (contains lines with | and a separator |---|)
  if (block.includes("|") && block.includes("---")) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length >= 2) {
      const headerLine = lines[0];
      const dataLines = lines.slice(2); // Skip header and separator

      const parseRow = (line: string) =>
        line
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((cell) => cell.trim());

      const headers = parseRow(headerLine);

      return (
        <div key={key} className="overflow-x-auto my-6 rounded-xl border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 font-sans text-sm">
            <thead className="bg-stone-50 text-stone-800 font-semibold">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {dataLines.map((row, rIdx) => {
                const cells = parseRow(row);
                return (
                  <tr key={rIdx} className="hover:bg-stone-50/50">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-stone-700">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // Standard Paragraph
  return (
    <p key={key} className="leading-relaxed">
      {renderInline(block)}
    </p>
  );
}

/**
 * Lightweight inline markdown parser:
 * - Bold: **text**
 * - Italic: *text*
 * - Link: [label](url)
 * - Code: `code`
 */
function renderInline(text: string): React.ReactNode {
  // Regex pattern matching [label](url), **bold**, *italic*, `code`
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    // Markdown link: [text](href)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline decoration-amber-500/40 hover:decoration-amber-800 font-sans transition-colors"
          >
            {label}
          </a>
        );
      }
      return (
        <Link
          key={index}
          href={href}
          className="text-amber-800 underline decoration-amber-500/40 hover:decoration-amber-800 font-sans transition-colors"
        >
          {label}
        </Link>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-stone-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-stone-800">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `text`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-stone-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}
