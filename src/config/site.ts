/**
 * Site-wide configuration constants.
 *
 * These are used throughout the application for SEO, metadata,
 * navigation, and other static configuration.
 *
 * Do not put secrets here. Environment variables with NEXT_PUBLIC_
 * prefix are safe for client-side use.
 */

export const siteConfig = {
  name: "Routes & Stories",
  tagline: "Discover Extraordinary Routes, Sacred Shrines & Field Notes",
  description:
    "Editorial travel discovery engine. In-depth travel guides, destination intelligence, and day-by-day curated itineraries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://routesandstories.vercel.app",
  ogImage: "/images/og-default.jpg",
  twitterHandle: "@routesandstories",
  locale: "en_US",
  author: "Routes & Stories Editorial Team",
} as const;

export const navLinks = [
  { label: "Destinations", href: "/destinations" },
  { label: "Places", href: "/places" },
  { label: "Travel Guides", href: "/travel-guides" },
  { label: "Itineraries", href: "/itineraries" },
] as const;

export const footerLinks = {
  explore: [
    { label: "Destinations", href: "/destinations" },
    { label: "Places to Visit", href: "/places" },
    { label: "Travel Guides", href: "/travel-guides" },
    { label: "Curated Itineraries", href: "/itineraries" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Travel Disclaimer", href: "/disclaimer" },
  ],
} as const;

export const routes = {
  home: "/",
  destinations: "/destinations",
  destination: (country: string) => `/destinations/${country}`,
  region: (region: string) => `/destinations/${region}`,
  places: "/places",
  place: (slug: string) => `/places/${slug}`,
  guides: "/travel-guides",
  guide: (slug: string) => `/travel-guides/${slug}`,
  itineraries: "/itineraries",
  itinerary: (slug: string) => `/itineraries/${slug}`,
  thingsToDo: "/things-to-do",
  thingToDo: (slug: string) => `/things-to-do/${slug}`,
  search: "/search",
  about: "/about",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  disclaimer: "/disclaimer",
} as const;
