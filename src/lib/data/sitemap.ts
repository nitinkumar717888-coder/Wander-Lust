import { db } from "@/lib/db";

/**
 * Server-side Data Access Layer — Sitemap
 * Executes exclusively on the server with Prisma Client.
 */

export interface SitemapEntry {
  path: string;
  lastModified?: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export async function getPublishedSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    const [countries, regions, destinations, places, articles, itineraries] = await Promise.all([
      db.country.findMany({
        select: { slug: true, updatedAt: true },
      }),
      db.region.findMany({
        select: {
          slug: true,
          updatedAt: true,
          country: { select: { slug: true } },
        },
      }),
      db.destination.findMany({
        where: { isPublished: true },
        select: {
          slug: true,
          updatedAt: true,
          region: {
            select: {
              slug: true,
              country: { select: { slug: true } },
            },
          },
        },
      }),
      db.place.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      db.article.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      db.itinerary.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const entries: SitemapEntry[] = [];

    // Country pages
    for (const c of countries) {
      entries.push({
        path: `/destinations/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Region pages
    for (const r of regions) {
      entries.push({
        path: `/destinations/${r.country.slug}/${r.slug}`,
        lastModified: r.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Destination pages
    for (const d of destinations) {
      entries.push({
        path: `/destinations/${d.region.country.slug}/${d.region.slug}/${d.slug}`,
        lastModified: d.updatedAt,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }

    // Place pages
    for (const p of places) {
      entries.push({
        path: `/places/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Article pages
    for (const a of articles) {
      entries.push({
        path: `/travel-guides/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Itinerary pages
    for (const i of itineraries) {
      entries.push({
        path: `/itineraries/${i.slug}`,
        lastModified: i.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    return entries;
  } catch (error) {
    console.error("[dataLayer:getPublishedSitemapEntries] Error querying sitemap data:", error);
    return [];
  }
}
