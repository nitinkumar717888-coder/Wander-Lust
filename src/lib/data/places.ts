import { db } from "@/lib/db";
import type { PlaceSummary, PlaceDetail, ImageSummary } from "@/types";

/**
 * Server-side Data Access Layer — Places
 * Executes exclusively on the server with Prisma Client.
 */

export async function getPopularPlaces(limit = 8): Promise<PlaceSummary[]> {
  try {
    const places = await db.place.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: { createdAt: "desc" },
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
            icon: p.category.icon ?? undefined,
          }
        : undefined,
      destination: {
        id: p.destination.id,
        name: p.destination.name,
        slug: p.destination.slug,
        tagline: p.destination.tagline ?? undefined,
        description: p.destination.description ?? undefined,
        region: {
          id: p.destination.region.id,
          name: p.destination.region.name,
          slug: p.destination.region.slug,
          country: {
            id: p.destination.region.country.id,
            name: p.destination.region.country.name,
            slug: p.destination.region.country.slug,
            code: p.destination.region.country.code,
            continent: p.destination.region.country.continent ?? undefined,
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
  } catch (error) {
    console.error("[dataLayer:getPopularPlaces] Database error:", error);
    return [];
  }
}

export async function getPlacesByDestination(
  destinationSlug: string
): Promise<PlaceSummary[]> {
  try {
    const places = await db.place.findMany({
      where: {
        isPublished: true,
        destination: { slug: destinationSlug },
      },
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
            icon: p.category.icon ?? undefined,
          }
        : undefined,
      destination: {
        id: p.destination.id,
        name: p.destination.name,
        slug: p.destination.slug,
        tagline: p.destination.tagline ?? undefined,
        description: p.destination.description ?? undefined,
        region: {
          id: p.destination.region.id,
          name: p.destination.region.name,
          slug: p.destination.region.slug,
          country: {
            id: p.destination.region.country.id,
            name: p.destination.region.country.name,
            slug: p.destination.region.country.slug,
            code: p.destination.region.country.code,
            continent: p.destination.region.country.continent ?? undefined,
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
  } catch (error) {
    console.error(`[dataLayer:getPlacesByDestination] Error for "${destinationSlug}":`, error);
    return [];
  }
}

export async function getPlaceBySlug(slug: string): Promise<PlaceDetail | null> {
  try {
    const place = await db.place.findFirst({
      where: {
        slug,
        isPublished: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        description: true,
        address: true,
        latitude: true,
        longitude: true,
        openingHours: true,
        entryFee: true,
        visitDuration: true,
        tips: true,
        metaTitle: true,
        metaDescription: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
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
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
            caption: true,
            credit: true,
            width: true,
            height: true,
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

    if (!place) {
      return null;
    }

    const placeSummary: PlaceSummary = {
      id: place.id,
      name: place.name,
      slug: place.slug,
      shortDescription: place.shortDescription ?? undefined,
      category: place.category
        ? {
            id: place.category.id,
            name: place.category.name,
            slug: place.category.slug,
            icon: place.category.icon ?? undefined,
          }
        : undefined,
      destination: {
        id: place.destination.id,
        name: place.destination.name,
        slug: place.destination.slug,
        tagline: place.destination.tagline ?? undefined,
        description: place.destination.description ?? undefined,
        region: {
          id: place.destination.region.id,
          name: place.destination.region.name,
          slug: place.destination.region.slug,
          description: place.destination.region.description ?? undefined,
          country: {
            id: place.destination.region.country.id,
            name: place.destination.region.country.name,
            slug: place.destination.region.country.slug,
            code: place.destination.region.country.code,
            continent: place.destination.region.country.continent ?? undefined,
          },
        },
      },
      featuredImage: place.featuredImage
        ? {
            id: place.featuredImage.id,
            url: place.featuredImage.url,
            altText: place.featuredImage.altText,
            credit: place.featuredImage.credit ?? undefined,
          }
        : undefined,
    };

    return {
      ...placeSummary,
      description: place.description ?? undefined,
      address: place.address ?? undefined,
      latitude: place.latitude ?? undefined,
      longitude: place.longitude ?? undefined,
      openingHours: place.openingHours ?? undefined,
      entryFee: place.entryFee ?? undefined,
      visitDuration: place.visitDuration ?? undefined,
      tips: place.tips ?? undefined,
      metaTitle: place.metaTitle ?? undefined,
      metaDescription: place.metaDescription ?? undefined,
      images: place.images.map((img): ImageSummary => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
        caption: img.caption ?? undefined,
        credit: img.credit ?? undefined,
        width: img.width ?? undefined,
        height: img.height ?? undefined,
      })),
      faqs: place.faqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sortOrder,
      })),
    };
  } catch (error) {
    console.error(`[dataLayer:getPlaceBySlug] Error fetching "${slug}":`, error);
    return null;
  }
}
