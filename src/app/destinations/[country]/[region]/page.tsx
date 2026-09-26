import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImageCard } from "@/components/ui/ImageCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

interface RegionPageProps {
  params: Promise<{ country: string; region: string }>;
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { country, region } = await params;

  const reg = await db.region.findFirst({
    where: {
      slug: region,
      country: { slug: country },
    },
    include: {
      country: true,
      featuredImage: true,
    },
  });

  if (!reg) {
    return generatePageMetadata({
      title: "Region Not Found",
      description: "The requested region could not be found.",
      path: `/destinations/${country}/${region}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${reg.name}, ${reg.country.name} Travel Guide`,
    description: reg.description || `Complete travel guide to ${reg.name} in ${reg.country.name}. Discover destinations, mountain passes, local culture, and places to visit.`,
    path: `/destinations/${country}/${region}`,
    ogImageUrl: reg.featuredImage?.url,
  });
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { country, region } = await params;

  const reg = await db.region.findFirst({
    where: {
      slug: region,
      country: { slug: country },
    },
    include: {
      country: true,
      featuredImage: true,
      destinations: {
        include: {
          featuredImage: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!reg) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: reg.country.name, href: `/destinations/${country}` },
    { label: reg.name },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    breadcrumbs.map((b) => ({ name: b.label, href: b.href }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Section padding="lg">
        <Container size="default">
          <Breadcrumb items={breadcrumbs} className="mb-6" />

          <div className="max-w-3xl mb-12">
            <Badge variant="category">Region / Province</Badge>
            <Heading as="h1" size="2xl" className="mt-3">
              {reg.name}
            </Heading>
            <p className="mt-2 text-stone-500 font-medium">{reg.country.name}</p>
            {reg.description && (
              <p className="mt-4 text-stone-600 text-lg leading-relaxed">
                {reg.description}
              </p>
            )}
          </div>

          {/* Destinations within Region */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Heading as="h2" size="lg">
                Destinations &amp; Towns in {reg.name}
              </Heading>
            </div>

            {reg.destinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reg.destinations.map((dest) => (
                  <ImageCard
                    key={dest.id}
                    title={dest.name}
                    subtitle={dest.tagline ?? `${reg.name}, ${reg.country.name}`}
                    description={dest.description ?? undefined}
                    href={`/destinations/${country}/${region}/${dest.slug}`}
                    badge="Destination"
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
              <p className="text-stone-500 text-sm">
                No destinations currently indexed for this region.
              </p>
            )}
          </div>

          {/* Travel Guides Callout */}
          <div className="mt-12 rounded-2xl bg-stone-900 text-white p-8 md:p-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Editorial Guides
            </span>
            <h3 className="font-serif text-2xl font-bold mt-2">
              First-Timer&apos;s Guide to {reg.name}
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
    </>
  );
}
