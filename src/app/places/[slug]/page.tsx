import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  const name = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return generatePageMetadata({
    title: `${name} — Hours, Tickets & Visiting Guide`,
    description: `Complete guide to visiting ${name}. Practical visiting tips, admission fees, optimal hours, and how to reach.`,
    path: `/places/${slug}`,
  });
}

export default async function PlaceDetailPage({ params }: PlacePageProps) {
  const { slug } = await params;
  const placeName = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "India", href: "/destinations/india" },
    { label: "Himachal Pradesh", href: "/destinations/india/himachal-pradesh" },
    { label: placeName },
  ];

  const placeJsonLd = buildPlaceJsonLd({
    name: placeName,
    description: `A premier travel landmark in the Kullu Valley of Himachal Pradesh, India.`,
    url: `/places/${slug}`,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    address: {
      addressLocality: "Manali",
      addressRegion: "Himachal Pradesh",
      addressCountry: "IN",
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
              <Badge variant="category">Point of Interest</Badge>
              <Badge variant="duration">2-3 Hours Visit</Badge>
            </div>
            <Heading as="h1" size="2xl">
              {placeName}
            </Heading>
            <p className="mt-2 text-stone-500 font-medium">
              Manali · Himachal Pradesh, India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
                  alt={`Scenic view of ${placeName}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <Heading as="h2" size="md">
                  About {placeName}
                </Heading>
                <p className="mt-4 text-stone-600 leading-relaxed text-base">
                  Located in the Himalayan foothills near Manali, {placeName} attracts travelers from all across the globe. Whether visiting for seasonal adventure sports, serene deodar pine trails, or cultural history, this landmark represents the distinctive highland character of Himachal Pradesh.
                </p>
              </div>

              <div>
                <Heading as="h2" size="md">
                  Insider Visiting Tips
                </Heading>
                <ul className="mt-4 space-y-3 text-stone-600 text-sm list-disc pl-5">
                  <li>Visit during early morning hours (before 9:30 AM) to experience the freshest mountain light and beat excursion buses.</li>
                  <li>Carry comfortable tread footwear suited for uneven stone steps and pine needles.</li>
                  <li>Dress in layers; alpine weather can shift rapidly from bright sunshine to chilly winds.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Details Card */}
            <div>
              <Card variant="bordered" className="sticky top-28">
                <CardHeader>
                  <CardTitle>Visiting Essentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="font-semibold text-stone-800 block">Recommended Duration</span>
                    <span className="text-stone-500">2 - 3 Hours</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800 block">Entry Fee</span>
                    <span className="text-stone-500">Free admission (Individual activity fees apply)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800 block">Best Season</span>
                    <span className="text-stone-500">October to June</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800 block">Location Coordinates</span>
                    <span className="text-stone-500">32.2432° N, 77.1892° E</span>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <Link href="/destinations/india/himachal-pradesh">
                      <Button variant="outline" className="w-full">
                        Explore Region
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
