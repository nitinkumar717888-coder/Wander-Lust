import { db } from "@/lib/db";

/**
 * Server-side Data Access Layer — Regions & Countries
 * Executes exclusively on the server with Prisma Client.
 */

export interface RegionSummary {
  id: string;
  name: string;
  slug: string;
  description?: string;
  featuredImage?: {
    id: string;
    url: string;
    altText: string;
  };
}

export interface RegionDetail {
  id: string;
  name: string;
  slug: string;
  description?: string;
  country: {
    id: string;
    name: string;
    slug: string;
    code: string;
  };
  featuredImage?: {
    id: string;
    url: string;
    altText: string;
  };
  destinations: {
    id: string;
    name: string;
    slug: string;
    tagline?: string;
    description?: string;
    featuredImage?: {
      id: string;
      url: string;
      altText: string;
    };
  }[];
}

export interface CountryDetail {
  id: string;
  name: string;
  slug: string;
  code: string;
  continent?: string;
  regions: RegionSummary[];
}

/**
 * Retrieves a region by its slug and country slug, including its destinations.
 */
export async function getRegionBySlug(
  regionSlug: string,
  countrySlug: string
): Promise<RegionDetail | null> {
  try {
    const reg = await db.region.findFirst({
      where: {
        slug: regionSlug,
        country: { slug: countrySlug },
      },
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
          },
        },
        featuredImage: {
          select: {
            id: true,
            url: true,
            altText: true,
          },
        },
        destinations: {
          where: { isPublished: true },
          select: {
            id: true,
            name: true,
            slug: true,
            tagline: true,
            description: true,
            featuredImage: {
              select: {
                id: true,
                url: true,
                altText: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!reg) return null;

    return {
      id: reg.id,
      name: reg.name,
      slug: reg.slug,
      description: reg.description ?? undefined,
      country: reg.country,
      featuredImage: reg.featuredImage ?? undefined,
      destinations: reg.destinations.map((d) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        tagline: d.tagline ?? undefined,
        description: d.description ?? undefined,
        featuredImage: d.featuredImage ?? undefined,
      })),
    };
  } catch (error) {
    console.error(`[dataLayer:getRegionBySlug] Error fetching region "${regionSlug}":`, error);
    return null;
  }
}

/**
 * Retrieves a country by its slug, including all of its regions.
 */
export async function getCountryBySlug(
  countrySlug: string
): Promise<CountryDetail | null> {
  try {
    const country = await db.country.findUnique({
      where: { slug: countrySlug },
      select: {
        id: true,
        name: true,
        slug: true,
        code: true,
        continent: true,
        regions: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            featuredImage: {
              select: {
                id: true,
                url: true,
                altText: true,
              },
            },
          },
          orderBy: { name: "asc" },
        },
      },
    });

    if (!country) return null;

    return {
      id: country.id,
      name: country.name,
      slug: country.slug,
      code: country.code,
      continent: country.continent ?? undefined,
      regions: country.regions.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        description: r.description ?? undefined,
        featuredImage: r.featuredImage ?? undefined,
      })),
    };
  } catch (error) {
    console.error(`[dataLayer:getCountryBySlug] Error fetching country "${countrySlug}":`, error);
    return null;
  }
}
