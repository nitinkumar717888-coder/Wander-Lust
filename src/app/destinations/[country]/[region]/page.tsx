import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";

interface RegionPageProps {
  params: Promise<{ country: string; region: string }>;
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { country, region } = await params;
  const formatName = (str: string) =>
    str
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

  const regionName = formatName(region);
  const countryName = formatName(country);

  return generatePageMetadata({
    title: `${regionName}, ${countryName} Travel Guide`,
    description: `Complete travel guide to ${regionName} in ${countryName}. Discover destinations, mountain passes, local culture, and places to visit.`,
    path: `/destinations/${country}/${region}`,
  });
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { country, region } = await params;
  const formatName = (str: string) =>
    str
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

  const regionName = formatName(region);
  const countryName = formatName(country);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: countryName, href: `/destinations/${country}` },
    { label: regionName },
  ];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-3xl mb-12">
          <Badge variant="category">Region / Province</Badge>
          <Heading as="h1" size="2xl" className="mt-3">
            {regionName}
          </Heading>
          <p className="mt-2 text-stone-500 font-medium">{countryName}</p>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            The Western Himalayan province known for majestic pine valleys, high-altitude passes, ancient wooden temples, and vibrant river trails.
          </p>
        </div>

        {/* Destinations within Region */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <Heading as="h2" size="lg">
              Destinations &amp; Towns in {regionName}
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ImageCard
              title="Manali"
              subtitle="Kullu Valley"
              description="High mountain settlement known for Solang Valley, Hidimba Temple, and Himalayan hiking trails."
              href="/places"
              badge="Top Destination"
              image={{
                id: "img-manali",
                url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
                altText: "Snow-capped peaks in Manali",
              }}
            />
          </div>
        </div>

        {/* Travel Guides Callout */}
        <div className="mt-12 rounded-2xl bg-stone-900 text-white p-8 md:p-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Editorial Guides
          </span>
          <h3 className="font-serif text-2xl font-bold mt-2">
            First-Timer&apos;s Guide to {regionName}
          </h3>
          <p className="text-stone-300 mt-2 max-w-xl text-sm leading-relaxed">
            Detailed information on high-altitude acclimatization, seasonal snowfall patterns, road pass openings, and local Himachali cuisine.
          </p>
          <div className="mt-6">
            <Link href="/travel-guides/manali-first-timers-guide">
              <Button variant="primary">Read Travel Guide</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
