import { db } from "@/lib/db";
import type { ItinerarySummary, ItineraryDetail } from "@/types";

/**
 * Server-side Data Access Layer — Itineraries
 * Executes exclusively on the server with Prisma Client.
 */

export async function getCuratedItineraries(
  limit = 6
): Promise<ItinerarySummary[]> {
  try {
    const itineraries = await db.itinerary.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        durationDays: true,
        difficulty: true,
        budgetRange: true,
        publishedAt: true,
        destination: {
          select: {
            id: true,
            name: true,
            slug: true,
            tagline: true,
            description: true,
            region: {
              select: {
                id: true,
                name: true,
                slug: true,
                country: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    code: true,
                    continent: true,
                  },
                },
              },
            },
          },
        },
        featuredImage: {
          select: {
            id: true,
            url: true,
            altText: true,
            credit: true,
          },
        },
      },
    });

    return itineraries.map((i) => ({
      id: i.id,
      title: i.title,
      slug: i.slug,
      summary: i.summary ?? undefined,
      durationDays: i.durationDays,
      difficulty: i.difficulty ?? undefined,
      budgetRange: i.budgetRange ?? undefined,
      publishedAt: i.publishedAt ?? undefined,
      destination: i.destination
        ? {
            id: i.destination.id,
            name: i.destination.name,
            slug: i.destination.slug,
            tagline: i.destination.tagline ?? undefined,
            description: i.destination.description ?? undefined,
            region: {
              id: i.destination.region.id,
              name: i.destination.region.name,
              slug: i.destination.region.slug,
              country: {
                id: i.destination.region.country.id,
                name: i.destination.region.country.name,
                slug: i.destination.region.country.slug,
                code: i.destination.region.country.code,
                continent: i.destination.region.country.continent ?? undefined,
              },
            },
          }
        : undefined,
      featuredImage: i.featuredImage
        ? {
            id: i.featuredImage.id,
            url: i.featuredImage.url,
            altText: i.featuredImage.altText,
            credit: i.featuredImage.credit ?? undefined,
          }
        : undefined,
    }));
  } catch (error) {
    console.error("[dataLayer:getCuratedItineraries] Database error:", error);
    return [];
  }
}

export async function getItinerariesByDestination(
  destinationSlug: string
): Promise<ItinerarySummary[]> {
  try {
    const itineraries = await db.itinerary.findMany({
      where: {
        isPublished: true,
        destination: { slug: destinationSlug },
      },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        durationDays: true,
        difficulty: true,
        budgetRange: true,
        publishedAt: true,
        destination: {
          select: {
            id: true,
            name: true,
            slug: true,
            tagline: true,
            description: true,
            region: {
              select: {
                id: true,
                name: true,
                slug: true,
                country: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    code: true,
                    continent: true,
                  },
                },
              },
            },
          },
        },
        featuredImage: {
          select: {
            id: true,
            url: true,
            altText: true,
            credit: true,
          },
        },
      },
    });

    return itineraries.map((i) => ({
      id: i.id,
      title: i.title,
      slug: i.slug,
      summary: i.summary ?? undefined,
      durationDays: i.durationDays,
      difficulty: i.difficulty ?? undefined,
      budgetRange: i.budgetRange ?? undefined,
      publishedAt: i.publishedAt ?? undefined,
      destination: i.destination
        ? {
            id: i.destination.id,
            name: i.destination.name,
            slug: i.destination.slug,
            tagline: i.destination.tagline ?? undefined,
            description: i.destination.description ?? undefined,
            region: {
              id: i.destination.region.id,
              name: i.destination.region.name,
              slug: i.destination.region.slug,
              country: {
                id: i.destination.region.country.id,
                name: i.destination.region.country.name,
                slug: i.destination.region.country.slug,
                code: i.destination.region.country.code,
                continent: i.destination.region.country.continent ?? undefined,
              },
            },
          }
        : undefined,
      featuredImage: i.featuredImage
        ? {
            id: i.featuredImage.id,
            url: i.featuredImage.url,
            altText: i.featuredImage.altText,
            credit: i.featuredImage.credit ?? undefined,
          }
        : undefined,
    }));
  } catch (error) {
    console.error(`[dataLayer:getItinerariesByDestination] Error for "${destinationSlug}":`, error);
    return [];
  }
}

export async function getItineraryBySlug(
  slug: string
): Promise<ItineraryDetail | null> {
  try {
    const itinerary = await db.itinerary.findFirst({
      where: {
        slug,
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        durationDays: true,
        difficulty: true,
        budgetRange: true,
        metaTitle: true,
        metaDescription: true,
        publishedAt: true,
        destination: {
          select: {
            id: true,
            name: true,
            slug: true,
            tagline: true,
            description: true,
            region: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                country: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    code: true,
                    continent: true,
                  },
                },
              },
            },
          },
        },
        featuredImage: {
          select: {
            id: true,
            url: true,
            altText: true,
            credit: true,
          },
        },
        days: {
          orderBy: { dayNumber: "asc" },
          select: {
            id: true,
            dayNumber: true,
            title: true,
            description: true,
            highlights: true,
            accommodation: true,
            meals: true,
          },
        },
      },
    });

    if (!itinerary) {
      return null;
    }

    return {
      id: itinerary.id,
      title: itinerary.title,
      slug: itinerary.slug,
      summary: itinerary.summary ?? undefined,
      durationDays: itinerary.durationDays,
      difficulty: itinerary.difficulty ?? undefined,
      budgetRange: itinerary.budgetRange ?? undefined,
      publishedAt: itinerary.publishedAt ?? undefined,
      metaTitle: itinerary.metaTitle ?? undefined,
      metaDescription: itinerary.metaDescription ?? undefined,
      destination: itinerary.destination
        ? {
            id: itinerary.destination.id,
            name: itinerary.destination.name,
            slug: itinerary.destination.slug,
            tagline: itinerary.destination.tagline ?? undefined,
            description: itinerary.destination.description ?? undefined,
            region: {
              id: itinerary.destination.region.id,
              name: itinerary.destination.region.name,
              slug: itinerary.destination.region.slug,
              description: itinerary.destination.region.description ?? undefined,
              country: {
                id: itinerary.destination.region.country.id,
                name: itinerary.destination.region.country.name,
                slug: itinerary.destination.region.country.slug,
                code: itinerary.destination.region.country.code,
                continent: itinerary.destination.region.country.continent ?? undefined,
              },
            },
          }
        : undefined,
      featuredImage: itinerary.featuredImage
        ? {
            id: itinerary.featuredImage.id,
            url: itinerary.featuredImage.url,
            altText: itinerary.featuredImage.altText,
            credit: itinerary.featuredImage.credit ?? undefined,
          }
        : undefined,
      days: itinerary.days.map((d) => ({
        id: d.id,
        dayNumber: d.dayNumber,
        title: d.title ?? undefined,
        description: d.description ?? undefined,
        highlights: d.highlights,
        accommodation: d.accommodation ?? undefined,
        meals: d.meals ?? undefined,
      })),
    };
  } catch (error) {
    console.error(`[dataLayer:getItineraryBySlug] Error fetching "${slug}":`, error);
    return null;
  }
}
