import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";
import { getCuratedItineraries } from "@/lib/data/itineraries";

export const metadata: Metadata = generatePageMetadata({
  title: "Curated Travel Itineraries — Day-by-Day Plans",
  description: "Tested day-by-day travel routes, logistics, daily highlights, and accommodation tips.",
  path: "/itineraries",
});

export default async function ItinerariesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Itineraries" },
  ];

  const itineraries = await getCuratedItineraries(50);

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-2xl mb-12">
          <Heading as="h1" size="xl">
            Curated Itineraries
          </Heading>
          <p className="mt-3 text-stone-600 text-lg leading-relaxed">
            Thoughtfully planned daily schedules that eliminate decision fatigue and optimize ground travel times.
          </p>
        </div>

        {itineraries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary) => (
              <ImageCard
                key={itinerary.id}
                title={itinerary.title}
                subtitle={`${itinerary.durationDays} Days · ${itinerary.difficulty || "Moderate Pace"}`}
                description={itinerary.summary || ""}
                href={`/itineraries/${itinerary.slug}`}
                badge={`${itinerary.durationDays} Days`}
                image={
                  itinerary.featuredImage
                    ? {
                        id: itinerary.featuredImage.id,
                        url: itinerary.featuredImage.url,
                        altText: itinerary.featuredImage.altText,
                      }
                    : undefined
                }
                meta={itinerary.budgetRange ? `Budget: ${itinerary.budgetRange}` : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-lg">No itineraries available at this time.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
