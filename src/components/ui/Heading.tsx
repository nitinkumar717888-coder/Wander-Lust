import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

/**
 * Heading — semantic heading with consistent typographic scale.
 *
 * Separates semantic meaning (h1–h6) from visual size.
 *
 * @example
 * <Heading as="h1" size="3xl">Discover Manali</Heading>
 * <Heading as="h2" size="xl">Things To Do</Heading>
 */
export function Heading({
  as: Tag = "h2",
  size = "lg",
  weight = "bold",
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "tracking-tight text-stone-900",
        // Size scale
        {
          "text-sm": size === "xs",
          "text-base sm:text-lg": size === "sm",
          "text-xl sm:text-2xl": size === "md",
          "text-2xl sm:text-3xl": size === "lg",
          "text-3xl sm:text-4xl": size === "xl",
          "text-4xl sm:text-5xl": size === "2xl",
          "text-5xl sm:text-6xl md:text-7xl": size === "3xl",
        },
        // Weight
        {
          "font-normal": weight === "normal",
          "font-medium": weight === "medium",
          "font-semibold": weight === "semibold",
          "font-bold": weight === "bold",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
