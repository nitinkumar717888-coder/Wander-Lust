import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryBySlug } from "@/lib/data/regions";
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
  const { country: countrySlug } = await params;
  const country = await getCountryBySlug(countrySlug);

  if (!country) {
    return generatePageMetadata({
      title: "Country Not Found",
      description: "The requested country could not be located in our travel index.",
      path: `/destinations/${countrySlug}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${country.name} Travel Guide & Regions`,
    description: `Discover top regions, cities, and cultural highlights in ${country.name}. Curated by Routes & Stories editorial experts.`,
    path: `/destinations/${country.slug}`,
  });
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params;
  const country = await getCountryBySlug(countrySlug);

  if (!country) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: country.name },
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
            {country.name}
          </Heading>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            Welcome to the comprehensive travel guide for {country.name}. Explore featured regions, key logistics, cultural heritage, and curated adventures across the territory.
          </p>
        </div>

        {/* Regions section */}
        <div>
          <Heading as="h2" size="lg" className="mb-6">
            Provinces &amp; Regions in {country.name}
          </Heading>
          {country.regions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.regions.map((reg) => (
                <ImageCard
                  key={reg.id}
                  title={reg.name}
                  subtitle={`Region · ${country.name}`}
                  description={reg.description || ""}
                  href={`/destinations/${country.slug}/${reg.slug}`}
                  badge="Region"
                  image={
                    reg.featuredImage
                      ? {
                          id: reg.featuredImage.id,
                          url: reg.featuredImage.url,
                          altText: reg.featuredImage.altText,
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-sm">
              No regions currently indexed for this country.
            </p>
          )}
        </div>

        <div className="mt-12 rounded-2xl bg-stone-50 border border-stone-200/80 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Need travel inspiration?
            </h3>
            <p className="text-sm text-stone-500 mt-1">
              Explore our curated travel guides and road-tested itineraries for {country.name}.
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
