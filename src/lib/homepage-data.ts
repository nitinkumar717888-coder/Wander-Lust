import { db } from "@/lib/db";
import {
  type DestinationSummary,
  type PlaceSummary,
  type ArticleSummary,
  type ItinerarySummary,
} from "@/types";

/**
 * Homepage Data Layer — Database Connected (Prisma / Supabase PostgreSQL)
 *
 * Queries PostgreSQL through Prisma with resilient fallbacks.
 * Preserves exact domain types and Phase 2 visual presentation.
 */

export interface TravelInterest {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  tag: string;
}

export async function getFeaturedDestinations(): Promise<DestinationSummary[]> {
  try {
    const destinations = await db.destination.findMany({
      include: {
        region: {
          include: {
            country: true,
          },
        },
        featuredImage: true,
      },
      take: 6,
      orderBy: { createdAt: "desc" },
    });

    if (destinations.length > 0) {
      return destinations.map((d) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        tagline: d.tagline ?? undefined,
        description: d.description ?? undefined,
        region: {
          id: d.region.id,
          name: d.region.name,
          slug: d.region.slug,
          country: {
            id: d.region.country.id,
            name: d.region.country.name,
            slug: d.region.country.slug,
            code: d.region.country.code,
            continent: d.region.country.continent,
          },
        },
        featuredImage: d.featuredImage
          ? {
              id: d.featuredImage.id,
              url: d.featuredImage.url,
              altText: d.featuredImage.altText,
              credit: d.featuredImage.credit ?? undefined,
            }
          : undefined,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch featured destinations from db:", error);
  }

  // Graceful fallback if database empty
  return [
    {
      id: "dest-manali",
      name: "Manali",
      slug: "manali",
      tagline: "The Crown Jewel of Kullu Valley",
      description: "Himalayan pine forests, alpine river trails, and high mountain passes.",
      region: {
        id: "reg-hp",
        name: "Himachal Pradesh",
        slug: "himachal-pradesh",
        country: {
          id: "country-in",
          name: "India",
          slug: "india",
          code: "IN",
          continent: "Asia",
        },
      },
      featuredImage: {
        id: "img-manali",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        altText: "Snow-covered peaks and cedar pines in Manali",
      },
    },
  ];
}

export async function getPopularPlaces(): Promise<PlaceSummary[]> {
  try {
    const places = await db.place.findMany({
      include: {
        category: true,
        destination: {
          include: {
            region: {
              include: {
                country: true,
              },
            },
          },
        },
        featuredImage: true,
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    if (places.length > 0) {
      return places.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription ?? undefined,
        category: p.category
          ? {
              id: p.category.id,
              name: p.category.name,
              slug: p.category.slug,
            }
          : undefined,
        destination: {
          id: p.destination.id,
          name: p.destination.name,
          slug: p.destination.slug,
          region: {
            id: p.destination.region.id,
            name: p.destination.region.name,
            slug: p.destination.region.slug,
            country: {
              id: p.destination.region.country.id,
              name: p.destination.region.country.name,
              slug: p.destination.region.country.slug,
              code: p.destination.region.country.code,
            },
          },
        },
        featuredImage: p.featuredImage
          ? {
              id: p.featuredImage.id,
              url: p.featuredImage.url,
              altText: p.featuredImage.altText,
              credit: p.featuredImage.credit ?? undefined,
            }
          : undefined,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch popular places from db:", error);
  }

  return [];
}

export async function getEditorialGuides(): Promise<{
  featured: ArticleSummary;
  supporting: ArticleSummary[];
}> {
  try {
    const articles = await db.article.findMany({
      where: { isPublished: true },
      include: {
        author: true,
        featuredImage: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      take: 4,
      orderBy: { publishedAt: "desc" },
    });

    if (articles.length > 0) {
      const mapped: ArticleSummary[] = articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt ?? undefined,
        type: a.type,
        readingTimeMin: a.readingTimeMin ?? 5,
        publishedAt: a.publishedAt ?? undefined,
        author: {
          id: a.author.id,
          displayName: a.author.displayName,
          slug: a.author.slug,
          bio: a.author.bio ?? undefined,
          avatarUrl: a.author.avatarUrl ?? undefined,
        },
        featuredImage: a.featuredImage
          ? {
              id: a.featuredImage.id,
              url: a.featuredImage.url,
              altText: a.featuredImage.altText,
              credit: a.featuredImage.credit ?? undefined,
            }
          : undefined,
        tags: a.tags.map((t) => ({
          id: t.tag.id,
          name: t.tag.name,
          slug: t.tag.slug,
        })),
      }));

      return {
        featured: mapped[0],
        supporting: mapped.slice(1),
      };
    }
  } catch (error) {
    console.error("Failed to fetch editorial guides from db:", error);
  }

  // Fallback structure
  const fallbackArticle: ArticleSummary = {
    id: "guide-manali-main",
    title: "The Definitive First-Timer's Guide to Manali & Kullu Valley",
    slug: "manali-first-timers-guide",
    excerpt:
      "Everything you need to know before visiting Manali: acclimatization timings, seasonal snowfall patterns, secret river trails, and authentic Himachali culinary traditions.",
    type: "GUIDE",
    readingTimeMin: 7,
    author: {
      id: "author-aarav",
      displayName: "Aarav Sharma",
      slug: "aarav-sharma",
      bio: "Senior Himalayan travel journalist",
    },
    publishedAt: new Date("2025-01-15"),
    featuredImage: {
      id: "img-guide-manali",
      url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      altText: "Panoramic Himalayan range overlooking Kullu Valley",
    },
    tags: [
      { id: "tag-himalayas", name: "Himalayas", slug: "himalayas" },
      { id: "tag-seasons", name: "Seasons", slug: "seasons" },
    ],
  };

  return {
    featured: fallbackArticle,
    supporting: [],
  };
}

export function getTravelInterests(): TravelInterest[] {
  return [
    {
      id: "interest-mountains",
      title: "Mountains",
      slug: "mountains",
      description: "High passes, cedar valleys & panoramic alpine ridgelines.",
      iconName: "mountain",
      tag: "Alpine",
    },
    {
      id: "interest-roadtrips",
      title: "Road Trips",
      slug: "road-trips",
      description: "Scenic highway corridors, hairpin passes & remote pit stops.",
      iconName: "route",
      tag: "Overland",
    },
    {
      id: "interest-weekend",
      title: "Weekend Escapes",
      slug: "weekend-escapes",
      description: "Short 2 to 3-day escapes within easy reach of regional hubs.",
      iconName: "clock",
      tag: "Short Trips",
    },
    {
      id: "interest-nature",
      title: "Nature & Wilderness",
      slug: "nature",
      description: "National sanctuaries, pine forests & glacial river valleys.",
      iconName: "trees",
      tag: "Outdoors",
    },
    {
      id: "interest-adventure",
      title: "Adventure",
      slug: "adventure",
      description: "Paragliding, snow skiing, river crossings & rugged treks.",
      iconName: "compass",
      tag: "Thrill",
    },
    {
      id: "interest-beaches",
      title: "Beaches & Coast",
      slug: "beaches",
      description: "Quiet coastal coves, palm lagoons & golden shorelines.",
      iconName: "sun",
      tag: "Coastal",
    },
    {
      id: "interest-family",
      title: "Family Trips",
      slug: "family-trips",
      description: "Accessible trails, comfortable stays & engaging cultural sites.",
      iconName: "users",
      tag: "Comfort",
    },
    {
      id: "interest-budget",
      title: "Budget Travel",
      slug: "budget-travel",
      description: "Homestays, public mountain transit & affordable experiences.",
      iconName: "wallet",
      tag: "Smart Value",
    },
  ];
}

export async function getCuratedItineraries(): Promise<ItinerarySummary[]> {
  try {
    const itineraries = await db.itinerary.findMany({
      where: { isPublished: true },
      include: {
        featuredImage: true,
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    if (itineraries.length > 0) {
      return itineraries.map((i) => ({
        id: i.id,
        title: i.title,
        slug: i.slug,
        summary: i.summary ?? undefined,
        durationDays: i.durationDays,
        difficulty: i.difficulty ?? undefined,
        budgetRange: i.budgetRange ?? undefined,
        featuredImage: i.featuredImage
          ? {
              id: i.featuredImage.id,
              url: i.featuredImage.url,
              altText: i.featuredImage.altText,
              credit: i.featuredImage.credit ?? undefined,
            }
          : undefined,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch curated itineraries from db:", error);
  }

  return [];
}
