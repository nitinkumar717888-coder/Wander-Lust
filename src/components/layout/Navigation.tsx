"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/config/site";
import { SearchInput } from "@/components/ui/SearchInput";

/**
 * Navigation — primary site header.
 *
 * Client Component because it requires:
 * - Scroll detection (transparent → solid background on scroll)
 * - Mobile menu toggle
 * - Active link state via usePathname
 *
 * Performance notes:
 * - Uses CSS transitions (not JS animations) for header background
 * - Mobile menu is display toggled, not mounted/unmounted
 * - prefers-reduced-motion respected via Tailwind motion-reduce: variants
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 motion-reduce:transition-none",
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label={`${siteConfig.name} — Go to homepage`}
          >
            <div
              className={cn(
                "flex items-center gap-2 transition-colors duration-300",
                isScrolled ? "text-stone-900" : "text-white"
              )}
            >
              {/* Logo mark */}
              <svg
                aria-hidden="true"
                className="h-8 w-8 text-amber-500"
                viewBox="0 0 32 32"
                fill="none"
              >
                <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.15" />
                <path
                  d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z"
                  fill="currentColor"
                  className="text-amber-500"
                />
                <path
                  d="M16 8l2 5h5l-4 3 1.5 5L16 18l-4.5 3L13 16l-4-3h5z"
                  fill="currentColor"
                  className="text-amber-500"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isScrolled
                      ? isActive
                        ? "text-amber-700 bg-amber-50"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      : isActive
                        ? "text-white bg-white/20"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-56">
              <SearchInput compact />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors duration-200",
              isScrolled
                ? "text-stone-700 hover:bg-stone-100"
                : "text-white hover:bg-white/10"
            )}
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-white border-t border-stone-100 overflow-hidden",
          "transition-all duration-300 motion-reduce:transition-none",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-4 space-y-1">
          <div className="pb-3">
            <SearchInput placeholder="Search destinations..." />
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150",
                  isActive
                    ? "text-amber-700 bg-amber-50"
                    : "text-stone-700 hover:text-stone-900 hover:bg-stone-50"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
