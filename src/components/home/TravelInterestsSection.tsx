import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { type TravelInterest } from "@/lib/homepage-data";

interface TravelInterestsSectionProps {
  interests: TravelInterest[];
}

/**
 * TravelInterestsSection — "Travel your way"
 *
 * Discovery exploration tiles categorized by travel style.
 * Explicitly framed as thematic exploration categories, not fake booking products.
 */
export function TravelInterestsSection({
  interests,
}: TravelInterestsSectionProps) {
  // Map icons to lightweight semantic SVG paths
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "mountain":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 19l4.5-9 3.5 6 4-8 4 11H4z"
          />
        );
      case "route":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        );
      case "clock":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case "trees":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3L6 11h3l-4 7h14l-4-7h3L12 3zm0 15v3"
          />
        );
      case "compass":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 100-18 9 9 0 000 18zm3.5-12.5l-2 5.5-5.5 2 2-5.5 5.5-2z"
          />
        );
      case "sun":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        );
      case "users":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        );
      default:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        );
    }
  };

  return (
    <Section padding="lg" background="warm">
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono">
            Thematic Exploration
          </span>
          <Heading as="h2" size="xl" className="mt-2">
            Travel your way
          </Heading>
          <p className="mt-2 text-stone-600 text-base sm:text-lg leading-relaxed">
            Whether you crave high-altitude passes, quick weekend resets, or scenic overland road routes.
          </p>
        </div>

        {/* 8 Category Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {interests.map((item) => (
            <Link
              key={item.id}
              href={`/search?q=${encodeURIComponent(item.title)}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400/80 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      {renderIcon(item.iconName)}
                    </svg>
                  </div>

                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-2xs font-semibold text-stone-600">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-400 group-hover:text-amber-700 transition-colors">
                <span>Explore spots</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
