import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/**
 * Footer — sophisticated dark editorial footer.
 *
 * Structure:
 * - Brand & Mission statement
 * - Explore navigation (Destinations, Places, Travel Guides, Itineraries)
 * - Company & Editorial Standards
 * - Newsletter subscription placeholder
 * - Clean semantic legal & copyright bar
 *
 * Server Component — zero client-side JavaScript.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: "Destinations", href: "/destinations" },
    { label: "Places to Visit", href: "/places" },
    { label: "Travel Guides", href: "/travel-guides" },
    { label: "Curated Itineraries", href: "/itineraries" },
    { label: "Things to Do", href: "/things-to-do" },
  ];

  const editorialLinks = [
    { label: "About Wanderlust", href: "/about" },
    { label: "Editorial Standards", href: "/about#standards" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-850" role="contentinfo">
      <Container size="default">
        <div className="py-16 lg:py-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white font-bold text-xl mb-4 group"
              aria-label="Wanderlust homepage"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-serif font-black text-lg">
                W
              </span>
              <span className="font-serif tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
              An independent travel discovery platform dedicated to uncovering authentic places, natural sanctuaries, and cultural landscapes with journalistic integrity.
            </p>
            <div className="mt-6 text-xs text-stone-500 font-mono">
              Designed for travelers · Built for discovery
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-200 mb-4 font-mono">
              Explore
            </h3>
            <ul className="space-y-3" role="list">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Standards */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-200 mb-4 font-mono">
              Editorial
            </h3>
            <ul className="space-y-3" role="list">
              {editorialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Newsletter Placeholder */}
          <div className="lg:col-span-4 sm:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-200 mb-2 font-mono">
              The Field Notes Dispatch
            </h3>
            <p className="text-sm text-stone-400 mb-4 leading-relaxed">
              Curated dispatches on secret valleys, seasonal routes, and cultural journeys. Published monthly.
            </p>
            <form className="space-y-2">
              <div className="flex max-w-md gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email for dispatch newsletter"
                  disabled
                  className="w-full rounded-xl bg-stone-900 border border-stone-800 px-4 py-2.5 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 cursor-not-allowed opacity-80"
                />
                <button
                  type="submit"
                  disabled
                  className="rounded-xl bg-stone-800 px-4 py-2.5 text-xs font-semibold text-stone-400 cursor-not-allowed uppercase tracking-wider flex-shrink-0"
                >
                  Join
                </button>
              </div>
              <span className="block text-2xs text-stone-400">
                Newsletter registration opening soon in next release. No spam or commercial affiliate mailers.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-850 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {currentYear} {siteConfig.name}. All editorial rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Independent travel intelligence · Not a booking agent
          </p>
        </div>
      </Container>
    </footer>
  );
}
