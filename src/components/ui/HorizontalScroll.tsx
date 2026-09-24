"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
}

/**
 * HorizontalScroll — accessible, touch/mouse/keyboard responsive horizontal card scroller.
 *
 * Features:
 * - Native momentum scroll on iOS/Android touch devices
 * - Mouse drag / trackpad swipe compatible
 * - Keyboard navigable child elements with CSS snap points
 * - Desktop quick scroll navigation controls
 * - Subtle non-intrusive scrollbar
 */
export function HorizontalScroll({
  children,
  className,
  ariaLabel = "Horizontal scroll list",
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/scroll">
      {/* Scroll controls (visible on hover for desktop) */}
      <div className="hidden lg:flex items-center gap-2 absolute -top-14 right-0 z-10">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          aria-label="Scroll backwards"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-2xs hover:bg-stone-50 hover:border-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          aria-label="Scroll forward"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-2xs hover:bg-stone-50 hover:border-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "flex gap-6 overflow-x-auto pb-4 pt-1 px-1",
          "snap-x snap-mandatory scroll-smooth scrollbar-subtle",
          "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
