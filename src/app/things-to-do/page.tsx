import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Things to Do — Curated Activities & Experiences",
  description: "Explore handpicked outdoor activities, cultural tours, hiking trails, and local experiences.",
  path: "/things-to-do",
});

export default function ThingsToDoIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Things to Do" },
  ];

  const activities = [
    {
      title: "Paragliding over Solang Valley",
      subtitle: "Manali · Outdoor Adventure",
      description: "Soar over pine forests and alpine meadows with certified tandem pilots in the Kullu Valley.",
      href: "/things-to-do/paragliding-solang-valley",
      badge: "Top Rated",
      image: {
        id: "img-para",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "Paraglider floating over alpine valley",
      },
    },
    {
      title: "Jogini Waterfall Forest Hike",
      subtitle: "Vashisht · Nature Trail",
      description: "A scenic 2-hour forest trek through apple orchards leading to cascading mountain waterfalls.",
      href: "/things-to-do/jogini-waterfall-hike",
      badge: "Scenic Trail",
      image: {
        id: "img-waterfall",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Himalayan pine forest hiking trail",
      },
    },
  ];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-2xl mb-12">
          <Heading as="h1" size="xl">
            Things to Do &amp; Experiences
          </Heading>
          <p className="mt-3 text-stone-600 text-lg leading-relaxed">
            Discover outdoor adventures, scenic hikes, village walks, and cultural heritage experiences across our destination network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act) => (
            <ImageCard
              key={act.title}
              title={act.title}
              subtitle={act.subtitle}
              description={act.description}
              href={act.href}
              badge={act.badge}
              image={act.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
