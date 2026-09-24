/**
 * cn — className utility
 *
 * Combines Tailwind classes safely. Uses clsx for conditional classes
 * and tailwind-merge to handle conflicting utility classes.
 *
 * Install required: npm install clsx tailwind-merge
 * (installed as part of setup)
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a duration in days as a human-readable string.
 * e.g. 3 → "3 Days", 1 → "1 Day"
 */
export function formatDuration(days: number): string {
  return `${days} ${days === 1 ? "Day" : "Days"}`;
}

/**
 * Truncates a string to a given length, appending an ellipsis.
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "…";
}

/**
 * Converts a slug to a human-readable title.
 * e.g. "himachal-pradesh" → "Himachal Pradesh"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Converts a string to a URL-friendly slug.
 * e.g. "Himachal Pradesh" → "himachal-pradesh"
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats a date as a localized string.
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}
