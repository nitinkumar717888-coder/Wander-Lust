import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig, footerLinks } from "@/config/site";

/**
 * Footer — dark editorial footer.
 *
 * Server Component — no interactivity needed.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400" role="contentinfo">
      <Container>
        <div className="py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold text-xl mb-4 hover:text-amber-400 transition-colors duration-200"
              aria-label="Wanderlust homepage"
            >
              <svg
                aria-hidden="true"
                className="h-7 w-7 text-amber-500"
                viewBox="0 0 32 32"
                fill="none"
              >
                <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.15" />
                <path
                  d="M16 8l2 5h5l-4 3 1.5 5L16 18l-4.5 3L13 16l-4-3h5z"
                  fill="currentColor"
                />
              </svg>
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
              Explore
            </h2>
            <ul className="space-y-2.5" role="list">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-amber-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
              Company
            </h2>
            <ul className="space-y-2.5" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-amber-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Built for travel discovery. Not affiliated with any booking platform.
          </p>
        </div>
      </Container>
    </footer>
  );
}
