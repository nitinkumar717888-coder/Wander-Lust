import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata, buildArticleJsonLd } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await db.article.findUnique({
    where: { slug },
    include: {
      author: true,
      featuredImage: true,
    },
  });

  if (!article) {
    return generatePageMetadata({
      title: "Travel Guide Not Found",
      description: "The requested travel guide could not be located in our publication archives.",
      path: `/travel-guides/${slug}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${article.title} | Wanderlust Editorial`,
    description: article.excerpt || `Read our comprehensive travel guide: ${article.title}.`,
    path: `/travel-guides/${slug}`,
    ogImageUrl: article.featuredImage?.url,
  });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;

  const article = await db.article.findUnique({
    where: { slug },
    include: {
      author: true,
      featuredImage: true,
      destination: {
        include: {
          region: { include: { country: true } },
        },
      },
      tags: {
        include: { tag: true },
      },
      faqs: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!article || !article.isPublished) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel Guides", href: "/travel-guides" },
    { label: article.title },
  ];

  const articleJsonLd = buildArticleJsonLd({
    title: article.title,
    description: article.excerpt ?? `Comprehensive travel guide: ${article.title}`,
    url: `/travel-guides/${slug}`,
    image: article.featuredImage?.url,
    publishedAt: article.publishedAt ?? undefined,
    authorName: article.author.displayName,
  });

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently Published";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        <Section padding="lg">
          <Container size="narrow">
            <Breadcrumb items={breadcrumbs} className="mb-6" />

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="category">{article.type}</Badge>
              {article.readingTimeMin && (
                <Badge variant="duration">{article.readingTimeMin} Min Read</Badge>
              )}
              {article.destination && (
                <Badge variant="tag">
                  {article.destination.name}, {article.destination.region.country.name}
                </Badge>
              )}
            </div>

            <Heading as="h1" size="2xl">
              {article.title}
            </Heading>

            {article.excerpt && (
              <p className="mt-4 text-xl font-serif text-stone-600 leading-relaxed italic">
                {article.excerpt}
              </p>
            )}

            {/* Author Byline */}
            <div className="mt-6 flex items-center gap-4 border-y border-stone-200/80 py-4 text-sm text-stone-600">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-800">
                {article.author.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-stone-900">{article.author.displayName}</p>
                <p className="text-xs text-stone-500">
                  {article.author.bio ?? "Travel Writer"} · Published {formattedDate}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm">
                <Image
                  src={article.featuredImage.url}
                  alt={article.featuredImage.altText || article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
                {article.featuredImage.credit && (
                  <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    Photo: {article.featuredImage.credit}
                  </div>
                )}
              </div>
            )}

            {/* Editorial Body */}
            <div className="mt-10 space-y-6 text-stone-700 leading-relaxed text-lg font-serif">
              {article.content ? (
                article.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-2xl font-sans font-bold text-stone-900 pt-6">
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-xl font-sans font-semibold text-stone-900 pt-4">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })
              ) : (
                <p>Full guide content coming soon.</p>
              )}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mr-2">
                  Tagged:
                </span>
                {article.tags.map((t) => (
                  <span
                    key={t.tag.id}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700"
                  >
                    #{t.tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Article FAQs */}
            {article.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-stone-200">
                <Heading as="h2" size="md" className="mb-6">
                  Frequently Asked Questions
                </Heading>
                <div className="space-y-4">
                  {article.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-5 rounded-xl border border-stone-200 bg-stone-50/50"
                    >
                      <h3 className="font-semibold text-stone-900 text-base">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back Callout */}
            {article.destination && (
              <div className="mt-12 p-8 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">
                    Planning a journey to {article.destination.name}?
                  </h4>
                  <p className="text-stone-600 text-sm mt-1">
                    Discover landmarks, day-by-day itineraries, and local stays.
                  </p>
                </div>
                <Link
                  href={`/destinations/${article.destination.region.country.slug}/${article.destination.region.slug}/${article.destination.slug}`}
                >
                  <Button variant="primary" size="sm">
                    Explore {article.destination.name}
                  </Button>
                </Link>
              </div>
            )}
          </Container>
        </Section>
      </article>
    </>
  );
}
