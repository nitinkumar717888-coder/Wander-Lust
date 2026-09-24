import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata, buildArticleJsonLd } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return generatePageMetadata({
    title: `${title} | Wanderlust Editorial`,
    description: `Complete travel guide to ${title}. Logistics, top destinations, local culinary highlights, and practical advice.`,
    path: `/travel-guides/${slug}`,
  });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guideTitle = "The Definitive First-Timer's Guide to Manali & Kullu Valley";

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel Guides", href: "/travel-guides" },
    { label: "Manali First-Timer's Guide" },
  ];

  const articleJsonLd = buildArticleJsonLd({
    title: guideTitle,
    description:
      "Everything you need to know before visiting Manali: best seasons, top scenic viewpoints, local Himachali cuisine, and essential packing tips.",
    url: `/travel-guides/${slug}`,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2025-01-15"),
    authorName: "Aarav Sharma",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        <Section padding="lg">
          <Container size="narrow">
            <Breadcrumb items={breadcrumbs} className="mb-6" />

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="category">Travel Guide</Badge>
              <Badge variant="duration">7 Min Read</Badge>
            </div>

            <Heading as="h1" size="2xl">
              {guideTitle}
            </Heading>

            <div className="mt-6 flex items-center gap-4 border-y border-stone-200/80 py-4 text-sm text-stone-600">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-800">
                AS
              </div>
              <div>
                <p className="font-semibold text-stone-900">Aarav Sharma</p>
                <p className="text-xs text-stone-500">Senior Himalayan Journalist · Published Jan 2025</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
                alt="Manali valley scenic view"
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>

            {/* Editorial Body */}
            <div className="mt-10 space-y-6 text-stone-700 leading-relaxed text-lg font-serif">
              <p>
                Few Himalayan landscapes evoke as vivid a sense of adventure as the Kullu Valley. Flanked by high alpine ridges and blanketed in ancient deodar cedar forests, Manali sits as both a serene sanctuary and a launching pad for daring journeys into Lahaul, Spiti, and Ladakh.
              </p>

              <h2 className="font-sans text-2xl font-bold text-stone-900 pt-4">
                1. Best Seasons to Experience Manali
              </h2>
              <p className="font-sans text-base text-stone-600">
                Depending on your travel preferences, the valley offers two distinct personalities:
              </p>
              <ul className="font-sans text-base text-stone-600 list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-stone-900">The Winter Snowscape (December - February):</strong> Heavy snowfall transforms Solang Valley and Upper Manali into a premier skiing haven. Temperatures hover between -2°C and 8°C.
                </li>
                <li>
                  <strong className="text-stone-900">The Spring Awakening (March - June):</strong> Wildflowers bloom across terrace meadows and apple orchards burst with white blossoms. Perfect for paragliding and high mountain passes.
                </li>
              </ul>

              <h2 className="font-sans text-2xl font-bold text-stone-900 pt-4">
                2. Unmissable Geographic Highlights
              </h2>
              <p className="font-sans text-base text-stone-600">
                To capture the authentic character of the valley, explore beyond the commercial Mall Road:
              </p>
              <div className="font-sans not-prose my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/places/solang-valley"
                  className="rounded-xl border border-stone-200 p-4 hover:border-amber-500 transition-colors"
                >
                  <h4 className="font-bold text-stone-900">Solang Valley →</h4>
                  <p className="text-xs text-stone-500 mt-1">Alpine meadows and adventure sports hub</p>
                </Link>
                <Link
                  href="/places/hidimba-temple"
                  className="rounded-xl border border-stone-200 p-4 hover:border-amber-500 transition-colors"
                >
                  <h4 className="font-bold text-stone-900">Hidimba Devi Temple →</h4>
                  <p className="text-xs text-stone-500 mt-1">16th-century pagoda inside cedar sanctuary</p>
                </Link>
              </div>

              <h2 className="font-sans text-2xl font-bold text-stone-900 pt-4">
                3. Essential Logistical Tips
              </h2>
              <p className="font-sans text-base text-stone-600">
                Allow yourself 24 hours of relaxed pacing upon arrival if you are continuing upward past 3,000 meters. Always support local Himachali homestays and remember to leave mountain trails cleaner than you found them.
              </p>
            </div>

            {/* Next Itinerary Card */}
            <div className="mt-12 rounded-2xl bg-stone-50 border border-stone-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase text-amber-600">Ready to plan?</span>
                <h4 className="font-serif text-lg font-bold text-stone-900 mt-1">
                  View the 4-Day Manali Adventure Itinerary
                </h4>
              </div>
              <Link href="/itineraries/4-days-manali-adventure">
                <Button variant="primary">View Itinerary</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </article>
    </>
  );
}
