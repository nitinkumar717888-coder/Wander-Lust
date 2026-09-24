import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { type ItinerarySummary } from "@/types";

interface ItinerariesSectionProps {
  itineraries: ItinerarySummary[];
}

/**
 * ItinerariesSection — "Trips worth planning"
 *
 * Demonstrates the structured trip-planning potential without implementing
 * an unbacked booking or planner engine. Uses ItinerarySummary data.
 */
export function ItinerariesSection({ itineraries }: ItinerariesSectionProps) {
  return (
    <Section padding="lg" className="bg-white">
      <Container size="default">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono">
              Curated Routes
            </span>
            <Heading as="h2" size="xl" className="mt-2">
              Trips worth planning
            </Heading>
            <p className="mt-2 text-stone-600 text-base sm:text-lg leading-relaxed">
              Tested day-by-day schedules that balance driving distances, altitude acclimatization, and sightseeing.
            </p>
          </div>

          <Link
            href="/itineraries"
            className="text-sm font-semibold text-stone-800 hover:text-amber-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            All Itineraries <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Itinerary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itineraries.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-stone-50 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-200">
                {item.featuredImage && (
                  <Image
                    src={item.featuredImage.url}
                    alt={item.featuredImage.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-stone-900 shadow-xs backdrop-blur-xs">
                    {item.durationDays} Days / {item.durationDays - 1} Nights
                  </span>
                  {item.difficulty && (
                    <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-stone-200 backdrop-blur-xs">
                      {item.difficulty}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-700 uppercase tracking-wider mb-2">
                    <span>{item.budgetRange ?? "Flexible Budget"}</span>
                    <span>•</span>
                    <span>Day-by-Day Route</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-stone-600 text-sm leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-sm font-semibold text-stone-900">
                  <span className="text-xs text-stone-500 font-normal">
                    Complete stops, lodging &amp; transit
                  </span>
                  <span className="text-amber-700 group-hover:translate-x-1 transition-transform">
                    View route breakdown →
                  </span>
                </div>
              </div>

              <Link
                href={`/itineraries/${item.slug}`}
                className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label={`View itinerary: ${item.title}`}
              >
                <span className="sr-only">View {item.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
