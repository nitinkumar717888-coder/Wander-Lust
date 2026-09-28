import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generatePageMetadata({
  title: `Contact the Editorial Desk — ${siteConfig.name}`,
  description:
    "Get in touch with the Routes & Stories editorial desk for route corrections, editorial inquiries, or field dispatches.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <Section padding="lg">
      <Container size="narrow">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* Hero Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Editorial Desk
          </div>
          <Heading as="h1" size="2xl">
            Contact Us
          </Heading>
          <p className="mt-4 text-xl font-serif text-stone-700 leading-relaxed italic">
            Inquiries, route updates, field notes, and editorial correspondence.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Inquiry Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
                Send an Editorial Dispatch
              </h2>
              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                Whether you noticed a road status change, wish to suggest a cultural landmark, or have a question regarding our published guides, our editorial desk welcomes your note.
              </p>

              <form className="space-y-4" action="#" method="POST">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="e.g., Ananya Sharma"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Topic / Department
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    defaultValue="editorial-correction"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="editorial-correction">Route or Factual Correction</option>
                    <option value="field-dispatch">Field Report or Place Suggestion</option>
                    <option value="press">Press &amp; Publication Inquiry</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Message &amp; Details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Please include relevant destination context, landmark names, or specific guide references..."
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    Submit Editorial Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Guidance */}
          <div className="space-y-6">
            {/* Editorial Notice */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <h3 className="font-serif font-bold text-stone-900 text-base mb-2">
                Editorial Directives
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                We review all legitimate field submissions. If you are reporting an altered trail route, a newly paved section, or updated temple timing, please specify the exact landmark and date observed.
              </p>
              <div className="text-2xs font-mono text-stone-500 uppercase tracking-wider">
                Response Window: 2–3 business days
              </div>
            </div>

            {/* Travel Assistance Notice */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-800">
              <h3 className="font-semibold text-amber-900 text-sm mb-2">
                ⚠️ Not a Booking Agency
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                {siteConfig.name} is an independent editorial publishing engine. We do not operate tours, sell bus or train tickets, or make hotel reservations. Please consult local authorities and registered transit operators for booking services.
              </p>
            </div>

            {/* Quick Links */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <h3 className="font-serif font-bold text-stone-900 text-base mb-3">
                Quick Navigation
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/about#standards" className="text-amber-800 hover:underline">
                    &rarr; Read our Editorial Principles
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-amber-800 hover:underline">
                    &rarr; Read Travel &amp; Safety Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-amber-800 hover:underline">
                    &rarr; Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
