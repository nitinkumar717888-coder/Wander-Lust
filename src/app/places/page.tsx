import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Places to Visit — Monasteries, Viewpoints & Valleys",
  description: "Browse individual points of interest, temples, historical landmarks, and scenic viewpoints.",
  path: "/places",
});

export default function PlacesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Places" },
  ];

  const places = [
    {
      title: "Solang Valley",
      subtitle: "Manali, Himachal Pradesh",
      description: "High-altitude meadow renowned for paragliding in summer and skiing in winter.",
      href: "/places/solang-valley",
      badge: "Adventure",
      image: {
        id: "img-solang",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "Snow-covered peaks in Solang Valley",
      },
    },
    {
      title: "Hidimba Devi Temple",
      subtitle: "Manali, Himachal Pradesh",
      description: "A 16th-century pagoda-style cedar temple dedicated to Hidimba Devi inside Dhungiri forest.",
      href: "/places/hidimba-temple",
      badge: "Heritage",
      image: {
        id: "img-hidimba",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Pine forest surrounding Hidimba Temple",
      },
    },
    {
      title: "Old Manali",
      subtitle: "Manali, Himachal Pradesh",
      description: "A bohemian hillside village with apple orchards, wooden houses, and artisan cafés.",
      href: "/places/old-manali",
      badge: "Culture",
      image: {
        id: "img-old-manali",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "Stone and cedar dwellings in Old Manali",
      },
    },
    {
      title: "Vashisht Hot Springs & Village",
      subtitle: "Manali, Himachal Pradesh",
      description: "Historic sulphur thermal baths and intricate stone temples overlooking the Beas river.",
      href: "/places/vashisht",
      badge: "Wellness",
      image: {
        id: "img-vashisht",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Vashisht hillside village near Manali",
      },
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => (
            <ImageCard
              key={place.title}
              title={place.title}
              subtitle={place.subtitle}
              description={place.description}
              href={place.href}
              badge={place.badge}
              image={place.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
