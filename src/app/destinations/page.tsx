import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";
import { getAllDestinations } from "@/lib/data/destinations";

export const metadata: Metadata = generatePageMetadata({
  title: "Destinations — Global Travel Catalog",
  description: "Browse curated countries, provinces, and mountain valleys across the globe.",
  path: "/destinations",
});

export default async function DestinationsIndexPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Destinations" },
  ];

  const destinations = await getAllDestinations();

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="max-w-2xl mb-12">
          <Heading as="h1" size="xl">
            Explore Destinations
          </Heading>
          <p className="mt-3 text-stone-600 text-lg leading-relaxed">
            Navigate through countries, regional provinces, and mountain sanctuaries. Designed with structured geographic intelligence to help you map your journey.
          </p>
        </div>

        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <ImageCard
                key={dest.id}
                title={dest.name}
                subtitle={`${dest.region.name}, ${dest.region.country.name}`}
                description={dest.tagline || dest.description || ""}
                href={`/destinations/${dest.region.country.slug}/${dest.region.slug}/${dest.slug}`}
                badge="Featured Destination"
                image={
                  dest.featuredImage
                    ? {
                        id: dest.featuredImage.id,
                        url: dest.featuredImage.url,
                        altText: dest.featuredImage.altText,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-lg">No destinations available at this time.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
