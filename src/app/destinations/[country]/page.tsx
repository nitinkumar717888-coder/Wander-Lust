import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const formattedName = country.charAt(0).toUpperCase() + country.slice(1);

  return generatePageMetadata({
    title: `${formattedName} Travel Guide & Regions`,
    description: `Discover top regions, cities, and cultural highlights in ${formattedName}. Curated by Wanderlust editorial experts.`,
    path: `/destinations/${country}`,
  });
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await params;
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: countryName },
  ];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Country Overview
          </span>
          <Heading as="h1" size="2xl" className="mt-2">
            {countryName}
          </Heading>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            Welcome to the comprehensive travel guide for {countryName}. Explore featured regions, key logistics, cultural heritage, and curated adventures across the territory.
          </p>
        </div>

        {/* Regions section */}
        <div>
          <Heading as="h2" size="lg" className="mb-6">
            Provinces &amp; Regions in {countryName}
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ImageCard
              title="Himachal Pradesh"
              subtitle="Mountain Valley Region"
              description="High mountain passes, apple orchards, deodar forests, and riverside Himalayan towns."
              href={`/destinations/${country}/himachal-pradesh`}
              badge="Northern Region"
              image={{
                id: "img-hp",
                url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
                altText: "Pine-covered mountain valley in Himachal Pradesh",
              }}
            />
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-stone-50 border border-stone-200/80 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Need travel inspiration?
            </h3>
            <p className="text-sm text-stone-500 mt-1">
              Explore our curated travel guides and road-tested itineraries for {countryName}.
            </p>
          </div>
          <Link href="/travel-guides">
            <Button variant="primary">Browse Travel Guides</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
