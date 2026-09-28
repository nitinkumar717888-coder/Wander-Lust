import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";
import { getTravelGuides } from "@/lib/data/articles";

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Guides — In-Depth Destination Manuals",
  description: "Comprehensive editorial travel guides written by on-the-ground journalists and seasoned explorers.",
  path: "/travel-guides",
});

export default async function TravelGuidesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel Guides" },
  ];

  const guides = await getTravelGuides(50);

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-2xl mb-12">
          <Heading as="h1" size="xl">
            Editorial Travel Guides
          </Heading>
          <p className="mt-3 text-stone-600 text-lg leading-relaxed">
            Detailed, road-tested guides focusing on logistics, local culture, timing, and immersive discovery. No AI fluff or generic listicles.
          </p>
        </div>

        {guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <ImageCard
                key={guide.id}
                title={guide.title}
                subtitle={`${guide.readingTimeMin || 5} Min Read · Editorial Guide`}
                description={guide.excerpt || ""}
                href={
                  guide.slug === "best-places-to-visit-in-manali"
                    ? "/best-places-to-visit-in-manali"
                    : `/travel-guides/${guide.slug}`
                }
                badge="Comprehensive Guide"
                image={
                  guide.featuredImage
                    ? {
                        id: guide.featuredImage.id,
                        url: guide.featuredImage.url,
                        altText: guide.featuredImage.altText,
                      }
                    : undefined
                }
                meta={`By ${guide.author.displayName}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-lg">No travel guides available at this time.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
