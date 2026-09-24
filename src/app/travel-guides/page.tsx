import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Guides — In-Depth Destination Manuals",
  description: "Comprehensive editorial travel guides written by on-the-ground journalists and seasoned explorers.",
  path: "/travel-guides",
});

export default function TravelGuidesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel Guides" },
  ];

  const guides = [
    {
      title: "The Definitive First-Timer's Guide to Manali & Kullu Valley",
      subtitle: "7 Min Read · Editorial Guide",
      description: "Everything you need to know before visiting Manali: best seasons, top scenic viewpoints, local Himachali cuisine, and essential packing tips.",
      href: "/travel-guides/manali-first-timers-guide",
      badge: "Comprehensive Guide",
      image: {
        id: "img-guide-manali",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Mountain vistas in Kullu Valley",
      },
      meta: "By Aarav Sharma · Updated recently",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <ImageCard
              key={guide.title}
              title={guide.title}
              subtitle={guide.subtitle}
              description={guide.description}
              href={guide.href}
              badge={guide.badge}
              image={guide.image}
              meta={guide.meta}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
