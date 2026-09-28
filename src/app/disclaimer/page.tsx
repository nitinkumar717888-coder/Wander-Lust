import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generatePageMetadata({
  title: `Travel & Safety Disclaimer — ${siteConfig.name}`,
  description:
    "Important mountain safety, altitude, transit, and editorial disclaimer for travelers using Routes & Stories.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel Disclaimer" },
  ];

  return (
    <Section padding="lg">
      <Container size="narrow">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            Safety &amp; Editorial Notice
          </div>
          <Heading as="h1" size="2xl">
            Travel &amp; Safety Disclaimer
          </Heading>
          <p className="mt-3 text-sm text-stone-500 font-mono">
            Last Updated: September 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-stone-700 leading-relaxed text-base font-serif">
          {/* Prominent Callout */}
          <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-300 text-stone-900 not-prose font-sans">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">⚠️</span>
              <div>
                <h2 className="font-bold text-base text-amber-950">
                  Critical Independent Travel Notice
                </h2>
                <p className="mt-1 text-sm text-stone-800 leading-relaxed">
                  {siteConfig.name} is an <strong>independent travel publication</strong>. We are not a licensed travel agency, tour operator, transit booking service, or medical advisor. Mountain environments present dynamic, inherent hazards that require independent preparedness and professional guidance.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-8 border-stone-200" />

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              1. Alpine Hazards &amp; Dynamic Weather
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Himalayan geography, including valleys and passes surrounding Manali, Kullu, Lahaual, and Spiti, is subject to extreme, rapid meteorological shifts. Blizzards, sudden rainfall, flash flooding, landslides, rockfalls, and sub-zero temperatures can occur without advance warning. Published seasonal suggestions are generalizations based on historical patterns and cannot guarantee benign conditions on any given date.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              2. Altitude Sickness &amp; Health Precautions
            </h2>
            <div className="space-y-3 text-sm text-stone-600 font-serif leading-relaxed">
              <p>
                Elevations exceeding 2,500 meters (8,200 feet)—such as Solang Valley, Rohtang Pass, and upper transit corridors—pose genuine medical risks, including Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and High Altitude Cerebral Edema (HACE).
              </p>
              <p>
                Travelers must allow adequate time for physiological acclimatization, maintain hydration, abstain from alcohol during rapid ascents, and never ignore persistent headaches, nausea, or dizziness. Immediate descent is the only definitive treatment for severe mountain sickness. Always consult a qualified medical physician before undertaking high-altitude travel.
              </p>
            </div>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              3. Transit Permits &amp; Administrative Closures
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Road networks throughout Himachal Pradesh, including high mountain passes and tunnels, are regularly managed and restricted by government bodies such as the Border Roads Organisation (BRO), National Highways Authority of India (NHAI), and Himachal Pradesh State Police. Passes may be closed abruptly due to ice, road maintenance, or environmental regulations (e.g., National Green Tribunal daily vehicle caps for Rohtang Pass). Travelers must independently verify daily vehicular permits, pass statuses, and official advisories prior to departure.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              4. Adventure Activities &amp; Commercial Operators
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Activities mentioned in our guides—including trekking, paragliding, skiing, river rafting, and motorcycling—carry inherent physical risks. {siteConfig.name} does not inspect, license, endorse, or insure third-party commercial sports providers, tandem pilots, or river guides. Travelers participate in these activities at their own risk and are strongly urged to verify operator certification, emergency safety equipment, and valid personal travel insurance policies.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              5. Timings, Tariffs &amp; Factual Evolution
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              While our editorial staff strives for journalistic precision, visiting hours, entrance tariffs, temple dress codes, and local regulations evolve continuously. {siteConfig.name} cannot be held responsible for unexpected closures, price adjustments, or logistical inconveniences encountered on the ground.
            </p>
          </section>

          <div className="pt-6 border-t border-stone-200 font-sans text-xs text-stone-500">
            Have a question or regional correction?{" "}
            <Link href="/contact" className="text-amber-800 underline hover:text-amber-900">
              Contact our Editorial Desk
            </Link>{" "}
            or review our{" "}
            <Link href="/terms" className="text-amber-800 underline hover:text-amber-900">
              Terms &amp; Conditions
            </Link>.
          </div>
        </div>
      </Container>
    </Section>
  );
}
