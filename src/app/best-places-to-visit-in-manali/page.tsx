import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Best Places to Visit in Manali: Attractions & 2–3 Day Plan",
  description:
    "Discover the best places to visit in Manali, including Old Manali, Solang Valley, Hidimba Temple, Vashisht, Jogini Falls, Sissu and more.",
  path: "/best-places-to-visit-in-manali",
  ogImageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
});

const faqsData = [
  {
    id: "faq-1",
    question: "How many days are enough for Manali?",
    answer:
      "Two days are enough for the main highlights, while three days gives you more flexibility. Four or more days are better if you want to explore places beyond the standard Manali circuit.",
  },
  {
    id: "faq-2",
    question: "What is the most famous place in Manali?",
    answer:
      "Hidimba Devi Temple, Solang Valley and Rohtang Pass are among the best-known attractions associated with Manali. Their appeal is different: the temple for its architecture and setting, Solang for mountain scenery and activities, and Rohtang for its high-altitude landscape and seasonal snow.",
  },
  {
    id: "faq-3",
    question: "Is Manali good for a 2-day trip?",
    answer:
      "Yes. A two-day trip works if you focus on local Manali on the first day and choose one major excursion, such as Solang Valley, on the second.",
  },
  {
    id: "faq-4",
    question: "What can I cover in Manali in 3 days?",
    answer:
      "A practical three-day itinerary is: Day 1: Hidimba Temple, Manu Temple, Old Manali and Mall Road. Day 2: Solang Valley. Day 3: Atal Tunnel and Sissu or Vashisht and Jogini Falls.",
  },
  {
    id: "faq-5",
    question: "Which is better for a first trip, Solang Valley or Rohtang Pass?",
    answer:
      "They are different experiences. Solang Valley is easier to include in a short Manali itinerary and offers mountain scenery and seasonal activities. Rohtang is a higher-altitude excursion with additional access considerations and daily permits. Check current conditions before deciding.",
  },
  {
    id: "faq-6",
    question: "What should I not miss in Manali?",
    answer:
      "For a first trip, don't miss Hidimba Devi Temple, Old Manali and Solang Valley. If you have another day, add either Vashisht and Jogini Falls or the Atal Tunnel and Sissu route.",
  },
];

export default function BestPlacesToVisitInManaliPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "India", href: "/destinations/india" },
    { label: "Himachal Pradesh", href: "/destinations/india/himachal-pradesh" },
    { label: "Manali", href: "/destinations/india/himachal-pradesh/manali" },
    { label: "Best Places to Visit in Manali" },
  ];

  const articleJsonLd = buildArticleJsonLd({
    title: "Best Places to Visit in Manali: A Practical Guide for Your Trip",
    description:
      "Discover the best places to visit in Manali, including Old Manali, Solang Valley, Hidimba Temple, Vashisht, Jogini Falls, Sissu and more.",
    url: "/best-places-to-visit-in-manali",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-09-28T00:00:00Z",
    authorName: "Aarav Sharma",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    breadcrumbs.map((b) => ({ name: b.label, href: b.href }))
  );
  const faqJsonLd = buildFaqJsonLd(faqsData);

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="pb-20">
        <Section padding="lg">
          <Container size="narrow">
            <Breadcrumb items={breadcrumbs} className="mb-6" />

            {/* Header / Hero */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="category">Destination Guide</Badge>
                <Badge variant="duration">12 Min Read</Badge>
                <Link href="/destinations/india/himachal-pradesh/manali">
                  <Badge variant="tag" className="hover:border-amber-500 hover:text-amber-800 transition-colors cursor-pointer">
                    Manali, Himachal Pradesh
                  </Badge>
                </Link>
              </div>

              <Heading as="h1" size="2xl" className="tracking-tight text-stone-900 leading-tight">
                Best Places to Visit in Manali: A Practical Guide for Your Trip
              </Heading>

              <p className="mt-4 text-xl font-serif text-stone-600 leading-relaxed italic">
                From cedar forests and ancient temples to Solang Valley, Sissu and quiet mountain villages, here&apos;s how to explore Manali without trying to fit everything into one day.
              </p>

              {/* Byline */}
              <div className="mt-6 flex items-center justify-between border-y border-stone-200 py-3 text-xs text-stone-500 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-800">By Aarav Sharma</span>
                  <span>·</span>
                  <span>Routes &amp; Stories Editorial</span>
                </div>
                <div>Updated: September 2026</div>
              </div>
            </header>

            {/* Featured Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm mb-10">
              <Image
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
                alt="Panoramic view of Manali valley surrounded by deodar pine forests and snow-capped Himalayan peaks"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2.5 py-1 text-2xs text-white backdrop-blur-sm">
                Photo: Manali Valley Vista
              </div>
            </div>

            {/* Quick Answer Block (AEO / Answer Engine Optimization) */}
            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-300 text-stone-900 mb-10 shadow-xs">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0" aria-hidden="true">💡</span>
                <div>
                  <h2 className="font-sans font-bold text-sm uppercase tracking-wider text-amber-950 mb-1">
                    Quick Answer for Travelers
                  </h2>
                  <p className="text-base text-stone-800 font-serif leading-relaxed">
                    For a first trip to Manali, the main places to visit are <strong>Hidimba Devi Temple</strong>, <strong>Old Manali</strong>, <strong>Solang Valley</strong>, <strong>Vashisht</strong>, <strong>Jogini Falls</strong>, <strong>Manu Temple</strong> and <strong>Mall Road</strong>. If you have three days, add either <strong>Atal Tunnel and Sissu</strong> or <strong>Vashisht and Jogini Falls</strong> depending on your interests.
                  </p>
                </div>
              </div>
            </div>

            {/* Intro Prose */}
            <div className="space-y-5 text-stone-700 leading-relaxed text-lg font-serif mb-10">
              <p>
                Manali is easy to fall for, but planning a trip here can be slightly confusing. The town itself is only one part of the experience. Around it, you have cedar forests, old temples, small mountain villages, waterfalls, cafés, adventure spots and roads that climb into very different landscapes.
              </p>
              <p>
                If you are visiting Manali for the first time, you do not need to squeeze every attraction into your itinerary. A better approach is to group places that are close to each other and leave enough time to actually enjoy them.
              </p>
              <p>
                The <strong>best places to visit in Manali</strong> include Hidimba Devi Temple, Old Manali, Solang Valley, Vashisht, Jogini Falls, Manu Temple, Mall Road and the Atal Tunnel–Sissu route. Rohtang Pass is another well-known option, although access depends on the season and current road and permit conditions.
              </p>
            </div>

            {/* Collapsible / Sticky Table of Contents */}
            <nav aria-label="Table of contents" className="my-10 p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                On this page · Table of Contents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm font-sans">
                <a href="#at-a-glance" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Best places at a glance
                </a>
                <a href="#hidimba-devi-temple" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 1. Hidimba Devi Temple
                </a>
                <a href="#old-manali" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 2. Old Manali
                </a>
                <a href="#solang-valley" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 3. Solang Valley
                </a>
                <a href="#vashisht" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 4. Vashisht
                </a>
                <a href="#jogini-falls" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 5. Jogini Falls
                </a>
                <a href="#manu-temple" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 6. Manu Temple
                </a>
                <a href="#mall-road" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 7. Mall Road
                </a>
                <a href="#atal-tunnel-sissu" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 8. Atal Tunnel &amp; Sissu
                </a>
                <a href="#naggar" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 9. Naggar
                </a>
                <a href="#rohtang-pass" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • 10. Rohtang Pass
                </a>
                <a href="#what-is-manali-famous-for" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • What Is Manali Famous For?
                </a>
                <a href="#which-is-best-to-visit" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Which Is Best to Visit in Manali?
                </a>
                <a href="#how-to-plan-3-days" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • How to Plan 3 Days in Manali
                </a>
                <a href="#is-2-days-enough" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Is 2 Days Enough for Manali?
                </a>
                <a href="#family-travel" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Best Places for Families
                </a>
                <a href="#couples-travel" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Best Places for Couples
                </a>
                <a href="#best-time-to-visit" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Best Time to Visit Manali
                </a>
                <a href="#make-itinerary-better" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Tips to Make Itinerary Better
                </a>
                <a href="#faqs" className="text-stone-700 hover:text-amber-800 transition-colors">
                  • Frequently Asked Questions
                </a>
              </div>
            </nav>

            {/* At a Glance Table */}
            <section id="at-a-glance" className="my-12">
              <Heading as="h2" size="lg" className="mb-4">
                Best Places to Visit in Manali at a Glance
              </Heading>

              <div className="overflow-x-auto my-6 rounded-2xl border border-stone-200">
                <table className="min-w-full divide-y divide-stone-200 font-sans text-sm">
                  <thead className="bg-stone-50 text-stone-800 font-semibold">
                    <tr>
                      <th className="px-4 py-3 text-left">Place</th>
                      <th className="px-4 py-3 text-left">Best for</th>
                      <th className="px-4 py-3 text-left">Time to allow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        <Link href="/places/hidimba-temple" className="hover:text-amber-800 underline decoration-stone-300">
                          Hidimba Devi Temple
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-stone-700">Temple, architecture and cedar forest</td>
                      <td className="px-4 py-3 text-stone-600">45–60 minutes</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        <Link href="/places/old-manali" className="hover:text-amber-800 underline decoration-stone-300">
                          Old Manali
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-stone-700">Cafés, walking and local atmosphere</td>
                      <td className="px-4 py-3 text-stone-600">2–3 hours</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        <Link href="/places/solang-valley" className="hover:text-amber-800 underline decoration-stone-300">
                          Solang Valley
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-stone-700">Mountain views and adventure activities</td>
                      <td className="px-4 py-3 text-stone-600">Half to full day</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        <Link href="/places/vashisht" className="hover:text-amber-800 underline decoration-stone-300">
                          Vashisht
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-stone-700">Temple, village atmosphere and hot springs</td>
                      <td className="px-4 py-3 text-stone-600">1–2 hours</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">Jogini Falls</td>
                      <td className="px-4 py-3 text-stone-700">Short hike and nature</td>
                      <td className="px-4 py-3 text-stone-600">2–3 hours</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">Manu Temple</td>
                      <td className="px-4 py-3 text-stone-700">History and spirituality</td>
                      <td className="px-4 py-3 text-stone-600">30–60 minutes</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">Mall Road</td>
                      <td className="px-4 py-3 text-stone-700">Shopping, food and evening walks</td>
                      <td className="px-4 py-3 text-stone-600">1–2 hours</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">Atal Tunnel &amp; Sissu</td>
                      <td className="px-4 py-3 text-stone-700">Mountain road trip and changing landscapes</td>
                      <td className="px-4 py-3 text-stone-600">Full day</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">Naggar</td>
                      <td className="px-4 py-3 text-stone-700">Heritage, art and quieter surroundings</td>
                      <td className="px-4 py-3 text-stone-600">Half to full day</td>
                    </tr>
                    <tr className="hover:bg-stone-50/50">
                      <td className="px-4 py-3 font-semibold text-stone-900">Rohtang Pass</td>
                      <td className="px-4 py-3 text-stone-700">High-altitude scenery and snow</td>
                      <td className="px-4 py-3 text-stone-600">Full-day excursion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-stone-500 font-serif italic mt-2">
                The times above are planning estimates rather than fixed visiting times. Traffic, weather and how long you spend at each place can change the schedule considerably.
              </p>
            </section>

            {/* Attraction 1 */}
            <section id="hidimba-devi-temple" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 01</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Heritage • Forest • Photography</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                1. Hidimba Devi Temple
              </Heading>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80"
                  alt="Hidimba Devi Temple surrounded by tall deodar trees in Dhungiri forest, Manali"
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-2xs text-white backdrop-blur-sm">
                  Photo: Hidimba Temple Deodar Sanctuary
                </div>
              </div>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Hidimba Devi Temple is one of the first places I would include in a first-time Manali itinerary.
                </p>
                <p>
                  The temple sits among tall deodar trees, and its wooden architecture makes it quite different from the modern buildings around central Manali. The forest surrounding the temple is a big part of its appeal. You don&apos;t need hours here, but it is worth slowing down instead of treating it as a five-minute photo stop.
                </p>
                <p>
                  The temple is also close to several other attractions, making it easy to combine with <Link href="/places/old-manali" className="text-amber-800 underline decoration-amber-500/40">Old Manali</Link> and Manu Temple.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> History, architecture, photography and a quiet forest walk.</p>
                <p><strong className="text-stone-900">Allow:</strong> Around 45–60 minutes.</p>
                <p><strong className="text-stone-900">Combine it with:</strong> Manu Temple and Old Manali.</p>
                <div className="pt-2">
                  <Link href="/places/hidimba-temple" className="text-xs font-semibold text-amber-800 hover:underline">
                    &rarr; Read our dedicated Hidimba Temple visiting guide
                  </Link>
                </div>
              </div>
            </section>

            {/* Attraction 2 */}
            <section id="old-manali" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 02</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Cafés • River Walks • Bohemian Vibe</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                2. Old Manali
              </Heading>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="Old Manali village street and cafés overlooking the snow-covered peaks"
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-2xs text-white backdrop-blur-sm">
                  Photo: Old Manali Village Atmosphere
                </div>
              </div>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Old Manali is where you go when you want to experience a slower side of the destination.
                </p>
                <p>
                  You reach the area by crossing the Manalsu Bridge, after which the surroundings become noticeably different from the busier central part of town. There are cafés, guesthouses, small shops and narrow roads surrounded by trees and mountain views.
                </p>
                <p>
                  There is no particular need to rush through Old Manali. Walk around, stop for food or coffee and explore the side lanes. For many visitors, this ends up being more enjoyable than moving from one sightseeing point to another all day.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Cafés, walking, photography and a relaxed atmosphere.</p>
                <p><strong className="text-stone-900">Allow:</strong> 2–3 hours, or longer if you want to spend time at cafés.</p>
                <div className="pt-2">
                  <Link href="/places/old-manali" className="text-xs font-semibold text-amber-800 hover:underline">
                    &rarr; Explore Old Manali village guide &amp; stays
                  </Link>
                </div>
              </div>
            </section>

            {/* Attraction 3 */}
            <section id="solang-valley" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 03</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Adventure • High Meadows • Winter Snow</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                3. Solang Valley
              </Heading>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                  alt="Solang Valley alpine meadow in winter surrounded by high Himalayan ridges"
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-2xs text-white backdrop-blur-sm">
                  Photo: Solang Valley Alpine Meadow
                </div>
              </div>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Solang Valley is one of the most popular places around Manali, and for good reason. The valley opens up into a much wider mountain landscape than you see around the town.
                </p>
                <p>
                  Depending on the season and current conditions, activities can include paragliding, ropeway rides, skiing, snow activities, zorbing and other adventure experiences. But you don&apos;t have to pay for an activity to enjoy Solang. The mountain scenery alone makes the trip worthwhile.
                </p>
                <p>
                  Winter and summer also give you very different experiences. Snow conditions determine which activities are available, so check what is operating before making a specific activity part of your plan.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-amber-50/70 border border-amber-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Mountain views, adventure and snow.</p>
                <p><strong className="text-stone-900">Allow:</strong> At least half a day.</p>
                <p><strong className="text-stone-900">💡 Tip:</strong> Don&apos;t try to combine Solang with a long list of unrelated attractions on the same day. Traffic and activity queues can take more time than expected.</p>
                <div className="pt-2">
                  <Link href="/places/solang-valley" className="text-xs font-semibold text-amber-800 hover:underline">
                    &rarr; Complete Solang Valley visiting essentials &amp; timings
                  </Link>
                </div>
              </div>
            </section>

            {/* Attraction 4 */}
            <section id="vashisht" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 04</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Thermal Baths • Sacred Temples • Relaxation</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                4. Vashisht
              </Heading>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Vashisht is a small village close to Manali known for its temples and hot-water springs.
                </p>
                <p>
                  It is a good place to visit when you want something different from the busy tourist areas. The temple and surrounding village lanes can be explored without needing to spend an entire day here.
                </p>
                <p>
                  Vashisht is also the natural starting point for people heading towards Jogini Falls.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Local culture, temples, village atmosphere and relaxation.</p>
                <p><strong className="text-stone-900">Allow:</strong> 1–2 hours.</p>
                <p><strong className="text-stone-900">Combine it with:</strong> Jogini Falls.</p>
                <div className="pt-2">
                  <Link href="/places/vashisht" className="text-xs font-semibold text-amber-800 hover:underline">
                    &rarr; View Vashisht thermal springs &amp; village details
                  </Link>
                </div>
              </div>
            </section>

            {/* Attraction 5 */}
            <section id="jogini-falls" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 05</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Hiking • Forest Trail • Cascades</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                5. Jogini Falls
              </Heading>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Jogini Falls is one of the better choices if you want to include a little walking in your Manali trip.
                </p>
                <p>
                  The route takes you away from the roads and into a greener landscape, with the trail passing through the area around Vashisht. The walk itself is part of the experience rather than simply a way of reaching a waterfall.
                </p>
                <p>
                  Don&apos;t treat the hike as a completely effortless sightseeing stop. Conditions can become slippery after rain, and the amount of time required depends on where you start, your pace and how long you spend around the falls. Wear shoes with a decent grip and carry water.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Nature, walking and photography.</p>
                <p><strong className="text-stone-900">Allow:</strong> Roughly 2–3 hours for the outing.</p>
                <p><strong className="text-stone-900">Best combination:</strong> Vashisht + Jogini Falls.</p>
              </div>
            </section>

            {/* Attraction 6 */}
            <section id="manu-temple" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 06</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Sacred Lore • Pagoda Shrines • High Views</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                6. Manu Temple
              </Heading>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Manu Temple is located in Old Manali and is associated with Sage Manu.
                </p>
                <p>
                  The temple is worth including if you are interested in the cultural and religious side of the region. More importantly from a planning perspective, it is easy to combine with Old Manali and Hidimba Devi Temple.
                </p>
                <p>
                  That makes it particularly useful for a short trip when you don&apos;t want to waste time travelling from one side of the valley to another.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Heritage and spirituality.</p>
                <p><strong className="text-stone-900">Allow:</strong> 30–60 minutes.</p>
              </div>
            </section>

            {/* Attraction 7 */}
            <section id="mall-road" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 07</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Handicrafts • Street Food • Evening Walks</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                7. Mall Road
              </Heading>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Mall Road is the commercial heart of Manali.
                </p>
                <p>
                  This is where you will find shops, restaurants, cafés and plenty of opportunities to pick up souvenirs. Woollens, Himachali caps, shawls and handicrafts are among the things visitors commonly look for.
                </p>
                <p>
                  It is more enjoyable in the evening when you have finished the day&apos;s sightseeing and simply want to walk around, eat something and shop. You don&apos;t need to reserve half a day for Mall Road unless shopping is a major part of your trip.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Shopping, food and evening walks.</p>
                <p><strong className="text-stone-900">Allow:</strong> 1–2 hours.</p>
              </div>
            </section>

            {/* Attraction 8 */}
            <section id="atal-tunnel-sissu" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 08</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Lahaul Gateway • Rugged Terrain • Waterfall</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                8. Atal Tunnel and Sissu
              </Heading>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                  alt="Rugged mountain landscape near Sissu in Lahaul valley beyond the Atal Tunnel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-2xs text-white backdrop-blur-sm">
                  Photo: High Lahaul Terrain Beyond Atal Tunnel
                </div>
              </div>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  The road beyond Manali changes dramatically as you head towards the Atal Tunnel and into Lahaul.
                </p>
                <p>
                  The tunnel itself is an important piece of road infrastructure, but the bigger reason travellers take this route is what lies beyond it. The landscape becomes more open and rugged, with a distinctly different character from the forested Manali valley.
                </p>
                <p>
                  Sissu is one of the popular stops on this side of the mountains. Depending on conditions and your itinerary, the excursion can include viewpoints, waterfalls and time around the village and surrounding valley.
                </p>
                <p>
                  This should be treated as a <strong>full-day road trip</strong>, not as a quick stop that you squeeze between local sightseeing. Road and weather conditions can change quickly in the mountains, so check the current situation before leaving.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Scenic drives, mountain landscapes and exploring beyond Manali.</p>
                <p><strong className="text-stone-900">Allow:</strong> Most of the day.</p>
                <div className="pt-2">
                  <Link href="/disclaimer" className="text-xs text-amber-800 hover:underline">
                    &rarr; Check mountain road safety and transit advisories
                  </Link>
                </div>
              </div>
            </section>

            {/* Attraction 9 */}
            <section id="naggar" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 09</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">Ancient Castle • Roerich Art • Quiet Valleys</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                9. Naggar
              </Heading>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Naggar is worth considering if you have more time and don&apos;t want every day of your trip to revolve around central Manali.
                </p>
                <p>
                  The area has a strong heritage character and offers a quieter experience, with mountain views, traditional architecture and cultural attractions like the historic Naggar Castle and the Nicholas Roerich Art Gallery.
                </p>
                <p>
                  It is particularly useful as an alternative to another busy tourist day.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> Heritage, art, photography and a quieter outing.</p>
                <p><strong className="text-stone-900">Allow:</strong> Half to full day.</p>
              </div>
            </section>

            {/* Attraction 10 */}
            <section id="rohtang-pass" className="my-14 pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-700">Attraction 10</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-sans">13,058 ft Altitude • Glacial Scenery • Permits</span>
              </div>
              <Heading as="h2" size="xl" className="mb-4">
                10. Rohtang Pass
              </Heading>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Rohtang Pass is probably the name most people associate with a Manali snow trip.
                </p>
                <p>
                  The high-altitude pass (13,058 ft) offers dramatic mountain scenery and, when conditions allow, snow. However, it should not be treated as a guaranteed attraction on every Manali itinerary.
                </p>
                <p>
                  Access can be affected by snowfall, road conditions, seasonal restrictions and National Green Tribunal permit requirements. Check the current official information before planning your day around Rohtang.
                </p>
                <p>
                  If access is restricted, don&apos;t assume that your entire trip has been ruined. Solang Valley and the Atal Tunnel–Sissu side offer very different mountain experiences.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-1.5">
                <p><strong className="text-stone-900">Best for:</strong> High-altitude scenery and snow when accessible.</p>
                <p><strong className="text-stone-900">Allow:</strong> A full day.</p>
              </div>
            </section>

            {/* What is Manali Famous For */}
            <section id="what-is-manali-famous-for" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                What Is Manali Famous For?
              </Heading>
              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Manali is famous for much more than snowfall.
                </p>
                <p>
                  The destination is known for its Himalayan scenery, deodar forests, Beas River valley, temples, Old Manali cafés, adventure activities and access to higher mountain areas.
                </p>
                <p>Some of the things most closely associated with Manali are:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-base font-sans text-stone-700">
                  <li><strong>Solang Valley</strong> for meadows, snow sports and paragliding</li>
                  <li><strong>Hidimba Devi Temple</strong> for 16th-century wooden architecture in Dhungiri forest</li>
                  <li><strong>Old Manali</strong> for bohemian cafés, orchard trails and live acoustic music</li>
                  <li><strong>Rohtang Pass</strong> and Atal Tunnel for high-altitude passes into Lahaul</li>
                  <li><strong>Vashisht</strong> natural geothermal sulphur springs</li>
                  <li><strong>Himachali handicrafts</strong>, Kullu shawls, and handmade woollens</li>
                </ul>
                <p>
                  So if someone asks, <em>&ldquo;Which thing is famous in Manali?&rdquo;</em>, there isn&apos;t one single answer. Snow and mountain scenery are probably the most recognizable, but the destination&apos;s appeal comes from the combination of landscapes, culture and nearby excursions.
                </p>
              </div>
            </section>

            {/* Which is Best to Visit */}
            <section id="which-is-best-to-visit" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                Which Is Best to Visit in Manali?
              </Heading>
              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  That depends on what you want from your trip.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base font-sans text-stone-700">
                  <li>If you are visiting for the first time, <strong>Hidimba Devi Temple, Old Manali and Solang Valley</strong> give you a good introduction to three different sides of the destination.</li>
                  <li>If you prefer nature, add <strong>Jogini Falls</strong>.</li>
                  <li>If you want a cultural experience, spend time around <strong>Hidimba Temple, Manu Temple and Vashisht</strong>.</li>
                  <li>If you enjoy road trips, consider <strong>Atal Tunnel and Sissu</strong>.</li>
                  <li>If shopping and food are more important to you, <strong>Mall Road and Old Manali</strong> will probably take up more of your time.</li>
                </ul>
                <p>
                  Rather than asking which attraction is objectively &ldquo;best,&rdquo; choose according to the kind of trip you want.
                </p>
              </div>
            </section>

            {/* Quick Route Planning Decision Box */}
            <div className="my-12 p-8 rounded-2xl bg-amber-50/70 border border-amber-300">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 block mb-1">
                Routing Architecture
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                Choose Your Route by Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-sm">
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <h4 className="font-bold text-amber-950 mb-2">If you have 1 Day</h4>
                  <p className="text-xs text-stone-500 mb-3">Compact local loop</p>
                  <p className="text-stone-800 font-medium leading-relaxed">
                    Hidimba Temple &rarr; Manu Temple &rarr; Old Manali &rarr; Mall Road
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <h4 className="font-bold text-amber-950 mb-2">If you have 2 Days</h4>
                  <p className="text-xs text-stone-500 mb-3">Town + 1 major valley</p>
                  <p className="text-stone-800 font-medium leading-relaxed">
                    <strong>Day 1:</strong> Local Manali<br />
                    <strong>Day 2:</strong> Solang Valley
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <h4 className="font-bold text-amber-950 mb-2">If you have 3 Days</h4>
                  <p className="text-xs text-stone-500 mb-3">Balanced discovery</p>
                  <p className="text-stone-800 font-medium leading-relaxed">
                    <strong>Day 1:</strong> Local Manali<br />
                    <strong>Day 2:</strong> Solang Valley<br />
                    <strong>Day 3:</strong> Vashisht + Jogini OR Atal Tunnel + Sissu
                  </p>
                </div>
              </div>
            </div>

            {/* How to Plan 3 Days */}
            <section id="how-to-plan-3-days" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                How to Plan 3 Days in Manali
              </Heading>

              {/* Direct AEO sentence */}
              <div className="p-4 rounded-xl bg-stone-50 border-l-4 border-amber-600 mb-6 text-stone-800 font-serif italic text-base">
                Spend the first day exploring Manali&apos;s local attractions, the second day at Solang Valley, and the third day on either the Atal Tunnel–Sissu route or the Vashisht–Jogini Falls route.
              </div>

              <div className="space-y-6 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Three days is a good amount of time for a first trip because you can cover the main attractions without turning the entire holiday into a checklist.
                </p>

                <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 not-prose font-sans space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Day 1: Explore Manali</h3>
                    <p className="text-sm text-stone-600 mt-1">
                      Start with <strong>Hidimba Devi Temple</strong> in the morning. From there, continue towards <strong>Manu Temple and Old Manali</strong>. Spend some time walking around Old Manali rather than immediately moving to another attraction. In the evening, head towards <strong>Mall Road</strong> for shopping, food and a walk.
                    </p>
                    <p className="mt-2 text-xs font-mono text-amber-800 bg-amber-50 p-2 rounded-lg inline-block">
                      Route: Hidimba Temple &rarr; Manu Temple &rarr; Old Manali &rarr; Mall Road
                    </p>
                  </div>

                  <hr className="border-stone-200" />

                  <div>
                    <h3 className="text-base font-bold text-stone-900">Day 2: Spend the Day at Solang Valley</h3>
                    <p className="text-sm text-stone-600 mt-1">
                      Leave for <strong>Solang Valley</strong> in the morning. Spend the day depending on your interests and the activities available during your visit. If there is snow, the experience will obviously be different from a summer visit. Don&apos;t fill the afternoon with several additional attractions just because they appear nearby on Google Maps; mountain traffic and activity queues can easily eat into your schedule. Return to Manali in the evening.
                    </p>
                  </div>

                  <hr className="border-stone-200" />

                  <div>
                    <h3 className="text-base font-bold text-stone-900">Day 3: Choose Between Two Experiences</h3>
                    <div className="mt-2 space-y-2 text-sm text-stone-600">
                      <p>
                        <strong>Option 1 (Atal Tunnel and Sissu):</strong> Choose this if you want a longer scenic drive and want to see how dramatically the landscape changes beyond the tunnel into Lahaul.
                      </p>
                      <p>
                        <strong>Option 2 (Vashisht and Jogini Falls):</strong> Choose this if you want a shorter day involving a village, temple, walking trail and waterfall. For many travellers, Option 2 is easier to manage if they have an evening departure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/itineraries/4-days-manali-adventure" className="text-sm font-semibold text-amber-800 hover:underline font-sans">
                    &rarr; Looking for a longer plan? See our full 4-Day Curated Manali Adventure
                  </Link>
                </div>
              </div>
            </section>

            {/* Is 2 Days Enough */}
            <section id="is-2-days-enough" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                Is 2 Days Enough for Manali?
              </Heading>

              {/* Direct AEO sentence */}
              <div className="p-4 rounded-xl bg-stone-50 border-l-4 border-amber-600 mb-6 text-stone-800 font-serif italic text-base">
                Yes, two days are enough for the main Manali highlights, but you will need to choose your priorities rather than trying to cover every valley.
              </div>

              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Trying to cover Solang Valley, Rohtang, Sissu, Vashisht, Jogini Falls, Old Manali and every temple in two days will leave you spending more time in traffic than actually enjoying the destination.
                </p>
                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-sm space-y-2">
                  <p><strong>Day 1:</strong> Hidimba Devi Temple &rarr; Manu Temple &rarr; Old Manali &rarr; Mall Road</p>
                  <p><strong>Day 2:</strong> Solang Valley (or replace with Vashisht and Jogini Falls if you prefer nature walks over adventure activities)</p>
                </div>
                <p className="font-sans text-sm text-stone-600">
                  Two days gives you the highlights. Three days gives you breathing room. Four or more days allows you to explore beyond the standard tourist circuit.
                </p>
              </div>
            </section>

            {/* Family & Couples */}
            <section id="family-travel" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                Best Places to Visit in Manali With Family
              </Heading>
              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  For a family trip, you don&apos;t necessarily need the most adventurous itinerary. Good options include:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-base font-sans text-stone-700">
                  <li><strong>Hidimba Devi Temple</strong> (gentle walks through forested paths)</li>
                  <li><strong>Solang Valley</strong> (ropeway rides, open meadows)</li>
                  <li><strong>Old Manali</strong> (family cafés and bakeries)</li>
                  <li><strong>Mall Road</strong> (pedestrian promenade, souvenirs)</li>
                  <li><strong>Vashisht</strong> (historic architecture)</li>
                  <li><strong>Atal Tunnel and Sissu</strong> (if road and weather conditions are suitable)</li>
                </ul>
                <p>
                  The right combination will depend on the ages of the people travelling and how comfortable everyone is with long mountain drives and walking trails.
                </p>
              </div>
            </section>

            <section id="couples-travel" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                Best Places to Visit in Manali for Couples
              </Heading>
              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Couples often get more out of Manali by leaving some free time rather than planning every hour.
                </p>
                <p>
                  Old Manali is good for cafés and relaxed walks, while Hidimba Temple offers a quieter forest setting. Solang Valley works well for mountain scenery and activities, and Jogini Falls adds a short outdoor adventure. If you have an extra day, Naggar can be a pleasant alternative to another crowded sightseeing route.
                </p>
              </div>
            </section>

            {/* Best Time to Visit */}
            <section id="best-time-to-visit" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                Best Time to Visit Manali
              </Heading>
              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  There isn&apos;t one perfect month for everyone.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose font-sans text-sm mt-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">March to June</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      A popular period for sightseeing, road trips and outdoor activities. The valley becomes greener as winter recedes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">July to August</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Monsoon can make mountain travel less predictable. Heavy rain can affect roads, so check conditions before heading out.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">September to November</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      A good period for travellers who prefer cooler weather and clear mountain scenery without making snowfall the main objective.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">December to February</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Winter is the obvious choice if snow is the main reason for your trip. Snowfall is weather-dependent and road access to higher passes changes quickly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Make Itinerary Better */}
            <section id="make-itinerary-better" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                How to Make Your Manali Itinerary Better
              </Heading>
              <div className="space-y-6 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  The easiest way to improve a Manali trip is to stop treating the destination as a checklist.
                </p>

                <div className="space-y-4 font-sans text-sm">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">Group nearby places</h3>
                    <p className="text-stone-600">
                      Pair <strong>Hidimba Temple + Manu Temple + Old Manali</strong> together, and <strong>Vashisht + Jogini Falls</strong> together. This saves unnecessary back-and-forth travel through town.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">Keep high-altitude excursions flexible</h3>
                    <p className="text-stone-600">
                      Weather can change quickly in the mountains. Don&apos;t make a tightly timed high-altitude excursion the only critical day of your entire holiday.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">Leave room for traffic</h3>
                    <p className="text-stone-600">
                      A route that looks short on a map can take much longer during peak summer and winter holiday periods.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">Check conditions before leaving</h3>
                    <p className="text-stone-600">
                      For Rohtang, Atal Tunnel, Sissu and other mountain routes, check current road, weather and permit information from official authorities before setting out.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-stone-900 mb-1">Don&apos;t chase every attraction</h3>
                    <p className="text-stone-600">
                      Manali is not a destination where seeing 15 places is automatically better than seeing six properly. Sometimes the best part of the day is sitting in Old Manali with a view of the mountains instead of rushing to the next pin on your map.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-6">
                Frequently Asked Questions
              </Heading>

              <div className="space-y-4">
                {faqsData.map((faq) => (
                  <div key={faq.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60">
                    <h3 className="font-semibold text-stone-900 text-base">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final Thoughts */}
            <section id="final-thoughts" className="my-14 pt-8 border-t border-stone-200">
              <Heading as="h2" size="xl" className="mb-4">
                Final Thoughts
              </Heading>
              <div className="space-y-4 text-stone-700 font-serif text-lg leading-relaxed">
                <p>
                  Manali works best when you give yourself enough time to experience the place rather than simply collect photographs from every tourist attraction.
                </p>
                <p>
                  For a short trip, start with Hidimba Temple, Old Manali and Mall Road, then dedicate a separate day to Solang Valley. If you have a third day, decide whether you would rather explore the Vashisht–Jogini side or take the longer road towards Atal Tunnel and Sissu.
                </p>
                <p>
                  And if you have more time, use it. Manali becomes more interesting when you move beyond the standard sightseeing circuit and explore the smaller villages, quieter roads and changing landscapes around the valley.
                </p>
              </div>
            </section>

            {/* Author Box */}
            <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-amber-500 text-stone-950 font-serif font-black text-2xl flex items-center justify-center flex-shrink-0">
                AS
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-stone-400 block mb-1">
                  About the Author
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Aarav Sharma
                </h3>
                <p className="text-stone-600 text-sm mt-1 leading-relaxed">
                  Aarav Sharma creates travel guides focused on practical itineraries, mountain transit logistics, and cultural reconnaissance for independent travelers across the western Himalayas.
                </p>
              </div>
            </div>

            {/* Editorial Hub Callout */}
            <div className="mt-10 p-8 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Explore More of Manali
                </h3>
                <p className="text-stone-600 text-sm mt-1">
                  Browse our complete Manali hub with landmark archives and curated road trips.
                </p>
              </div>
              <Link href="/destinations/india/himachal-pradesh/manali">
                <Button variant="primary" size="sm">
                  View Manali Hub &rarr;
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </article>
    </>
  );
}
