import Link from "next/link";
import { cn } from "@/lib/utils";
import { type BreadcrumbSegment } from "@/types";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbProps {
  items: BreadcrumbSegment[];
  className?: string;
}

/**
 * Breadcrumb — accessible navigation trail with structured data.
 *
 * Automatically generates JSON-LD BreadcrumbList schema markup
 * when rendered. This supports rich results in Google Search.
 *
 * The last item is treated as the current page (no link, aria-current).
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const jsonLd = buildBreadcrumbJsonLd(
    items.map((item) => ({ name: item.label, href: item.href }))
  );

  return (
    <>
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center flex-wrap gap-1 text-sm", className)}
      >
        <ol className="flex items-center flex-wrap gap-1" role="list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={index}
                className="flex items-center gap-1"
              >
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-stone-500 font-medium truncate max-w-[200px]"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-stone-400 hover:text-amber-600 transition-colors duration-150 truncate max-w-[150px]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-stone-400">{item.label}</span>
                    )}
                    {/* Separator */}
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-stone-300 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06L7.28 11.78a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
