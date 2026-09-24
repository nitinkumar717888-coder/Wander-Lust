import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";

interface ActivityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return generatePageMetadata({
    title: `${name} — Activity Guide & Details`,
    description: `Complete guide to ${name}. Timing, difficulty, equipment, safety tips, and booking recommendations.`,
    path: `/things-to-do/${slug}`,
  });
}

export default async function ActivityDetailPage({
  params,
}: ActivityPageProps) {
  const { slug } = await params;
  const activityTitle = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Things to Do", href: "/things-to-do" },
    { label: activityTitle },
  ];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-3xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="category">Outdoor Activity</Badge>
            <Badge variant="duration">Half Day Experience</Badge>
          </div>
          <Heading as="h1" size="2xl">
            {activityTitle}
          </Heading>
          <p className="mt-2 text-stone-500 font-medium">
            Kullu Valley · Himachal Pradesh, India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1593181824360-f5ecb39823ce?auto=format&fit=crop&w=1200&q=80"
                alt={activityTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            <div>
              <Heading as="h2" size="md">
                Experience Overview
              </Heading>
              <p className="mt-4 text-stone-600 leading-relaxed text-base">
                Take part in {activityTitle}, one of the premier outdoor highlights of the region. Guided by certified instructors with strict adherence to safety standards, this experience allows you to take in the grandeur of the surrounding Himalayan peaks.
              </p>
            </div>

            <div>
              <Heading as="h2" size="md">
                What to Know Before You Go
              </Heading>
              <ul className="mt-4 space-y-3 text-stone-600 text-sm list-disc pl-5">
                <li>Check weather conditions in the morning; high winds or heavy rainfall will pause activities.</li>
                <li>Wear secure shoes with non-slip rubber soles and windbreaker jackets.</li>
                <li>Book through registered operators to verify equipment certification and insurance.</li>
              </ul>
            </div>
          </div>

          <div>
            <Card variant="bordered" className="sticky top-28">
              <CardHeader>
                <CardTitle>Activity Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-stone-800 block">Duration</span>
                  <span className="text-stone-500">2 - 3 Hours</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Fitness Level</span>
                  <span className="text-stone-500">Easy to Moderate</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Ideal Timing</span>
                  <span className="text-stone-500">Morning hours (09:00 - 12:30)</span>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <Link href="/destinations/india/himachal-pradesh">
                    <Button variant="outline" className="w-full">
                      View Destination
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
