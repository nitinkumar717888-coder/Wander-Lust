/**
 * SEO metadata utilities.
 *
 * Provides a composable, reusable approach to generating Next.js
 * Metadata objects. All page-level SEO should be generated through
 * these helpers rather than being hard-coded in individual pages.
 *
 * Architecture decisions:
 * - Server-side only (never imported in Client Components)
 * - Canonical URLs are always absolute
 * - Open Graph and Twitter cards use sensible defaults
 * - Title template follows: "Page Title | Site Name"
 */
import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface SeoOptions {
  title: string;
  description?: string;
  /** Absolute or relative path. Will be made absolute. */
  canonicalPath?: string;
  path?: string;
  /** Absolute URL to the Open Graph / Twitter card image */
  ogImageUrl?: string;
  ogImageAlt?: string;
  /** Set to true for the homepage (prevents " | Site Name" being appended) */
  isHomePage?: boolean;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  keywords?: string[];
}

/**
 * Builds an absolute URL from a path.
 */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Generates a complete Next.js Metadata object for a page.
 *
 * Usage:
 *   export const metadata = buildMetadata({ title: "Manali Travel Guide", ... });
 */
export function buildMetadata({
  title,
  description,
  canonicalPath,
  path,
  ogImageUrl,
  ogImageAlt,
  isHomePage = false,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authorName,
  keywords,
}: SeoOptions): Metadata {
  const siteDescription = siteConfig.description;
  const resolvedDescription = description ?? siteDescription;
  const resolvedOgImage = ogImageUrl ?? absoluteUrl(siteConfig.ogImage);
  const targetPath = canonicalPath ?? path;
  const canonical = targetPath ? absoluteUrl(targetPath) : undefined;

  const resolvedTitle = isHomePage
    ? title
    : { template: `%s | ${siteConfig.name}`, default: title };

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    ...(keywords && { keywords }),
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    authors: authorName ? [{ name: authorName }] : [{ name: siteConfig.author }],
    openGraph: {
      title,
      description: resolvedDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: publishedTime ? "article" : "website",
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      site: siteConfig.twitterHandle,
      images: [resolvedOgImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Alias for buildMetadata for clean page-level API.
 */
export function generatePageMetadata(options: SeoOptions): Metadata {
  return buildMetadata(options);
}

/**
 * Generates BreadcrumbList structured data (JSON-LD).
 */
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): string {
  const listItems = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    ...(item.href && { item: absoluteUrl(item.href) }),
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  });
}

/**
 * Generates WebSite structured data (JSON-LD) for the homepage.
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates Place structured data (JSON-LD).
 */
export function buildPlaceJsonLd({
  name,
  description,
  url,
  image,
  address,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  address?: {
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    url: absoluteUrl(url),
    ...(image && { image: absoluteUrl(image) }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
  };
}

/**
 * Generates Article structured data (JSON-LD).
 */
export function buildArticleJsonLd({
  title,
  description,
  url,
  image,
  publishedAt,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt?: Date | string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(url),
    ...(image && { image: absoluteUrl(image) }),
    ...(publishedAt && { datePublished: new Date(publishedAt).toISOString() }),
    author: {
      "@type": "Person",
      name: authorName ?? siteConfig.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo.png"),
      },
    },
  };
}

/**
 * Generates WebPage structured data (JSON-LD).
 */
export function buildWebPageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description?: string;
  url: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(url),
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  });
}
