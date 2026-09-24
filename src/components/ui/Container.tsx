import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Use 'narrow' for reading-width content (articles) */
  size?: "narrow" | "default" | "wide" | "full";
}

/**
 * Container — horizontal padding + max-width wrapper.
 *
 * All page-level content should be wrapped in a Container to
 * ensure consistent horizontal rhythm.
 */
export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-3xl": size === "narrow",
          "max-w-7xl": size === "default",
          "max-w-screen-2xl": size === "wide",
          "": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
