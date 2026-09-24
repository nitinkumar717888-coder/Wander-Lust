import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ImageSummary } from "@/types";

interface CardProps {
  href: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: ImageSummary | null;
  badge?: string;
  meta?: string;
  className?: string;
  /** Aspect ratio of the image. Defaults to 4/3. */
  imageAspect?: "4/3" | "16/9" | "3/2" | "1/1";
}

/**
 * ImageCard — the primary card component for destinations, places, and guides.
 *
 * Features:
 * - Premium editorial aesthetic with image-first layout
 * - Hover animation: subtle image scale + card lift
 * - Gradient overlay for text legibility on images
 * - Accessible: full-card link with proper aria-label
 *
 * Note: This is a Server Component. Image loading is via Next.js Image.
 */
export function ImageCard({
  href,
  title,
  subtitle,
  description,
  image,
  badge,
  meta,
  className,
  imageAspect = "4/3",
}: CardProps) {
  return (
    <article
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-stone-100",
        "shadow-sm hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {/* Image wrapper */}
      <div
        className={cn("relative overflow-hidden", {
          "aspect-[4/3]": imageAspect === "4/3",
          "aspect-video": imageAspect === "16/9",
          "aspect-[3/2]": imageAspect === "3/2",
          "aspect-square": imageAspect === "1/1",
        })}
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder gradient when no image is available */
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100" />
        )}

        {/* Gradient overlay at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-800 backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {subtitle && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-amber-600">
            {subtitle}
          </p>
        )}
        <h3 className="text-lg font-bold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-stone-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        {meta && (
          <p className="mt-3 text-xs text-stone-400 font-medium">{meta}</p>
        )}
      </div>

      {/* Full-card accessible link */}
      <Link
        href={href}
        className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        aria-label={`View details for ${title}`}
      >
        <span className="sr-only">{title}</span>
      </Link>
    </article>
  );
}
