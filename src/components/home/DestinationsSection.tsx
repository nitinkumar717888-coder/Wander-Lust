import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { type DestinationSummary } from "@/types";

interface DestinationsSectionProps {
  destinations: DestinationSummary[];
}

/**
 * DestinationsSection — "Explore destinations"
 *
 * Displays horizontally scrollable destination cards.
 * Accepts typed DestinationSummary records to allow database integration.
 */
export function DestinationsSection({ destinations }: DestinationsSectionProps) {
  return (
    <Section padding="lg" className="bg-white">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono">
              Geographic Discovery
            </span>
            <Heading as="h2" size="xl" className="mt-2">
              Explore destinations
            </Heading>
            <p className="mt-2 text-stone-600 text-base sm:text-lg leading-relaxed">
              Start with a place, then discover everything worth seeing around it.
            </p>
          </div>

          <Link
            href="/destinations"
            className="text-sm font-semibold text-stone-800 hover:text-amber-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            All Destinations <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Horizontal Card Scroller */}
        <HorizontalScroll ariaLabel="Featured destinations carousel">
          {destinations.map((dest, idx) => {
            const countrySlug = dest.region?.country?.slug ?? "india";
            const regionSlug = dest.region?.slug ?? "himachal-pradesh";
            const href = `/destinations/${countrySlug}/${regionSlug}`;
            const isFeatured = idx === 0;

            return (
              <div
                key={dest.id}
                className="w-[280px] sm:w-[340px] flex-shrink-0 snap-start"
              >
                <article className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/80 shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300">
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                    {dest.featuredImage ? (
                      <Image
                        src={dest.featuredImage.url}
                        alt={dest.featuredImage.altText}
                        fill
                        sizes="(max-width: 640px) 280px, 340px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-orange-100" />
                    )}

                    {/* Gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-stone-800 backdrop-blur-xs shadow-xs">
                        {dest.region.name}
                      </span>
                      {isFeatured && (
                        <span className="rounded-full bg-amber-500/95 px-2.5 py-1 text-xs font-bold text-stone-950 backdrop-blur-xs">
                          Featured Hub
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-amber-600 mb-1">
                        {dest.region.country.name}
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                        {dest.description ?? dest.tagline}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                      <span>Explore spots &amp; guides</span>
                      <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform">
                        Explore →
                      </span>
                    </div>
                  </div>

                  {/* Full Card Accessible Link */}
                  <Link
                    href={href}
                    className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    aria-label={`Explore ${dest.name}, ${dest.region.name}`}
                  >
                    <span className="sr-only">Explore {dest.name}</span>
                  </Link>
                </article>
              </div>
            );
          })}
        </HorizontalScroll>
      </Container>
    </Section>
  );
}
