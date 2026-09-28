import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/data/articles";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArticleContent } from "@/components/ui/ArticleContent";
import { generatePageMetadata, buildArticleJsonLd, buildFaqJsonLd } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "best-places-to-visit-in-manali") {
    return generatePageMetadata({
      title: "Best Places to Visit in Manali: Attractions & 2–3 Day Plan",
      description:
        "Discover the best places to visit in Manali, including Old Manali, Solang Valley, Hidimba Temple, Vashisht, Jogini Falls, Sissu and more.",
      path: "/best-places-to-visit-in-manali",
    });
  }

  const article = await getArticleBySlug(slug);

  if (!article) {
    return generatePageMetadata({
      title: "Travel Guide Not Found",
      description: "The requested travel guide could not be located in our publication archives.",
      path: `/travel-guides/${slug}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: article.title,
    description: article.excerpt || `Read our comprehensive travel guide: ${article.title}.`,
    path: `/travel-guides/${slug}`,
    ogImageUrl: article.featuredImage?.url,
  });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;

  if (slug === "best-places-to-visit-in-manali") {
    permanentRedirect("/best-places-to-visit-in-manali");
  }

  const article = await getArticleBySlug(slug);

  if (!article) {
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

  const faqJsonLd = buildFaqJsonLd(article.faqs);

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
                <Link
                  href={`/destinations/${article.destination.region.country.slug}/${article.destination.region.slug}/${article.destination.slug}`}
                >
                  <Badge variant="tag" className="hover:border-amber-500 hover:text-amber-800 transition-colors cursor-pointer">
                    {article.destination.name}, {article.destination.region.country.name}
                  </Badge>
                </Link>
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
            <ArticleContent content={article.content} className="mt-10" />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mr-2">
                  Tagged:
                </span>
                {article.tags.map((t) => (
                  <span
                    key={t.id}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700"
                  >
                    #{t.name}
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
