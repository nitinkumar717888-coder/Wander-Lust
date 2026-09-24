import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Curated Travel Itineraries — Day-by-Day Plans",
  description: "Tested day-by-day travel routes, logistics, daily highlights, and accommodation tips.",
  path: "/itineraries",
});

export default function ItinerariesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Itineraries" },
  ];

  const itineraries = [
    {
      title: "4 Days in Manali: From Alpine Meadows to Cedar Temples",
      subtitle: "4 Days · Moderate Pace",
      description: "A balanced route covering alpine adventures in Solang Valley, culture in Old Manali, and geothermal springs.",
      href: "/itineraries/4-days-manali-adventure",
      badge: "4 Days",
      image: {
        id: "img-itin-manali",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Pine mountains around Manali valley",
      },
      meta: "Budget: Mid-range · Season: Year-round",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itineraries.map((itinerary) => (
            <ImageCard
              key={itinerary.title}
              title={itinerary.title}
              subtitle={itinerary.subtitle}
              description={itinerary.description}
              href={itinerary.href}
              badge={itinerary.badge}
              image={itinerary.image}
              meta={itinerary.meta}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
