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
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { generatePageMetadata, buildPlaceJsonLd } from "@/lib/seo";

interface PlacePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PlacePageProps): Promise<Metadata> {
  const { slug } = await params;

  const place = await db.place.findUnique({
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

  if (!place) {
    return generatePageMetadata({
      title: "Place Not Found",
      description: "The requested place could not be found.",
      path: `/places/${slug}`,
      noIndex: true,
    });
  }

  const title = `${place.name} — Hours, Tickets & Visiting Guide`;
  const description =
    place.shortDescription ||
    `Complete guide to visiting ${place.name} in ${place.destination.name}, ${place.destination.region.name}. Practical tips, hours, and directions.`;

  return generatePageMetadata({
    title,
    description,
    path: `/places/${slug}`,
    ogImageUrl: place.featuredImage?.url,
  });
}

export default async function PlaceDetailPage({ params }: PlacePageProps) {
  const { slug } = await params;

  const place = await db.place.findUnique({
    where: { slug },
    include: {
      category: true,
      featuredImage: true,
      images: true,
      destination: {
        include: {
          region: {
            include: { country: true },
          },
        },
      },
      faqs: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!place) {
    notFound();
  }

  const { destination } = place;
  const { region } = destination;
  const { country } = region;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: country.name, href: `/destinations/${country.slug}` },
    { label: region.name, href: `/destinations/${country.slug}/${region.slug}` },
    { label: destination.name, href: `/destinations/${country.slug}/${region.slug}/${destination.slug}` },
    { label: place.name },
  ];

  const placeJsonLd = buildPlaceJsonLd({
    name: place.name,
    description: place.shortDescription ?? `${place.name} in ${destination.name}, ${region.name}`,
    url: `/places/${slug}`,
    image: place.featuredImage?.url,
    address: {
      addressLocality: destination.name,
      addressRegion: region.name,
      addressCountry: country.code,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />

      <Section padding="lg">
        <Container size="default">
          <Breadcrumb items={breadcrumbs} className="mb-6" />

          {/* Place Header */}
          <div className="max-w-3xl mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {place.category && (
                <Badge variant="category">{place.category.name}</Badge>
              )}
              {place.visitDuration && (
                <Badge variant="duration">{place.visitDuration}</Badge>
              )}
            </div>
            <Heading as="h1" size="2xl">
              {place.name}
            </Heading>
            <p className="mt-2 text-stone-500 font-medium">
              {destination.name} · {region.name}, {country.name}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {place.featuredImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm">
                  <Image
                    src={place.featuredImage.url}
                    alt={place.featuredImage.altText || `View of ${place.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                  {place.featuredImage.credit && (
                    <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      Photo: {place.featuredImage.credit}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {place.description && (
                <div>
                  <Heading as="h2" size="md">
                    About {place.name}
                  </Heading>
                  <div className="mt-4 prose prose-stone max-w-none text-stone-700 leading-relaxed text-base space-y-4">
                    {place.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips if available */}
              {place.tips && (
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-800">
                  <h3 className="font-semibold text-amber-900 text-base mb-2">
                    💡 Editorial Visiting Tips
                  </h3>
                  <p className="text-sm leading-relaxed">{place.tips}</p>
                </div>
              )}

              {/* FAQs */}
              {place.faqs && place.faqs.length > 0 && (
                <div className="pt-6 border-t border-stone-200">
                  <Heading as="h2" size="md" className="mb-4">
                    Frequently Asked Questions
                  </Heading>
                  <div className="space-y-4">
                    {place.faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-4 rounded-xl border border-stone-200 bg-stone-50/60"
                      >
                        <h3 className="font-semibold text-stone-900 text-sm">
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
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visiting Essentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="font-semibold text-stone-900 block">Admission</span>
                    <span className="text-stone-600">
                      {place.entryFee ?? "Free Entry"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">Opening Hours</span>
                    <span className="text-stone-600">
                      {place.openingHours ?? "Open daily, sunrise to sunset"}
                    </span>
                  </div>
                  {place.visitDuration && (
                    <div>
                      <span className="font-semibold text-stone-900 block">Recommended Time</span>
                      <span className="text-stone-600">{place.visitDuration}</span>
                    </div>
                  )}
                  {place.address && (
                    <div>
                      <span className="font-semibold text-stone-900 block">Address</span>
                      <span className="text-stone-600">{place.address}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Destination card link */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Part of {destination.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-stone-600 space-y-3">
                  <p>
                    Plan your complete trip to {destination.name} with guides, hotels, and itineraries.
                  </p>
                  <Link href={`/destinations/${country.slug}/${region.slug}/${destination.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Explore {destination.name} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
