import { db } from "@/lib/db";
import type { DestinationSummary, DestinationDetail } from "@/types";

/**
 * Server-side Data Access Layer — Destinations
 * Executes exclusively on the server with Prisma Client.
 */

export async function getFeaturedDestinations(
  limit = 6
): Promise<DestinationSummary[]> {
  try {
    const destinations = await db.destination.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: { createdAt: "desc" },
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
          continent: d.region.country.continent ?? undefined,
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
  } catch (error) {
    console.error("[dataLayer:getFeaturedDestinations] Database error:", error);
    return [];
  }
}

export async function getAllDestinations(): Promise<DestinationSummary[]> {
  try {
    const destinations = await db.destination.findMany({
      where: { isPublished: true },
      orderBy: { name: "asc" },
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
          continent: d.region.country.continent ?? undefined,
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
  } catch (error) {
    console.error("[dataLayer:getAllDestinations] Database error:", error);
    return [];
  }
}

export async function getDestinationBySlug(
  slug: string,
  hierarchy?: { regionSlug?: string; countrySlug?: string }
): Promise<DestinationDetail | null> {
  try {
    const destination = await db.destination.findFirst({
      where: {
        slug,
        isPublished: true,
        ...(hierarchy?.regionSlug
          ? {
              region: {
                slug: hierarchy.regionSlug,
                ...(hierarchy?.countrySlug
                  ? { country: { slug: hierarchy.countrySlug } }
                  : {}),
              },
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        tagline: true,
        description: true,
        bestTimeToVisit: true,
        climate: true,
        metaTitle: true,
        metaDescription: true,
        latitude: true,
        longitude: true,
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
        featuredImage: {
          select: {
            id: true,
            url: true,
            altText: true,
            credit: true,
          },
        },
        places: {
          where: { isPublished: true },
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            slug: true,
            shortDescription: true,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                icon: true,
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
        },
        articles: {
          where: { isPublished: true },
          orderBy: { publishedAt: "desc" },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            type: true,
            readingTimeMin: true,
            publishedAt: true,
            author: {
              select: {
                id: true,
                displayName: true,
                slug: true,
                bio: true,
                avatarUrl: true,
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
            tags: {
              select: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
        itineraries: {
          where: { isPublished: true },
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
            featuredImage: {
              select: {
                id: true,
                url: true,
                altText: true,
                credit: true,
              },
            },
          },
        },
        faqs: {
          select: {
            id: true,
            question: true,
            answer: true,
            sortOrder: true,
          },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!destination) {
      return null;
    }

    const destinationSummary: DestinationSummary = {
      id: destination.id,
      name: destination.name,
      slug: destination.slug,
      tagline: destination.tagline ?? undefined,
      description: destination.description ?? undefined,
      region: {
        id: destination.region.id,
        name: destination.region.name,
        slug: destination.region.slug,
        description: destination.region.description ?? undefined,
        country: {
          id: destination.region.country.id,
          name: destination.region.country.name,
          slug: destination.region.country.slug,
          code: destination.region.country.code,
          continent: destination.region.country.continent ?? undefined,
        },
      },
      featuredImage: destination.featuredImage
        ? {
            id: destination.featuredImage.id,
            url: destination.featuredImage.url,
            altText: destination.featuredImage.altText,
            credit: destination.featuredImage.credit ?? undefined,
          }
        : undefined,
    };

    return {
      ...destinationSummary,
      bestTimeToVisit: destination.bestTimeToVisit ?? undefined,
      climate: destination.climate ?? undefined,
      metaTitle: destination.metaTitle ?? undefined,
      metaDescription: destination.metaDescription ?? undefined,
      latitude: destination.latitude ?? undefined,
      longitude: destination.longitude ?? undefined,
      places: destination.places.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription ?? undefined,
        category: p.category
          ? {
              id: p.category.id,
              name: p.category.name,
              slug: p.category.slug,
              icon: p.category.icon ?? undefined,
            }
          : undefined,
        destination: destinationSummary,
        featuredImage: p.featuredImage
          ? {
              id: p.featuredImage.id,
              url: p.featuredImage.url,
              altText: p.featuredImage.altText,
              credit: p.featuredImage.credit ?? undefined,
            }
          : undefined,
      })),
      articles: destination.articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt ?? undefined,
        type: a.type,
        readingTimeMin: a.readingTimeMin ?? undefined,
        publishedAt: a.publishedAt ?? undefined,
        author: {
          id: a.author.id,
          displayName: a.author.displayName,
          slug: a.author.slug,
          bio: a.author.bio ?? undefined,
          avatarUrl: a.author.avatarUrl ?? undefined,
        },
        destination: destinationSummary,
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
      })),
      itineraries: destination.itineraries.map((i) => ({
        id: i.id,
        title: i.title,
        slug: i.slug,
        summary: i.summary ?? undefined,
        durationDays: i.durationDays,
        difficulty: i.difficulty ?? undefined,
        budgetRange: i.budgetRange ?? undefined,
        publishedAt: i.publishedAt ?? undefined,
        destination: destinationSummary,
        featuredImage: i.featuredImage
          ? {
              id: i.featuredImage.id,
              url: i.featuredImage.url,
              altText: i.featuredImage.altText,
              credit: i.featuredImage.credit ?? undefined,
            }
          : undefined,
      })),
      faqs: destination.faqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sortOrder,
      })),
    };
  } catch (error) {
    console.error(`[dataLayer:getDestinationBySlug] Error fetching "${slug}":`, error);
    return null;
  }
}
