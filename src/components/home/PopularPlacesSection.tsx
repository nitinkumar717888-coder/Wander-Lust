import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { type PlaceSummary } from "@/types";

interface PopularPlacesSectionProps {
  places: PlaceSummary[];
}

/**
 * PopularPlacesSection — "Places worth the detour"
 *
 * Showcases individual points of interest, shrines, viewpoints, and trails.
 * Image-first cards using PlaceSummary entity data.
 */
export function PopularPlacesSection({ places }: PopularPlacesSectionProps) {
  return (
    <Section padding="lg" background="warm">
      <Container size="default">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono">
              Individual Highlights
            </span>
            <Heading as="h2" size="xl" className="mt-2">
              Places worth the detour
            </Heading>
            <p className="mt-2 text-stone-600 text-base sm:text-lg leading-relaxed">
              Centuries-old sanctuaries, alpine meadows, and serene riverside settlements that define the region.
            </p>
          </div>

          <Link
            href="/places"
            className="text-sm font-semibold text-stone-800 hover:text-amber-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            All Places &amp; Trails <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 4-Column Image-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((place) => {
            const destinationName = place.destination?.name ?? "Manali";
            const categoryName = place.category?.name ?? "Attraction";
            const href = `/places/${place.slug}`;

            return (
              <article
                key={place.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  {place.featuredImage ? (
                    <Image
                      src={place.featuredImage.url}
                      alt={place.featuredImage.altText}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-stone-200" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-stone-800 backdrop-blur-xs shadow-2xs">
                      {categoryName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-amber-700 uppercase tracking-wider mb-1">
                      {destinationName}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {place.name}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {place.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Visiting details</span>
                    <span className="text-amber-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                      View details →
                    </span>
                  </div>
                </div>

                {/* Accessible Full-Card Link */}
                <Link
                  href={href}
                  className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label={`View visiting guide for ${place.name}`}
                >
                  <span className="sr-only">View {place.name}</span>
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
