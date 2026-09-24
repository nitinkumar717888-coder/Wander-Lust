import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { type ArticleSummary } from "@/types";

interface TravelGuidesSectionProps {
  featured: ArticleSummary;
  supporting: ArticleSummary[];
}

/**
 * TravelGuidesSection — "Travel guides"
 *
 * Magazine-style layout:
 * - One dominant featured article
 * - Two supporting articles in an editorial vertical stack
 *
 * Structured strictly around the ArticleSummary domain model.
 */
export function TravelGuidesSection({
  featured,
  supporting,
}: TravelGuidesSectionProps) {
  return (
    <Section padding="lg" className="bg-white">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono">
              Editorial Dispatches
            </span>
            <Heading as="h2" size="xl" className="mt-2">
              Travel guides
            </Heading>
            <p className="mt-2 text-stone-600 text-base sm:text-lg leading-relaxed">
              Deep, logistical manuals and firsthand dispatches. No generic top-10 lists.
            </p>
          </div>

          <Link
            href="/travel-guides"
            className="text-sm font-semibold text-stone-800 hover:text-amber-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            All Editorial Guides <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Magazine-Style Layout (Large Feature + Supporting Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Large Featured Article (7 cols) */}
          <article className="lg:col-span-7 group relative flex flex-col rounded-3xl overflow-hidden bg-stone-50 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
              {featured.featuredImage && (
                <Image
                  src={featured.featuredImage.url}
                  alt={featured.featuredImage.altText}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-stone-950 backdrop-blur-xs">
                  Featured Guide
                </span>
                <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
                  {featured.readingTimeMin ?? 7} Min Read
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-amber-700 uppercase tracking-wider mb-2">
                  <span>{featured.author.displayName}</span>
                  <span>•</span>
                  <span>Editorial Review</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {featured.title}
                </h3>

                <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-sm font-semibold text-stone-900">
                <span className="text-stone-500 font-normal text-xs">
                  Includes seasons, packing &amp; route advice
                </span>
                <span className="text-amber-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read full guide →
                </span>
              </div>
            </div>

            <Link
              href={`/travel-guides/${featured.slug}`}
              className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={`Read guide: ${featured.title}`}
            >
              <span className="sr-only">Read {featured.title}</span>
            </Link>
          </article>

          {/* Supporting Articles Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {supporting.map((article) => (
              <article
                key={article.id}
                className="group relative flex flex-col sm:flex-row gap-5 rounded-2xl p-5 bg-stone-50 border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] sm:w-40 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-stone-200">
                  {article.featuredImage && (
                    <Image
                      src={article.featuredImage.url}
                      alt={article.featuredImage.altText}
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-2xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                      <span>{article.readingTimeMin ?? 5} min read</span>
                      <span>•</span>
                      <span>Field Notes</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="mt-1.5 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <span className="mt-3 text-xs font-semibold text-amber-700 group-hover:translate-x-0.5 transition-transform">
                    Read article →
                  </span>
                </div>

                <Link
                  href={`/travel-guides/${article.slug}`}
                  className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label={`Read article: ${article.title}`}
                >
                  <span className="sr-only">Read {article.title}</span>
                </Link>
              </article>
            ))}

            {/* Editorial Standard Trust Note */}
            <div className="rounded-2xl border border-dashed border-stone-200 p-5 bg-stone-50/50">
              <h5 className="font-serif text-sm font-bold text-stone-800">
                Wanderlust Editorial Promise
              </h5>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                All guides are compiled through on-the-ground reconnaissance, verified road pass statuses, and authentic local cultural respect.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
