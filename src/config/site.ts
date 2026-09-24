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
  name: "Wanderlust",
  tagline: "Discover the World's Most Extraordinary Places",
  description:
    "In-depth travel guides, destination inspiration, and curated itineraries to help you plan your next adventure.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wanderlust.travel",
  ogImage: "/images/og-default.jpg",
  twitterHandle: "@wanderlusttravel",
  locale: "en_US",
  author: "Wanderlust Editorial Team",
} as const;

export const navLinks = [
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Guides", href: "/travel-guides" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "Things To Do", href: "/things-to-do" },
] as const;

export const footerLinks = {
  explore: [
    { label: "All Destinations", href: "/destinations" },
    { label: "Travel Guides", href: "/travel-guides" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "Things To Do", href: "/things-to-do" },
    { label: "Places", href: "/places" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
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
} as const;
