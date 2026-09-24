import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "category" | "tag" | "duration" | "budget";
}

/**
 * Badge — small label component for categories, tags, duration, etc.
 *
 * @example
 * <Badge variant="category">Temples</Badge>
 * <Badge variant="duration">3 Days</Badge>
 */
export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium",
        "transition-colors duration-150",
        {
          "bg-stone-100 text-stone-700": variant === "default",
          "bg-amber-100 text-amber-800": variant === "category",
          "bg-sky-100 text-sky-800": variant === "tag",
          "bg-emerald-100 text-emerald-800": variant === "duration",
          "bg-violet-100 text-violet-800": variant === "budget",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
