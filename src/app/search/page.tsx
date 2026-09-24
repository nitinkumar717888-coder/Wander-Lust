import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SearchInput } from "@/components/ui/SearchInput";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `Search results for "${q}"` : "Search Destinations & Travel Guides";

  return generatePageMetadata({
    title,
    description: "Search across our curated database of countries, regions, destinations, and editorial guides.",
    path: "/search",
    noIndex: true, // Internal search pages should typically not be indexed
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search" },
  ];

  // Foundation search results matching against sample foundation dataset
  const foundationCatalog = [
    {
      type: "Destination",
      title: "Manali",
      location: "Himachal Pradesh, India",
      href: "/places",
      description: "Gateway to high-altitude Himalayan adventures, pine sanctuaries, and alpine trails.",
    },
    {
      type: "Place",
      title: "Solang Valley",
      location: "Manali, Himachal Pradesh",
      href: "/places/solang-valley",
      description: "High-altitude adventure meadow renowned for paragliding and winter skiing.",
    },
    {
      type: "Place",
      title: "Hidimba Devi Temple",
      location: "Manali, Himachal Pradesh",
      href: "/places/hidimba-temple",
      description: "Historic 16th-century wooden pagoda temple built inside Dhungiri cedar forest.",
    },
    {
      type: "Guide",
      title: "The Definitive First-Timer's Guide to Manali & Kullu Valley",
      location: "Himachal Pradesh",
      href: "/travel-guides/manali-first-timers-guide",
      description: "Logistics, acclimatization tips, seasonal snowfall advice, and culinary guide.",
    },
  ];

  const results = query
    ? foundationCatalog.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-2xl mb-8">
          <Heading as="h1" size="xl">
            Search Discovery
          </Heading>
          <p className="mt-2 text-stone-600 text-sm">
            Find destinations, regional guides, points of interest, and itineraries.
          </p>
          <div className="mt-6">
            <SearchInput defaultValue={query} placeholder="Try searching 'Manali', 'Solang', 'India'..." />
          </div>
        </div>

        {query ? (
          <div>
            <p className="text-sm text-stone-500 mb-6">
              Found <strong className="text-stone-900">{results.length}</strong> result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((res) => (
                  <Link key={res.title} href={res.href} className="group">
                    <Card variant="default" className="h-full group-hover:border-amber-500 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold uppercase tracking-wider text-amber-600">
                            {res.type}
                          </span>
                          <span className="text-stone-400">{res.location}</span>
                        </div>
                        <CardTitle className="group-hover:text-amber-700 transition-colors">
                          {res.title}
                        </CardTitle>
                        <CardDescription>{res.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center">
                <p className="text-stone-600 font-medium">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-stone-400 text-sm mt-1">Try searching for &ldquo;Manali&rdquo; or &ldquo;Solang&rdquo; to test foundation data.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-8">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Manali", "Solang Valley", "Hidimba Temple", "India", "Himachal Pradesh"].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full bg-white border border-stone-200 px-4 py-1.5 text-stone-700 hover:border-amber-500 hover:text-amber-700 transition-colors shadow-2xs"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
