import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return generatePageMetadata({
    title: `${title} — Day-by-Day Route Guide`,
    description: `Complete day-by-day travel plan for ${title}. Daily route schedules, highlights, and overnight stays.`,
    path: `/itineraries/${slug}`,
  });
}

export default async function ItineraryDetailPage({
  params,
}: ItineraryPageProps) {
  const { slug } = await params;

  const itineraryTitle =
    slug === "4-days-manali-adventure"
      ? "4 Days in Manali: From Alpine Meadows to Cedar Temples"
      : slug
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "4 Days in Manali" },
  ];

  const days = [
    {
      day: 1,
      title: "Arrival & Old Manali Village Exploration",
      description:
        "Arrive and settle into your hillside guesthouse. Walk through fragrant deodar cedar groves to the 16th-century Hidimba Devi Temple. Spend the afternoon café-hopping in Old Manali along the bubbling Manalsu River.",
      highlights: ["Hidimba Devi Temple", "Old Manali Cafés", "Dhungiri Cedar Forest"],
    },
    {
      day: 2,
      title: "Alpine Adventure in Solang Valley",
      description:
        "Depart north into Solang Valley. Depending on season, partake in tandem paragliding over summer wildflowers or winter ski lessons. Trek the short trail to Anjani Mahadev waterfall shrine.",
      highlights: ["Solang Valley Adventure", "Paragliding / Skiing", "Anjani Mahadev Trek"],
    },
    {
      day: 3,
      title: "Vashisht Thermal Baths & Jogini Waterfall Hike",
      description:
        "Cross the Beas River to Vashisht village for its historic natural sulphur thermal springs. Embark on the gentle 2-hour forest cliff trail leading to the cascades of Jogini Waterfall.",
      highlights: ["Vashisht Hot Springs", "Jogini Waterfall Hike", "Riverside Apple Orchards"],
    },
    {
      day: 4,
      title: "Naggar Castle Heritage & Himachali Cuisine",
      description:
        "Take a scenic drive to the 500-year-old timber-and-stone Naggar Castle. Visit the Nicholas Roerich Himalayan Art Gallery and conclude your journey with a traditional multi-course Himachali Dham.",
      highlights: ["Naggar Castle", "Roerich Art Gallery", "Himachali Dham Feast"],
    },
  ];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="duration">4 Days</Badge>
            <Badge variant="budget">Mid-Range</Badge>
            <Badge variant="category">Moderate Pace</Badge>
          </div>
          <Heading as="h1" size="2xl">
            {itineraryTitle}
          </Heading>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            A road-tested 4-day itinerary designed to balance high-altitude alpine thrills in Solang with peaceful cultural immersion across ancient Himachali settlements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Days Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {days.map((item) => (
              <div
                key={item.day}
                className="relative pl-8 pb-8 border-l-2 border-stone-200 last:border-0 last:pb-0"
              >
                {/* Timeline node */}
                <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-xs shadow-sm">
                  D{item.day}
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Day 0{item.day}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-stone-600 leading-relaxed text-sm">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Overview Card */}
          <div>
            <Card variant="bordered" className="sticky top-28">
              <CardHeader>
                <CardTitle>Itinerary Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-stone-800 block">Total Duration</span>
                  <span className="text-stone-500">4 Days / 3 Nights</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Starting Hub</span>
                  <span className="text-stone-500">Manali Town, Kullu Valley</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Best Season</span>
                  <span className="text-stone-500">October - November &amp; March - June</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Transportation Mode</span>
                  <span className="text-stone-500">Local taxi hire &amp; walking trails</span>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <Link href="/travel-guides/manali-first-timers-guide">
                    <Button variant="outline" className="w-full">
                      Read Full Manali Guide
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
