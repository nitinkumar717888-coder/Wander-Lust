import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * "full" renders the RS square mark + serif wordmark.
   * "mark" renders only the square RS mark.
   */
  variant?: "full" | "mark";
  /** Additional wrapper classes */
  className?: string;
  /** Custom sizing or styling for the square mark */
  markClassName?: string;
  /** Custom styling for the text */
  textClassName?: string;
  /** Responsive behavior: hide text on very small screens */
  responsiveText?: boolean;
}

/**
 * Official Routes & Stories brand logo component.
 *
 * Provides:
 * - Square RS brand mark with amber background and dark serif monogram
 * - Editorial serif typography for the full brand wordmark
 * - Responsive display support for compact mobile viewports
 */
export function Logo({
  variant = "full",
  className,
  markClassName,
  textClassName,
  responsiveText = true,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 flex-shrink-0 select-none", className)}>
      {/* Square RS Mark */}
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-serif font-black text-xs tracking-tighter shadow-xs group-hover:bg-amber-400 transition-colors flex-shrink-0",
          markClassName
        )}
        aria-hidden="true"
      >
        RS
      </span>

      {/* Wordmark (for full variant) */}
      {variant === "full" && (
        <span
          className={cn(
            "text-xl font-bold tracking-tight font-serif",
            responsiveText ? "hidden xs:inline sm:inline" : "inline",
            textClassName
          )}
        >
          {siteConfig.name}
        </span>
      )}
    </div>
  );
}
