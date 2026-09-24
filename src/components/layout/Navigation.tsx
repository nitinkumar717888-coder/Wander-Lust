"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/config/site";
import { SearchInput } from "@/components/ui/SearchInput";

/**
 * Navigation — primary editorial site header.
 *
 * Desktop:
 *   Logo | Destinations | Places | Travel Guides | Itineraries | Search
 *
 * Mobile:
 *   Logo | Search Icon Link | Menu Button
 *
 * Features:
 * - Transparent overlay on top of dark hero
 * - Smooth transition to solid frosted surface on scroll (scrollY > 20)
 * - Mobile responsive drawer with accessible focus and controls
 * - Zero heavy dependencies; hardware-accelerated CSS transitions
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

  // Reset mobile menu on route changes during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 motion-reduce:transition-none",
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/60"
          : "bg-transparent border-b border-white/10"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label={`${siteConfig.name} — Go to homepage`}
          >
            <div
              className={cn(
                "flex items-center gap-2.5 transition-colors duration-200",
                isScrolled || isMobileMenuOpen ? "text-stone-900" : "text-white"
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-serif font-black text-lg shadow-xs group-hover:bg-amber-400 transition-colors">
                W
              </span>
              <span className="text-xl font-bold tracking-tight font-serif">
                {siteConfig.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isScrolled
                      ? isActive
                        ? "text-amber-800 bg-amber-50"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      : isActive
                        ? "text-white bg-white/20 backdrop-blur-xs"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search Interaction */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-60">
              <SearchInput compact placeholder="Search places, guides..." />
            </div>
          </div>

          {/* Mobile Right Controls: Search + Menu */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Mobile Search Button */}
            <Link
              href="/search"
              aria-label="Search destinations, places and guides"
              className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                isScrolled || isMobileMenuOpen
                  ? "text-stone-700 hover:bg-stone-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              aria-label={
                isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                isScrolled || isMobileMenuOpen
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-white border-t border-stone-100 overflow-hidden",
          "transition-all duration-300 motion-reduce:transition-none",
          isMobileMenuOpen ? "max-h-screen opacity-100 shadow-xl" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-4 space-y-2">
          <div className="pb-3 border-b border-stone-100">
            <SearchInput placeholder="Search destinations, places, guides..." />
          </div>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150",
                  isActive
                    ? "text-amber-800 bg-amber-50"
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
