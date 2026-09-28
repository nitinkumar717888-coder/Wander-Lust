import type { Metadata } from "next";
import { buildWebSiteJsonLd, generatePageMetadata } from "@/lib/seo";
import {
  getFeaturedDestinations,
  getPopularPlaces,
  getEditorialGuides,
  getTravelInterests,
  getCuratedItineraries,
} from "@/lib/homepage-data";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { PopularPlacesSection } from "@/components/home/PopularPlacesSection";
import { TravelGuidesSection } from "@/components/home/TravelGuidesSection";
import { TravelInterestsSection } from "@/components/home/TravelInterestsSection";
import { ItinerariesSection } from "@/components/home/ItinerariesSection";
import { PlanningCtaSection } from "@/components/home/PlanningCtaSection";

export const metadata: Metadata = generatePageMetadata({
  title: "Routes & Stories — Discover Extraordinary Routes & Sacred Shrines",
  description:
    "Editorial travel discovery engine. Uncover curated destinations, remote shrines, road-tested guides, and day-by-day itineraries.",
  path: "/",
  isHomePage: true,
});

/**
 * Homepage (Phase 2)
 *
 * Server Component by default. Fetches typed domain data via the
 * homepage-data layer (ready to query Prisma when connected).
 *
 * Ordered sections:
 * 1. Navigation (Root Layout)
 * 2. Hero (Cinematic travel hero + search)
 * 3. Explore Destinations (Horizontal scroll carousel)
 * 4. Popular Places (Image-first cards: Solang, Hidimba, Old Manali, Vashisht)
 * 5. Editorial Travel Guides (Magazine layout: Featured + supporting)
 * 6. Travel by Interest (8 thematic discovery tiles)
 * 7. Itinerary Section (Day-by-day travel routes)
 * 8. Future Travel Planning CTA
 * 9. Footer (Root Layout)
 */
export default async function HomePage() {
  const jsonLd = buildWebSiteJsonLd();

  // Load domain-typed data from the isolated data provider
  const destinations = await getFeaturedDestinations();
  const places = await getPopularPlaces();
  const { featured: featuredGuide, supporting: supportingGuides } =
    await getEditorialGuides();
  const interests = getTravelInterests();
  const itineraries = await getCuratedItineraries();

  return (
    <>
      {/* Schema.org WebSite JSON-LD with deep SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Explore Destinations Section */}
      <DestinationsSection destinations={destinations} />

      {/* 4. Popular Places Section */}
      <PopularPlacesSection places={places} />

      {/* 5. Editorial Travel Guides Section */}
      <TravelGuidesSection
        featured={featuredGuide}
        supporting={supportingGuides}
      />

      {/* 6. Travel by Interest Section */}
      <TravelInterestsSection interests={interests} />

      {/* 7. Itinerary Section */}
      <ItinerariesSection itineraries={itineraries} />

      {/* 8. Travel Planning Discovery CTA */}
      <PlanningCtaSection />
    </>
  );
}
