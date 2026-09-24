import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * PlanningCtaSection — "Planning a trip?"
 *
 * Premium discovery CTA encouraging users to explore destinations and guides.
 * Avoids any false claims of active automated booking or trip planner tools.
 */
export function PlanningCtaSection() {
  return (
    <Section padding="xl" className="bg-stone-950 text-white relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 font-mono">
            Next Journey
          </span>

          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Planning a trip?
          </h2>

          <p className="mt-5 text-base sm:text-xl text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
            Discover places, build an itinerary, and make your next journey easier to plan.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/destinations" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-amber-500/20"
              >
                Explore destinations
              </Button>
            </Link>

            <Link href="/travel-guides" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border-stone-700 text-stone-200 hover:text-white hover:bg-stone-900"
              >
                Browse Travel Guides
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-850 flex flex-wrap items-center justify-center gap-8 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Independent field intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Verified regional logistics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Zero sponsored hotel placement</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
