import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generatePageMetadata({
  title: `About ${siteConfig.name} — Editorial Philosophy & Standards`,
  description:
    "An independent travel publication dedicated to authentic route discovery, mountain sanctuaries, and slow cultural travel.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About" },
  ];

  return (
    <Section padding="lg">
      <Container size="narrow">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* Hero Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Editorial Mission
          </div>
          <Heading as="h1" size="2xl">
            About {siteConfig.name}
          </Heading>
          <p className="mt-4 text-xl font-serif text-stone-700 leading-relaxed italic">
            Slow journeys, storied terrain, and independent travel intelligence for the thoughtful explorer.
          </p>
        </header>

        {/* Core Narrative */}
        <div className="space-y-8 text-stone-700 leading-relaxed text-base font-serif">
          <p>
            {siteConfig.name} was established with a singular conviction: travel discovery should be guided by curiosity, patience, and rigorous field observation rather than algorithmic trends or sponsored commercial lists.
          </p>
          <p>
            We document mountain passes, ancient temples, quiet valleys, and local settlements with careful attention to geographic context, seasonal weather realities, and cultural heritage. From high-altitude Himalayan transit corridors to sacred forest groves, our purpose is to give travelers the clarity and insight needed to explore with intention and respect.
          </p>

          <hr className="my-10 border-stone-200" />

          {/* Editorial Standards Section */}
          <div id="standards" className="space-y-6 font-sans">
            <Heading as="h2" size="lg">
              Our Editorial Principles
            </Heading>
            <p className="font-serif text-stone-700">
              Every guide, itinerary, and landmark recommendation adheres to a strict set of journalistic principles:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-4">
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-amber-600 font-mono font-bold text-sm block mb-1">01</span>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  Independent &amp; Unsponsored
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We do not accept paid inclusion, sponsored listings, or commercial kickbacks in exchange for editorial recommendations. When we highlight a trail, sacred site, or remote village, it is chosen solely for its merit and cultural significance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-amber-600 font-mono font-bold text-sm block mb-1">02</span>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  Verified Transit &amp; Logistics
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Mountain geography demands accurate logistics. We document transit windows, road pass permits, seasonal accessibility, and realistic travel durations so journeys remain safe and feasible.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-amber-600 font-mono font-bold text-sm block mb-1">03</span>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  Cultural Reverence
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We respect the living traditions, sacred shrines, and customary laws of the regions we feature. Our guides emphasize humble conduct, attire etiquette, and responsible interaction with local communities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-amber-600 font-mono font-bold text-sm block mb-1">04</span>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  Ecological Responsibility
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Fragile alpine ecosystems cannot sustain careless tourism. We advocate for Leave No Trace ethics, mindful waste management, and sustainable travel practices that preserve wild landscapes for future generations.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-10 border-stone-200" />

          {/* What We Publish */}
          <div className="space-y-6 font-sans">
            <Heading as="h2" size="lg">
              Content Architecture
            </Heading>
            <div className="space-y-4 font-serif text-stone-700">
              <p>
                Our publication organizes travel intelligence across four interconnected layers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm font-sans text-stone-600">
                <li>
                  <strong className="text-stone-900">Destinations:</strong> Regional anchors providing geographic context, weather profiles, seasonal guidance, and cultural overview.
                </li>
                <li>
                  <strong className="text-stone-900">Places to Visit:</strong> Discrete landmarks, ancient temples, natural viewpoints, and mountain valleys with practical visiting hours, durations, and insider tips.
                </li>
                <li>
                  <strong className="text-stone-900">Travel Guides:</strong> Comprehensive long-form essays covering logistical preparation, packing essentials, regional history, and terrain navigation.
                </li>
                <li>
                  <strong className="text-stone-900">Curated Itineraries:</strong> Day-by-day structured routes designed for realistic pacing, altitude acclimatization, and rewarding exploration.
                </li>
              </ul>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12 p-8 rounded-2xl bg-amber-50/70 border border-amber-200/80 not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Explore Our Travel Index
              </h3>
              <p className="text-stone-600 text-sm mt-1">
                Begin discovering routes, places, and comprehensive destination guides.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/destinations">
                <Button variant="primary" size="sm">
                  View Destinations
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
