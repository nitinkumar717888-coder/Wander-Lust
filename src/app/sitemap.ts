import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;
  const lastModified = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/destinations`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/places`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/travel-guides`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/itineraries`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/things-to-do`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const [destinations, places, articles, itineraries] = await Promise.all([
      db.destination.findMany({
        include: {
          region: { include: { country: true } },
        },
      }),
      db.place.findMany({
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

    const dynamicRoutes: MetadataRoute.Sitemap = [
      ...destinations.map((d) => ({
        url: `${siteUrl}/destinations/${d.region.country.slug}/${d.region.slug}/${d.slug}`,
        lastModified: d.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
      ...places.map((p) => ({
        url: `${siteUrl}/places/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...articles.map((a) => ({
        url: `${siteUrl}/travel-guides/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...itineraries.map((i) => ({
        url: `${siteUrl}/itineraries/${i.slug}`,
        lastModified: i.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];

    return [...coreRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Error generating database-driven sitemap:", error);
    return coreRoutes;
  }
}
