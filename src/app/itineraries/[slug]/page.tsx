import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
 import { notFound } from "next/navigation";
 import { db } from "@/lib/db";
 import { Container } from "@/components/ui/Container";
 import { Section } from "@/components/ui/Section";
 import { Heading } from "@/components/ui/Heading";
 import { Breadcrumb } from "@/components/ui/Breadcrumb";
 import { Badge } from "@/components/ui/Badge";
 import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
 import { Button } from "@/components/ui/Button";
 import { generatePageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
 }

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const itinerary = await db.itinerary.findUnique({
    where: { slug },
    include: {
      destination: {
        include: {
          region: { include: { country: true } },
        },
      },
      featuredImage: true,
    },
  });

  if (!itinerary) {
    return generatePageMetadata({
      title: "Itinerary Not Found",
      description: "The requested itinerary could not be located in our collection.",
      path: `/itineraries/${slug}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${itinerary.title} — Day-by-Day Route Guide`,
    description: itinerary.summary || `Complete ${itinerary.durationDays}-day travel plan for ${itinerary.title}.`,
    path: `/itineraries/${slug}`,
    ogImageUrl: itinerary.featuredImage?.url,
  });
 }

export default async function ItineraryDetailPage({
  params,
}: ItineraryPageProps) {
  const { slug } = await params;

  const itinerary = await db.itinerary.findUnique({
    where: { slug },
    include: {
      featuredImage: true,
      destination: {
        include: {
          region: {
            include: { country: true },
          },
        },
      },
      days: {
        orderBy: { dayNumber: "asc" },
      },
    },
  });

  if (!itinerary || !itinerary.isPublished) {
    notFound();
  }

  const destinationName = itinerary.destination?.name ?? "Regional";
  const locationLabel = itinerary.destination
    ? `${itinerary.destination.region.name}, ${itinerary.destination.region.country.name}`
    : "Himalayas";

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Itineraries", href: "/itineraries" },
    { label: `${itinerary.durationDays} Days in ${destinationName}` },
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

          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="duration">{itinerary.durationDays} Days</Badge>
              {itinerary.budgetRange && (
                <Badge variant="budget">{itinerary.budgetRange}</Badge>
              )}
              {itinerary.difficulty && (
                <Badge variant="category">{itinerary.difficulty}</Badge>
              )}
            </div>
            <Heading as="h1" size="2xl">
              {itinerary.title}
            </Heading>
            {itinerary.summary && (
              <p className="mt-4 text-stone-600 text-lg leading-relaxed font-serif">
                {itinerary.summary}
              </p>
            )}
            <p className="mt-2 text-stone-500 font-medium text-sm">
              Destination: {destinationName} · {locationLabel}
            </p>
          </div>

          {/* Featured Image */}
          {itinerary.featuredImage && (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-stone-200 mb-12 shadow-sm">
              <Image
                src={itinerary.featuredImage.url}
                alt={itinerary.featuredImage.altText || itinerary.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {itinerary.featuredImage.credit && (
                <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  Photo: {itinerary.featuredImage.credit}
                </div>
              )}
            </div>
          )}

          {/* Day-by-Day Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <Heading as="h2" size="lg" className="mb-6">
                Daily Route &amp; Highlights
              </Heading>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-stone-200 before:hidden sm:before:block">
                {itinerary.days.map((day) => (
                  <div key={day.id} className="relative sm:pl-12">
                    <div className="hidden sm:flex absolute left-0 top-0 h-10 w-10 rounded-full bg-amber-600 text-white font-bold text-sm items-center justify-center shadow-sm">
                      D{day.dayNumber}
                    </div>

                    <Card>
                      <CardHeader>
                        <div className="flex sm:hidden items-center gap-2 mb-2">
                          <span className="h-6 px-2.5 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                            Day {day.dayNumber}
                          </span>
                        </div>
                        <CardTitle className="text-xl">
                          {day.title || `Day ${day.dayNumber}`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {day.description && (
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {day.description}
                          </p>
                        )}

                        {day.highlights && day.highlights.length > 0 && (
                          <div className="pt-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                              Day Highlights:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {day.highlights.map((h, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium"
                                >
                                  ✓ {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {(day.accommodation || day.meals) && (
                          <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-500">
                            {day.accommodation && (
                              <span>
                                <strong>Stay:</strong> {day.accommodation}
                              </span>
                            )}
                            {day.meals && (
                              <span>
                                <strong>Meals:</strong> {day.meals}
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Overview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trip Logistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="font-semibold text-stone-900 block">Total Duration</span>
                    <span className="text-stone-600">{itinerary.durationDays} Days / {itinerary.durationDays - 1} Nights</span>
                  </div>
                  {itinerary.budgetRange && (
                    <div>
                      <span className="font-semibold text-stone-900 block">Estimated Budget</span>
                      <span className="text-stone-600">{itinerary.budgetRange}</span>
                    </div>
                  )}
                  {itinerary.difficulty && (
                    <div>
                      <span className="font-semibold text-stone-900 block">Physical Rating</span>
                      <span className="text-stone-600">{itinerary.difficulty}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-stone-900 block">Primary Destination</span>
                    <span className="text-stone-600">{destinationName}, {locationLabel}</span>
                  </div>
                </CardContent>
              </Card>

              {itinerary.destination && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Explore {itinerary.destination.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-stone-600">
                    <p>
                      Browse all sights, temple shrines, and travel guides for {itinerary.destination.name}.
                    </p>
                    <Link
                      href={`/destinations/${itinerary.destination.region.country.slug}/${itinerary.destination.region.slug}/${itinerary.destination.slug}`}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        Destination Guide →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
