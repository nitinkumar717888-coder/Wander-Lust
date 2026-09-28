import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <Section padding="lg" className="min-h-[70vh] flex items-center justify-center">
      <Container size="narrow">
        <div className="text-center py-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
            Error 404 · Uncharted Route
          </div>

          <Heading as="h1" size="2xl" className="text-stone-900">
            The Trail Ends Here
          </Heading>

          <p className="mt-4 text-lg font-serif text-stone-600 max-w-lg mx-auto leading-relaxed">
            The route, guide, or landmark you were looking for does not exist in our published index, or it may have moved to a new valley.
          </p>

          {/* Search box to help find content */}
          <div className="mt-8 max-w-md mx-auto">
            <SearchInput placeholder="Search destinations, landmarks, guides..." />
          </div>

          {/* Quick links */}
          <div className="mt-10 pt-8 border-t border-stone-200">
            <p className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-4">
              Return to Known Horizons
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button variant="primary" size="sm">
                  Return Home
                </Button>
              </Link>
              <Link href="/destinations">
                <Button variant="outline" size="sm">
                  Explore Destinations
                </Button>
              </Link>
              <Link href="/travel-guides">
                <Button variant="outline" size="sm">
                  Travel Guides
                </Button>
              </Link>
              <Link href="/places">
                <Button variant="outline" size="sm">
                  Notable Places
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-12 text-xs text-stone-400 font-mono">
            {siteConfig.name} — Editorial Travel Discovery
          </p>
        </div>
      </Container>
    </Section>
  );
}
