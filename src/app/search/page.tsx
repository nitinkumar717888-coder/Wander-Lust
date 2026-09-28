import type { Metadata } from "next";
import Link from "next/link";
import { searchContent, type SearchResultItem } from "@/lib/data/search";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SearchInput } from "@/components/ui/SearchInput";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search" },
  ];

  const results: SearchResultItem[] = query.length > 0 ? await searchContent(query) : [];

  return (
    <Section padding="lg">
      <Container size="default">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <div className="max-w-2xl mb-8">
          <Heading as="h1" size="xl">
            Search Discovery
          </Heading>
          <p className="mt-2 text-stone-600 text-sm">
            Search across our database of destinations, landmarks, travel guides, and itineraries.
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
                {results.map((result) => (
                  <Card key={`${result.type}-${result.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                          {result.type}
                        </span>
                        {result.badge && (
                          <Badge variant="category">{result.badge}</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">
                        <Link
                          href={result.href}
                          className="hover:text-amber-700 transition-colors"
                        >
                          {result.title}
                        </Link>
                      </CardTitle>
                      <p className="text-xs text-stone-500 font-medium">{result.location}</p>
                      <CardDescription className="line-clamp-2 mt-2">
                        {result.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                <p className="font-serif text-lg font-bold text-stone-900">
                  No matches found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
                  Try checking for typos or searching for a broader term like &ldquo;Manali&rdquo;, &ldquo;Temple&rdquo;, or &ldquo;Himalayas&rdquo;.
                </p>
                <div className="mt-6">
                  <Link href="/destinations">
                    <button className="px-4 py-2 text-sm font-medium text-amber-800 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors">
                      Browse all destinations
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 border-t border-stone-200">
            <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">
              Suggested Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Manali", "Solang Valley", "Hidimba", "Himalayas", "Itinerary", "Adventure"].map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
