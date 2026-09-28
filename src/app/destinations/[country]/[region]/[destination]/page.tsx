import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/data/destinations";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { ImageCard } from "@/components/ui/ImageCard";
import {
  generatePageMetadata,
  buildDestinationJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";

interface DestinationPageProps {
  params: Promise<{
    country: string;
    region: string;
    destination: string;
  }>;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { country, region, destination } = await params;

  const dest = await getDestinationBySlug(destination, {
    regionSlug: region,
    countrySlug: country,
  });

  if (!dest) {
    return generatePageMetadata({
      title: "Destination Not Found",
      description: "The requested destination could not be located in our travel index.",
      path: `/destinations/${country}/${region}/${destination}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${dest.name} Travel Guide | ${dest.region.name}, ${dest.region.country.name}`,
    description: dest.description || `Explore ${dest.name} in ${dest.region.name}. Top places, itineraries, and travel guides.`,
    path: `/destinations/${country}/${region}/${destination}`,
    ogImageUrl: dest.featuredImage?.url,
  });
}

export default async function DestinationDetailPage({
  params,
}: DestinationPageProps) {
  const { country, region, destination } = await params;

  const dest = await getDestinationBySlug(destination, {
    regionSlug: region,
    countrySlug: country,
  });

  if (!dest) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: dest.region.country.name, href: `/destinations/${country}` },
    { label: dest.region.name, href: `/destinations/${country}/${region}` },
    { label: dest.name },
  ];

  const destinationJsonLd = buildDestinationJsonLd({
    name: dest.name,
    description: (dest.description || dest.tagline) ?? undefined,
    url: `/destinations/${country}/${region}/${destination}`,
    image: dest.featuredImage?.url,
    containedInPlace: `${dest.region.name}, ${dest.region.country.name}`,
  });

  const faqJsonLd = buildFaqJsonLd(dest.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Section padding="lg">
        <Container size="default">
          <Breadcrumb items={breadcrumbs} className="mb-6" />

          {/* Destination Header */}
          <div className="max-w-3xl mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="category">Destination</Badge>
              <Badge variant="tag">{dest.region.country.name}</Badge>
            </div>
            <Heading as="h1" size="2xl">
              {dest.name}
            </Heading>
            {dest.tagline && (
              <p className="mt-2 text-xl font-serif text-stone-700 italic">
                {dest.tagline}
              </p>
            )}
            <p className="mt-1 text-stone-500 font-medium text-sm">
              {dest.region.name}, {dest.region.country.name}
            </p>
            {dest.description && (
              <p className="mt-4 text-stone-600 text-lg leading-relaxed">
                {dest.description}
              </p>
            )}
          </div>

          {/* Featured Destination Image */}
          {dest.featuredImage && (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-stone-200 mb-12 shadow-sm">
              <Image
                src={dest.featuredImage.url}
                alt={dest.featuredImage.altText}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {dest.featuredImage.credit && (
                <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  Photo: {dest.featuredImage.credit}
                </div>
              )}
            </div>
          )}

          {/* Points of Interest / Places */}
          {dest.places.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Heading as="h2" size="lg">
                    Notable Places &amp; Landmarks
                  </Heading>
                  <p className="text-sm text-stone-500 mt-1">
                    Key points of interest within {dest.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dest.places.map((place) => (
                  <ImageCard
                    key={place.id}
                    title={place.name}
                    subtitle={place.category?.name ?? dest.name}
                    description={place.shortDescription ?? undefined}
                    href={`/places/${place.slug}`}
                    badge={place.category?.name}
                    image={
                      place.featuredImage
                        ? {
                            id: place.featuredImage.id,
                            url: place.featuredImage.url,
                            altText: place.featuredImage.altText,
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Travel Guides */}
          {dest.articles.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Heading as="h2" size="lg">
                    Curated Travel Guides
                  </Heading>
                  <p className="text-sm text-stone-500 mt-1">
                    In-depth editorial articles and advice for {dest.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dest.articles.map((article) => (
                  <Card key={article.id} className="h-full flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="category">{article.type}</Badge>
                        {article.readingTimeMin && (
                          <Badge variant="duration">{article.readingTimeMin} Min Read</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">
                        <Link
                          href={`/travel-guides/${article.slug}`}
                          className="hover:text-amber-700 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      {article.excerpt && (
                        <CardDescription className="line-clamp-2 mt-2">
                          {article.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500">
                        <span>By {article.author.displayName}</span>
                        <Link
                          href={`/travel-guides/${article.slug}`}
                          className="font-medium text-amber-700 hover:text-amber-800"
                        >
                          Read Guide →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Itineraries */}
          {dest.itineraries.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Heading as="h2" size="lg">
                    Day-by-Day Itineraries
                  </Heading>
                  <p className="text-sm text-stone-500 mt-1">
                    Structured routes departing from or featuring {dest.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dest.itineraries.map((itinerary) => (
                  <Card key={itinerary.id}>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="duration">{itinerary.durationDays} Days</Badge>
                        {itinerary.budgetRange && (
                          <Badge variant="budget">{itinerary.budgetRange}</Badge>
                        )}
                        {itinerary.difficulty && (
                          <Badge variant="category">{itinerary.difficulty}</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">
                        <Link
                          href={`/itineraries/${itinerary.slug}`}
                          className="hover:text-amber-700 transition-colors"
                        >
                          {itinerary.title}
                        </Link>
                      </CardTitle>
                      {itinerary.summary && (
                        <CardDescription className="line-clamp-2 mt-2">
                          {itinerary.summary}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {dest.faqs.length > 0 && (
            <div className="mt-14 max-w-3xl">
              <Heading as="h2" size="lg" className="mb-6">
                Frequently Asked Questions about {dest.name}
              </Heading>
              <div className="space-y-4">
                {dest.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-5 rounded-xl border border-stone-200 bg-stone-50/50"
                  >
                    <h3 className="font-semibold text-stone-900 text-base">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
