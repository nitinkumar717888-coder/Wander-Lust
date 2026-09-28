import { db } from "@/lib/db";

/**
 * Server-side Data Access Layer — Search
 * Executes exclusively on the server with Prisma Client.
 */

export interface SearchResultItem {
  id: string;
  type: "Destination" | "Place" | "Guide" | "Itinerary";
  title: string;
  location: string;
  href: string;
  description: string;
  badge?: string;
}

export async function searchContent(
  query: string
): Promise<SearchResultItem[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return [];
  }

  try {
    const [destinations, places, articles, itineraries] = await Promise.all([
      db.destination.findMany({
        where: {
          isPublished: true,
          OR: [
            { name: { contains: cleanQuery, mode: "insensitive" } },
            { description: { contains: cleanQuery, mode: "insensitive" } },
            { tagline: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          tagline: true,
          description: true,
          region: {
            select: {
              name: true,
              slug: true,
              country: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
        take: 10,
      }),

      db.place.findMany({
        where: {
          isPublished: true,
          OR: [
            { name: { contains: cleanQuery, mode: "insensitive" } },
            { shortDescription: { contains: cleanQuery, mode: "insensitive" } },
            { description: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          category: {
            select: {
              name: true,
            },
          },
          destination: {
            select: {
              name: true,
              region: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        take: 10,
      }),

      db.article.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: cleanQuery, mode: "insensitive" } },
            { excerpt: { contains: cleanQuery, mode: "insensitive" } },
            { content: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          type: true,
          destination: {
            select: {
              name: true,
            },
          },
        },
        take: 10,
      }),

      db.itinerary.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: cleanQuery, mode: "insensitive" } },
            { summary: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          durationDays: true,
          destination: {
            select: {
              name: true,
            },
          },
        },
        take: 10,
      }),
    ]);

    const results: SearchResultItem[] = [];

    for (const d of destinations) {
      results.push({
        id: `dest-${d.id}`,
        type: "Destination",
        title: d.name,
        location: `${d.region.name}, ${d.region.country.name}`,
        href: `/destinations/${d.region.country.slug}/${d.region.slug}/${d.slug}`,
        description: d.tagline || d.description || "",
        badge: "Destination",
      });
    }

    for (const p of places) {
      results.push({
        id: `place-${p.id}`,
        type: "Place",
        title: p.name,
        location: `${p.destination.name}, ${p.destination.region.name}`,
        href: `/places/${p.slug}`,
        description: p.shortDescription || "",
        badge: p.category?.name || "Attraction",
      });
    }

    for (const a of articles) {
      results.push({
        id: `article-${a.id}`,
        type: "Guide",
        title: a.title,
        location: a.destination ? a.destination.name : "Editorial",
        href: `/travel-guides/${a.slug}`,
        description: a.excerpt || "",
        badge: a.type === "GUIDE" ? "Travel Guide" : "Story",
      });
    }

    for (const i of itineraries) {
      results.push({
        id: `itinerary-${i.id}`,
        type: "Itinerary",
        title: i.title,
        location: i.destination ? i.destination.name : "Route",
        href: `/itineraries/${i.slug}`,
        description: i.summary || "",
        badge: `${i.durationDays} Days`,
      });
    }

    return results;
  } catch (error) {
    console.error(`[dataLayer:searchContent] Error searching for "${cleanQuery}":`, error);
    return [];
  }
}
