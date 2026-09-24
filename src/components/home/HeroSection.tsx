import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";

/**
 * HeroSection — Cinematic travel hero centerpiece.
 *
 * Requirements:
 * - Eyebrow: "TRAVEL • DISCOVER • EXPLORE"
 * - Headline: "Find places worth going."
 * - Supporting copy: discover destinations, places, guides, itineraries
 * - Primary search interaction: [ Search destinations, places & travel guides ]
 * - Secondary action: "Explore destinations"
 * - Large high-quality travel image with subtle scale transition
 * - Staggered CSS entrance reveals (eyebrow -> heading -> copy -> search)
 * - Zero JS animation library; respects prefers-reduced-motion
 */
export function HeroSection() {
  return (
    <header className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 pt-20 pb-16 text-white">
      {/* Cinematic Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative h-full w-full animate-hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=85"
            alt="Majestic snow-capped Himalayan mountain ridges and evergreen cedar forests"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.72] contrast-[1.08]"
          />
        </div>

        {/* Multi-layered editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/80" />
      </div>

      {/* Hero Content */}
      <Container size="default" className="relative z-10 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* 1. Eyebrow */}
          <div className="animate-fade-slide-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/40 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-amber-300 backdrop-blur-md uppercase">
              TRAVEL • DISCOVER • EXPLORE
            </span>
          </div>

          {/* 2. Headline */}
          <h1 className="animate-fade-slide-2 mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:leading-[1.08]">
            Find places worth going.
          </h1>

          {/* 3. Supporting Copy */}
          <p className="animate-fade-slide-3 mx-auto mt-6 max-w-2xl text-base text-stone-200 sm:text-xl font-light leading-relaxed">
            Discover extraordinary destinations, hidden shrines, road-tested travel guides, and day-by-day itineraries designed for thoughtful exploration.
          </p>

          {/* 4. Primary Search & Secondary Action */}
          <div className="animate-fade-slide-4 mt-8 sm:mt-10 mx-auto max-w-xl">
            <div className="rounded-full p-1.5 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/40 transition-all">
              <SearchInput
                placeholder="Search destinations, places & travel guides..."
                className="w-full"
              />
            </div>

            {/* Secondary Action Link & Popular Queries */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-300">
              <Link href="/destinations">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/30 text-white hover:bg-white/15 hover:border-white/60 text-xs py-1.5 px-4 font-medium"
                >
                  Explore destinations →
                </Button>
              </Link>

              <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
                <span className="text-stone-300 font-semibold">Popular:</span>
                <Link
                  href="/destinations/india/himachal-pradesh"
                  className="hover:text-amber-300 underline underline-offset-4 transition-colors"
                >
                  Himachal Pradesh
                </Link>
                <span>·</span>
                <Link
                  href="/places/solang-valley"
                  className="hover:text-amber-300 underline underline-offset-4 transition-colors"
                >
                  Solang Valley
                </Link>
                <span>·</span>
                <Link
                  href="/itineraries/4-days-manali-adventure"
                  className="hover:text-amber-300 underline underline-offset-4 transition-colors"
                >
                  4 Days in Manali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Subtle Bottom Fade to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </header>
  );
}
