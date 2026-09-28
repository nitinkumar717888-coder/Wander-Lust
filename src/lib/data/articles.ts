import { db } from "@/lib/db";
import type { ArticleSummary, ArticleDetail } from "@/types";

/**
 * Server-side Data Access Layer — Articles & Guides
 * Executes exclusively on the server with Prisma Client.
 */

export async function getTravelGuides(limit = 6): Promise<ArticleSummary[]> {
  try {
    const articles = await db.article.findMany({
      where: { isPublished: true },
      take: limit,
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
    });

    return articles.map((a) => ({
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
      destination: a.destination
        ? {
            id: a.destination.id,
            name: a.destination.name,
            slug: a.destination.slug,
            tagline: a.destination.tagline ?? undefined,
            description: a.destination.description ?? undefined,
            region: {
              id: a.destination.region.id,
              name: a.destination.region.name,
              slug: a.destination.region.slug,
              country: {
                id: a.destination.region.country.id,
                name: a.destination.region.country.name,
                slug: a.destination.region.country.slug,
                code: a.destination.region.country.code,
                continent: a.destination.region.country.continent ?? undefined,
              },
            },
          }
        : undefined,
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
    }));
  } catch (error) {
    console.error("[dataLayer:getTravelGuides] Database error:", error);
    return [];
  }
}

export async function getEditorialGuides(limit = 4): Promise<{
  featured: ArticleSummary | null;
  supporting: ArticleSummary[];
}> {
  const guides = await getTravelGuides(limit);
  if (guides.length === 0) {
    return { featured: null, supporting: [] };
  }
  return {
    featured: guides[0] || null,
    supporting: guides.slice(1),
  };
}

export async function getArticlesByDestination(
  destinationSlug: string
): Promise<ArticleSummary[]> {
  try {
    const articles = await db.article.findMany({
      where: {
        isPublished: true,
        destination: { slug: destinationSlug },
      },
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
    });

    return articles.map((a) => ({
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
      destination: a.destination
        ? {
            id: a.destination.id,
            name: a.destination.name,
            slug: a.destination.slug,
            tagline: a.destination.tagline ?? undefined,
            description: a.destination.description ?? undefined,
            region: {
              id: a.destination.region.id,
              name: a.destination.region.name,
              slug: a.destination.region.slug,
              country: {
                id: a.destination.region.country.id,
                name: a.destination.region.country.name,
                slug: a.destination.region.country.slug,
                code: a.destination.region.country.code,
                continent: a.destination.region.country.continent ?? undefined,
              },
            },
          }
        : undefined,
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
    }));
  } catch (error) {
    console.error(`[dataLayer:getArticlesByDestination] Error for "${destinationSlug}":`, error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  try {
    const article = await db.article.findFirst({
      where: {
        slug,
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        type: true,
        readingTimeMin: true,
        metaTitle: true,
        metaDescription: true,
        canonicalUrl: true,
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

    if (!article) {
      return null;
    }

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt ?? undefined,
      content: article.content,
      type: article.type,
      readingTimeMin: article.readingTimeMin ?? undefined,
      publishedAt: article.publishedAt ?? undefined,
      metaTitle: article.metaTitle ?? undefined,
      metaDescription: article.metaDescription ?? undefined,
      canonicalUrl: article.canonicalUrl ?? undefined,
      author: {
        id: article.author.id,
        displayName: article.author.displayName,
        slug: article.author.slug,
        bio: article.author.bio ?? undefined,
        avatarUrl: article.author.avatarUrl ?? undefined,
      },
      destination: article.destination
        ? {
            id: article.destination.id,
            name: article.destination.name,
            slug: article.destination.slug,
            tagline: article.destination.tagline ?? undefined,
            description: article.destination.description ?? undefined,
            region: {
              id: article.destination.region.id,
              name: article.destination.region.name,
              slug: article.destination.region.slug,
              description: article.destination.region.description ?? undefined,
              country: {
                id: article.destination.region.country.id,
                name: article.destination.region.country.name,
                slug: article.destination.region.country.slug,
                code: article.destination.region.country.code,
                continent: article.destination.region.country.continent ?? undefined,
              },
            },
          }
        : undefined,
      featuredImage: article.featuredImage
        ? {
            id: article.featuredImage.id,
            url: article.featuredImage.url,
            altText: article.featuredImage.altText,
            credit: article.featuredImage.credit ?? undefined,
          }
        : undefined,
      tags: article.tags.map((t) => ({
        id: t.tag.id,
        name: t.tag.name,
        slug: t.tag.slug,
      })),
      faqs: article.faqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sortOrder,
      })),
    };
  } catch (error) {
    console.error(`[dataLayer:getArticleBySlug] Error fetching "${slug}":`, error);
    return null;
  }
}
