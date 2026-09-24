/**
 * Image handling utilities.
 *
 * Central abstraction for image URLs. Currently returns local/placeholder
 * values. This will be extended to support CDN URLs, responsive sizes,
 * and image transformations in a future milestone.
 *
 * Never import this in Server Components that deal with database data —
 * use the Image model URLs directly. This utility is for UI-level defaults.
 */

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
}

/**
 * Returns the CDN base URL if configured, or an empty string for local images.
 * Image components should prefix their `src` with this value.
 */
export function getImageCdnBase(): string {
  return process.env.NEXT_PUBLIC_IMAGE_CDN_URL ?? "";
}

/**
 * Constructs a full image URL from a stored path or CDN key.
 * In the future this will support image transformation parameters.
 */
export function buildImageUrl(
  pathOrKey: string,
  _options?: { width?: number; quality?: number }
): string {
  const base = getImageCdnBase();
  void _options;

  // If the path is already an absolute URL, return it as-is
  if (pathOrKey.startsWith("http://") || pathOrKey.startsWith("https://")) {
    return pathOrKey;
  }

  // Local or CDN-relative path
  const url = base ? `${base}/${pathOrKey.replace(/^\//, "")}` : pathOrKey;

  // TODO: Append transformation params when CDN supports it
  // e.g. `${url}?w=${options?.width}&q=${options?.quality ?? 80}`

  return url;
}

/**
 * Generates the `sizes` attribute for responsive images.
 * These values are used with Next.js <Image> component.
 */
export const imageSizes = {
  /** Full-width hero images */
  hero: "(max-width: 768px) 100vw, 100vw",
  /** Card images in a grid */
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  /** Featured article image */
  featured: "(max-width: 1024px) 100vw, 50vw",
  /** Thumbnail images */
  thumbnail: "(max-width: 640px) 50vw, 25vw",
} as const;
