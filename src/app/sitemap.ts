import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedSitemapEntries } from "@/lib/data/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url.replace(/\/$/, "");
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
      url: `${siteUrl}/best-places-to-visit-in-manali`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/itineraries`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const dynamicEntries = await getPublishedSitemapEntries();

  const dynamicRoutes: MetadataRoute.Sitemap = dynamicEntries.map((entry) => ({
    url: `${siteUrl}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  return [...coreRoutes, ...dynamicRoutes];
}
