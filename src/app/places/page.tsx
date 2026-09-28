import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";
import { getPopularPlaces } from "@/lib/data/places";

export const metadata: Metadata = generatePageMetadata({
  title: "Places to Visit — Monasteries, Viewpoints & Valleys",
  description: "Browse individual points of interest, temples, historical landmarks, and scenic viewpoints.",
  path: "/places",
});

export default async function PlacesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Places" },
  ];

  const places = await getPopularPlaces(50);

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-2xl mb-12">
          <Heading as="h1" size="xl">
            Places &amp; Points of Interest
          </Heading>
          <p className="mt-3 text-stone-600 text-lg leading-relaxed">
            Discover individual landmarks, sacred sites, hiking trails, and heritage quarters with practical logistical details, visit duration, and local etiquette.
          </p>
        </div>

        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <ImageCard
                key={place.id}
                title={place.name}
                subtitle={`${place.destination.name}, ${place.destination.region.name}`}
                description={place.shortDescription || ""}
                href={`/places/${place.slug}`}
                badge={place.category?.name || "Attraction"}
                image={
                  place.featuredImage
                    ? {
                        id: place.featuredImage.id,
                        url: place.featuredImage.url,
                        altText: place.featuredImage.altText,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-lg">No places available at this time.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
