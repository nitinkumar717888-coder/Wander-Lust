import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

/**
 * Button primitive.
 *
 * Uses forwardRef so it can be composed inside Next.js Link components.
 *
 * @example
 * <Button variant="primary" size="lg">Explore Manali</Button>
 * <Button variant="ghost" size="sm" aria-label="Close menu">✕</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(
          // Base
          "inline-flex items-center justify-center gap-2 font-semibold rounded-full",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Sizes
          {
            "px-4 py-1.5 text-sm": size === "sm",
            "px-6 py-2.5 text-base": size === "md",
            "px-8 py-3.5 text-lg": size === "lg",
          },
          // Variants
          {
            // Primary — rich amber/gold
            "bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98] shadow-md hover:shadow-amber-200":
              variant === "primary",
            // Secondary — dark
            "bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]":
              variant === "secondary",
            // Ghost — transparent
            "text-stone-700 hover:bg-stone-100 active:bg-stone-200":
              variant === "ghost",
            // Outline — bordered
            "border border-stone-300 text-stone-700 hover:border-stone-400 hover:bg-stone-50 active:scale-[0.98]":
              variant === "outline",
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            aria-hidden="true"
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
