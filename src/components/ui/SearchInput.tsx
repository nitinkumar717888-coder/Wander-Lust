"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  placeholder?: string;
  className?: string;
  /** If true, renders a compact inline version */
  compact?: boolean;
  defaultValue?: string;
}

/**
 * SearchInput — Client Component (requires user interaction).
 *
 * Navigates to /search?q=query on submit.
 * Must be a Client Component because it uses browser events and useRouter.
 */
export function SearchInput({
  placeholder = "Search destinations, guides...",
  className,
  compact = false,
  defaultValue = "",
}: SearchInputProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const inputId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn("relative", className)}
    >
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>

      {/* Search icon */}
      <svg
        aria-hidden="true"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none",
          compact ? "h-4 w-4" : "h-5 w-5"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          "w-full rounded-full bg-white border border-stone-200 pl-11 pr-4",
          "text-stone-900 placeholder:text-stone-400",
          "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent",
          "transition-all duration-200",
          compact
            ? "py-2 text-sm"
            : "py-3.5 text-base shadow-sm hover:shadow-md"
        )}
      />

      <button
        type="submit"
        className="sr-only"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}
