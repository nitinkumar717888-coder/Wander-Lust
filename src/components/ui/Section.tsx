import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "aside" | "main";
  /** Controls vertical padding */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background tone for editorial surface variation */
  background?: "default" | "warm" | "stone" | "dark";
}

/**
 * Section — a semantic content section with vertical rhythm and background styling.
 *
 * Use this as the outer wrapper for distinct page sections.
 *
 * @example
 * <Section spacing="lg" background="warm">
 *   <Container>...</Container>
 * </Section>
 */
export function Section({
  as: Tag = "section",
  className,
  spacing,
  padding,
  background = "default",
  children,
  ...props
}: SectionProps) {
  const resolvedSpacing = spacing ?? padding ?? "lg";

  return (
    <Tag
      className={cn(
        {
          "": resolvedSpacing === "none",
          "py-8 sm:py-10": resolvedSpacing === "sm",
          "py-12 sm:py-16": resolvedSpacing === "md",
          "py-16 sm:py-24": resolvedSpacing === "lg",
          "py-24 sm:py-32": resolvedSpacing === "xl",
        },
        {
          "bg-white text-stone-900": background === "default",
          "bg-stone-50 text-stone-900": background === "warm",
          "bg-stone-100 text-stone-900": background === "stone",
          "bg-stone-900 text-white": background === "dark",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
