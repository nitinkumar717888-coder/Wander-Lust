import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { SearchInput } from "@/components/ui/SearchInput";
import { ImageCard } from "@/components/ui/ImageCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { buildWebSiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  const jsonLd = buildWebSiteJsonLd();

  // Curated editorial destination foundation data (mirrors core data model)
  const featuredDestination = {
    title: "Manali",
    region: "Himachal Pradesh",
    country: "India",
    description:
      "Nestled at 2,050 meters along the rushing Beas River, Manali is the gateway to ancient pine sanctuaries, high Himalayan passes, and alpine adventures.",
    href: "/destinations/india/himachal-pradesh",
    image: {
      id: "img-manali",
      url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      altText: "Snow-capped peaks and evergreen deodar forests in Manali",
    },
    placesCount: 4,
    guidesCount: 3,
  };

  const samplePlaces = [
    {
      title: "Solang Valley",
      subtitle: "Adventure & Alpine",
      description: "Paragliding over wildflower meadows in summer and pristine ski slopes in winter.",
      href: "/places/solang-valley",
      badge: "Must Visit",
      image: {
        id: "img-solang",
        url: "https://images.unsplash.com/photo-1593181824360-f5ecb39823ce?auto=format&fit=crop&w=800&q=80",
        altText: "Alpine meadows of Solang Valley near Manali",
      },
    },
    {
      title: "Hidimba Devi Temple",
      subtitle: "Heritage & Sacred",
      description: "A 16th-century four-tiered wooden pagoda sanctuary inside a tranquil deodar cedar forest.",
      href: "/places/hidimba-temple",
      badge: "Historical",
      image: {
        id: "img-hidimba",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Deodar cedar trees surrounding ancient wooden pagoda temple",
      },
    },
    {
      title: "Old Manali",
      subtitle: "Culture & Village Life",
      description: "Bohemian stone lanes, live acoustic cafés, traditional Himachali timber architecture.",
      href: "/places/old-manali",
      badge: "Local Vibe",
      image: {
        id: "img-old-manali",
        url: "https://images.unsplash.com/photo-1593181824360-f5ecb39823ce?auto=format&fit=crop&w=800&q=80",
        altText: "Rustic stone village houses in Old Manali",
      },
    },
  ];

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <header className="relative overflow-hidden bg-stone-900 pt-32 pb-24 text-white lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-stone-900" />
        </div>

        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
              The Travel Discovery Platform
            </span>

            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.15]">
              Extraordinary places, curated by travelers who know.
            </h1>

            <p className="mt-6 text-lg text-stone-300 sm:text-xl leading-relaxed">
              Explore countries, provinces, and hidden sanctuaries through deep editorial travel guides, curated itineraries, and authentic local spots.
            </p>

            <div className="mt-10 mx-auto max-w-xl">
              <SearchInput placeholder="Search destinations, mountain passes, cities..." />
            </div>

            {/* Quick Filter Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400">
              <span className="font-semibold text-stone-300">Trending:</span>
              <Link
                href="/destinations/india"
                className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20 transition-colors"
              >
                India
              </Link>
              <Link
                href="/destinations/india/himachal-pradesh"
                className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20 transition-colors"
              >
                Himachal Pradesh
              </Link>
              <Link
                href="/places/solang-valley"
                className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20 transition-colors"
              >
                Solang Valley
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* 2. Architectural Hierarchy Showcase */}
      <Section background="warm" padding="md">
        <Container size="default">
          <div className="mb-10 text-center">
            <Badge variant="category">Hierarchical Discovery</Badge>
            <Heading as="h2" size="lg" className="mt-3">
              Designed for Natural Exploration
            </Heading>
            <p className="mx-auto mt-2 max-w-2xl text-stone-600">
              Every spot is interconnected through a clean geographic model designed for real-world route planning and organic discoverability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:border-amber-400 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Level 01</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">Country</h3>
              <p className="mt-2 text-sm text-stone-500">Macro landscape, cultural history, seasons, and arrival logistics.</p>
              <span className="mt-4 inline-block text-xs font-semibold text-stone-700">e.g. India (IN)</span>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:border-amber-400 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Level 02</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">Region</h3>
              <p className="mt-2 text-sm text-stone-500">Provinces and mountain valleys with unique topography and microclimates.</p>
              <span className="mt-4 inline-block text-xs font-semibold text-stone-700">e.g. Himachal Pradesh</span>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:border-amber-400 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Level 03</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">Destination</h3>
              <p className="mt-2 text-sm text-stone-500">Cities and hub settlements with stays, climate info, and travel guides.</p>
              <span className="mt-4 inline-block text-xs font-semibold text-stone-700">e.g. Manali</span>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:border-amber-400 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Level 04</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">Place</h3>
              <p className="mt-2 text-sm text-stone-500">Individual temples, trails, viewpoints, hours, duration, and local tips.</p>
              <span className="mt-4 inline-block text-xs font-semibold text-stone-700">e.g. Solang Valley</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Featured Destination Spotlight */}
      <Section padding="lg">
        <Container size="default">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <Badge variant="duration">Featured Destination</Badge>
              <Heading as="h2" size="xl" className="mt-2">
                Himalayan Heights: {featuredDestination.title}
              </Heading>
              <p className="mt-1 text-stone-600">
                {featuredDestination.region}, {featuredDestination.country}
              </p>
            </div>
            <Link href={featuredDestination.href}>
              <Button variant="outline">Explore All in {featuredDestination.title}</Button>
            </Link>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePlaces.map((place) => (
              <ImageCard
                key={place.title}
                title={place.title}
                subtitle={place.subtitle}
                description={place.description}
                href={place.href}
                badge={place.badge}
                image={place.image}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Editorial Content Pillar Preview */}
      <Section background="stone" padding="lg">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Editorial Integrity
              </span>
              <Heading as="h2" size="xl" className="mt-2">
                Content that converts curiosity into unforgettable journeys.
              </Heading>
              <p className="mt-4 text-stone-600 leading-relaxed">
                We reject superficial top-10 lists. Our guides are crafted with deep geographical hierarchy, verifiable logistical details, seasonal timing recommendations, and structured FAQs.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/travel-guides">
                  <Button variant="primary">Browse Travel Guides</Button>
                </Link>
                <Link href="/itineraries">
                  <Button variant="ghost">View Itineraries</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Key Foundation Milestones
              </h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  Hierarchical Prisma Schema (Country → Region → Destination → Place)
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  Full SEO Engine: OpenGraph, Twitter Cards, Breadcrumbs &amp; JSON-LD
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  Next.js App Router Architecture with Server Components by default
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  Accessible UI Primitives and Semantic HTML5 layout
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
