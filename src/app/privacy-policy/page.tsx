import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generatePageMetadata({
  title: `Privacy Policy — ${siteConfig.name}`,
  description:
    "Privacy policy and data handling practices for the Routes & Stories travel publication.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ];

  return (
    <Section padding="lg">
      <Container size="narrow">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            Legal &amp; Transparency
          </div>
          <Heading as="h1" size="2xl">
            Privacy Policy
          </Heading>
          <p className="mt-3 text-sm text-stone-500 font-mono">
            Last Updated: September 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-stone-700 leading-relaxed text-base font-serif">
          <p>
            {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the publication&rdquo;) operates the travel publication and discovery website accessible at{" "}
            <span className="font-mono text-stone-900 text-sm">https://routesandstories.vercel.app/</span>. This Privacy Policy outlines our principles regarding the collection, use, and protection of visitor data.
          </p>

          <hr className="my-8 border-stone-200" />

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              1. Information We Collect
            </h2>
            <div className="space-y-3 text-sm text-stone-600 font-serif leading-relaxed">
              <p>
                <strong>Server Logs &amp; Telemetry:</strong> When you access our website, our hosting infrastructure automatically records standard technical information. This may include your Internet Protocol (IP) address, browser type and version, referring web page, timestamps, and page request paths. This diagnostic telemetry is processed solely for system security, uptime monitoring, and infrastructure debugging.
              </p>
              <p>
                <strong>Voluntary Submissions:</strong> If you choose to contact our editorial desk using our contact form or correspondence channels, we collect the personal details you provide (such as your name, email address, and message contents) solely to respond to your inquiry.
              </p>
            </div>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              2. Cookies &amp; Local Storage
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Our website uses strictly necessary session techniques to ensure proper page rendering and interface states (such as navigation controls and responsive layouts). We do not deploy third-party advertising trackers or invasive behavioral profiling cookies.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              3. Third-Party Infrastructure
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              To reliably deliver our static and dynamic content globally, we utilize trusted cloud infrastructure providers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-stone-600">
              <li>
                <strong>Vercel:</strong> Web application hosting, edge routing, and SSL termination.
              </li>
              <li>
                <strong>Supabase / PostgreSQL:</strong> Secure server-side database hosting for our travel index and curated guides.
              </li>
              <li>
                <strong>Google Fonts:</strong> Embedded typography resources (Inter and Playfair Display) optimized for cross-browser legibility.
              </li>
            </ul>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              4. External Links to Third Parties
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Our articles and place profiles may link to external websites, government transit advisories (e.g., Border Roads Organisation), or local cultural archives. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              5. Data Retention &amp; Security
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              We implement reasonable administrative and technical security measures to protect correspondence submitted through our platform. Editorial inquiries are retained only as long as necessary to address the inquiry or maintain editorial documentation.
            </p>
          </section>

          <section className="space-y-4 font-sans">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              6. Your Rights &amp; Privacy Contact
            </h2>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Depending on your location, you may have rights under applicable privacy laws to request access to, correction of, or deletion of personal information you have directly submitted to us. To exercise any such rights or ask questions regarding this policy, please reach out via our{" "}
              <Link href="/contact" className="text-amber-800 underline hover:text-amber-900">
                Contact Desk
              </Link>.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
