import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generatePageMetadata({
  title: `Terms & Conditions — ${siteConfig.name}`,
  description:
    "Terms and conditions governing the use of the Routes & Stories travel discovery platform.",
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms & Conditions" },
  ];

  return (
    <Section padding="lg">
      <Container size="narrow">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            User Agreement
          </div>
          <Heading as="h1" size="2xl">
            Terms &amp; Conditions
          </Heading>
          <p className="mt-3 text-sm text-stone-500 font-mono">
            Last Updated: September 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-stone-700 leading-relaxed text-base font-serif">
          <p>
            Welcome to {siteConfig.name}. By accessing or browsing our website at{" "}
            <span className="font-mono text-stone-900 text-sm">https://routesandstories.vercel.app/</span>, you agree to comply with and be bound by the following Terms and Conditions of Use. If you do not agree to these terms, please refrain from using our publication.
          </p>

          <hr className="my-8 border-stone-200" />

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              1. Informational &amp; Editorial Nature
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              All editorial materials, itineraries, route summaries, visiting hours, and geographical descriptions provided on {siteConfig.name} are published strictly for informational, educational, and cultural enrichment purposes. They do not constitute official transit timetables, legal advice, commercial tour contracts, or safety warranties.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              2. Intellectual Property Rights
            </h2>
            <div className="space-y-3 text-sm text-stone-600 font-serif leading-relaxed">
              <p>
                Unless otherwise indicated, all original written articles, site design, layouts, logos, curated itinerary sequences, and editorial photography are the intellectual property of {siteConfig.name} and are protected under applicable copyright and intellectual property laws.
              </p>
              <p>
                You may read, bookmark, and print reasonable individual excerpts of our guides for your personal, non-commercial travel planning. You may not systematically reproduce, republish, mirror, sell, or scrape our content for commercial redistribution without prior written consent.
              </p>
            </div>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              3. Independent Travel Responsibilities
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Mountain passes, remote valleys, weather conditions, road accessibility, and local regulations change frequently. Travelers are solely responsible for independently confirming road permits, current weather forecasts, medical advisories, and transit schedules with regional authorities before embarking on any journey. Please review our dedicated{" "}
              <Link href="/disclaimer" className="text-amber-800 underline hover:text-amber-900">
                Travel &amp; Safety Disclaimer
              </Link>{" "}
              for detailed guidance.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              4. External Resources &amp; Third-Party Services
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Our pages may contain hyperlinks to external sites, regional organizations, or local services. These links are provided solely for user convenience. {siteConfig.name} does not endorse, verify, or assume liability for the contents, products, or services of any linked third-party website.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              5. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              This website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. Under no circumstances shall {siteConfig.name}, its editors, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use this website, or reliance on any travel guidance published herein.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              6. Modifications to Terms
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              We reserve the right to revise these Terms &amp; Conditions at our sole discretion. Any changes will become effective immediately upon posting to this page. Your continued use of the website following changes signifies your acceptance.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
