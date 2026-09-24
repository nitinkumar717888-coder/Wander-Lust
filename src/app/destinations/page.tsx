import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Destinations — Global Travel Catalog",
  description: "Browse curated countries, provinces, and mountain valleys across the globe.",
  path: "/destinations",
});

export default function DestinationsIndexPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Destinations" },
  ];

  const featuredDestinations = [
    {
      title: "India",
      subtitle: "Country · Asia",
      description: "From the snow-crowned western Himalayas to southern palm lagoons.",
      href: "/destinations/india",
      badge: "Featured Country",
      image: {
        id: "img-india",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Himalayan vistas in northern India",
      },
    },
    {
      title: "Himachal Pradesh",
      subtitle: "Region · India",
      description: "Alpine meadows, high river valleys, apple orchards, and sacred shrines.",
      href: "/destinations/india/himachal-pradesh",
      badge: "Featured Region",
      image: {
        id: "img-hp",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "Pine-covered mountain valley in Himachal Pradesh",
      },
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <ImageCard
              key={dest.title}
              title={dest.title}
              subtitle={dest.subtitle}
              description={dest.description}
              href={dest.href}
              badge={dest.badge}
              image={dest.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
