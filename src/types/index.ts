/**
 * TypeScript type definitions for the application domain.
 *
 * These types mirror the Prisma schema but are designed for the
 * presentation layer — they include only what the UI needs.
 *
 * Import these types in components, pages, and API routes.
 * Do not import Prisma types directly in Server/Client Components.
 */

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export interface SlugParams {
  slug: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ---------------------------------------------------------------------------
// Geographic hierarchy
// ---------------------------------------------------------------------------

export interface CountrySummary {
  id: string;
  name: string;
  slug: string;
  code: string;
  continent?: string | null;
  description?: string | null;
  featuredImage?: ImageSummary | null;
}

export interface RegionSummary {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  country: CountrySummary;
  featuredImage?: ImageSummary | null;
}

export interface DestinationSummary {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  region: RegionSummary;
  featuredImage?: ImageSummary | null;
}

export interface DestinationDetail extends DestinationSummary {
  bestTimeToVisit?: string | null;
  climate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  places: PlaceSummary[];
  articles: ArticleSummary[];
  itineraries: ItinerarySummary[];
  faqs: FaqItem[];
}

export interface PlaceSummary {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  category?: CategoryItem | null;
  destination: DestinationSummary;
  featuredImage?: ImageSummary | null;
}

export interface PlaceDetail extends PlaceSummary {
  description?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  openingHours?: string | null;
  entryFee?: string | null;
  visitDuration?: string | null;
  tips?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  images: ImageSummary[];
  faqs: FaqItem[];
}

// ---------------------------------------------------------------------------
// Content types
// ---------------------------------------------------------------------------

export interface AuthorSummary {
  id: string;
  displayName: string;
  slug: string;
  avatarUrl?: string | null;
  bio?: string | null;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  type: string;
  readingTimeMin?: number | null;
  author: AuthorSummary;
  destination?: DestinationSummary | null;
  featuredImage?: ImageSummary | null;
  publishedAt?: Date | null;
  tags: TagItem[];
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  faqs: FaqItem[];
}

export interface ItinerarySummary {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  durationDays: number;
  difficulty?: string | null;
  budgetRange?: string | null;
  destination?: DestinationSummary | null;
  featuredImage?: ImageSummary | null;
  publishedAt?: Date | null;
}

export interface ItineraryDetail extends ItinerarySummary {
  metaTitle?: string | null;
  metaDescription?: string | null;
  days: ItineraryDayItem[];
}

export interface ItineraryDayItem {
  id: string;
  dayNumber: number;
  title?: string | null;
  description?: string | null;
  highlights: string[];
  accommodation?: string | null;
  meals?: string | null;
}

// ---------------------------------------------------------------------------
// Supporting types
// ---------------------------------------------------------------------------

export interface ImageSummary {
  id: string;
  url: string;
  altText: string;
  caption?: string | null;
  credit?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

export interface TagItem {
  id: string;
  name: string;
  slug: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

// ---------------------------------------------------------------------------
// SEO / Breadcrumbs
// ---------------------------------------------------------------------------

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}
