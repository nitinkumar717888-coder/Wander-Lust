import { PrismaClient, ArticleType, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create System / Author User
  const adminUser = await prisma.user.upsert({
    where: { email: "editorial@wanderlust.travel" },
    update: {},
    create: {
      email: "editorial@wanderlust.travel",
      name: "Aarav Sharma",
      role: UserRole.EDITOR,
    },
  });

  // 2. Author Profile
  const author = await prisma.author.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      displayName: "Aarav Sharma",
      slug: "aarav-sharma",
      bio: "Senior travel journalist and Himalayan explorer with 10+ years covering northern India.",
      twitter: "@aaravstravels",
    },
  });

  // 3. Featured Image placeholders
  const manaliImg = await prisma.image.create({
    data: {
      url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      altText: "Snow-covered peaks and pine forests in Manali, Himachal Pradesh",
      caption: "Panoramic vista over the Solang Valley near Manali",
      credit: "Unsplash / Travel Photography",
      width: 1200,
      height: 800,
      mimeType: "image/jpeg",
    },
  });

  const solangImg = await prisma.image.create({
    data: {
      url: "https://images.unsplash.com/photo-1593181824360-f5ecb39823ce?auto=format&fit=crop&w=1200&q=80",
      altText: "Adventure sports and snowfields in Solang Valley",
      caption: "Solang Valley alpine meadow in winter",
      credit: "Unsplash",
      width: 1200,
      height: 800,
      mimeType: "image/jpeg",
    },
  });

  // 4. Country: India
  const india = await prisma.country.upsert({
    where: { slug: "india" },
    update: {},
    create: {
      name: "India",
      slug: "india",
      code: "IN",
      continent: "Asia",
      description: "A subcontinent of breathtaking biodiversity, ancient heritage, and Himalayan peaks.",
      metaTitle: "Travel Guide to India | Wanderlust",
      metaDescription: "Comprehensive travel inspiration, destinations, and curated guides for exploring India.",
      isPublished: true,
      featuredImageId: manaliImg.id,
    },
  });

  // 5. Region: Himachal Pradesh
  const himachal = await prisma.region.upsert({
    where: { slug: "himachal-pradesh" },
    update: {},
    create: {
      name: "Himachal Pradesh",
      slug: "himachal-pradesh",
      countryId: india.id,
      description: "The land of gods and high mountain passes in the western Himalayas.",
      metaTitle: "Himachal Pradesh Travel Guide | Wanderlust",
      metaDescription: "Explore the scenic hill stations, valleys, and trails of Himachal Pradesh.",
      isPublished: true,
      featuredImageId: manaliImg.id,
    },
  });

  // 6. Destination: Manali
  const manali = await prisma.destination.upsert({
    where: { slug: "manali" },
    update: {},
    create: {
      name: "Manali",
      slug: "manali",
      regionId: himachal.id,
      tagline: "The Crown Jewel of the Kullu Valley",
      description: "Nestled at 2,050 meters on the banks of the Beas River, Manali is a gateway to high-altitude Himalayan adventures, ancient cedar groves, and bohemian culture.",
      bestTimeToVisit: "October to June (Snow: Dec-Feb, Pleasant: Mar-Jun)",
      climate: "Subtropical highland with alpine winters",
      metaTitle: "Manali Travel Guide — Things to Do, Itineraries & Places | Wanderlust",
      metaDescription: "Discover Manali: Solang Valley, Hidimba Temple, Old Manali cafés, and high Himalayan trails.",
      latitude: 32.2432,
      longitude: 77.1892,
      isPublished: true,
      featuredImageId: manaliImg.id,
    },
  });

  // 7. Categories
  const catNature = await prisma.category.upsert({
    where: { slug: "nature-adventure" },
    update: {},
    create: {
      name: "Nature & Adventure",
      slug: "nature-adventure",
      icon: "mountain",
      description: "Hikes, valleys, viewpoints, and outdoor thrill spots.",
    },
  });

  const catCulture = await prisma.category.upsert({
    where: { slug: "culture-heritage" },
    update: {},
    create: {
      name: "Culture & Heritage",
      slug: "culture-heritage",
      icon: "landmark",
      description: "Historic temples, sacred shrines, and heritage villages.",
    },
  });

  // 8. Places in Manali
  const placesData = [
    {
      name: "Solang Valley",
      slug: "solang-valley",
      shortDescription: "A high-altitude meadow renowned for paragliding in summer and skiing in winter.",
      description: "Solang Valley, located 14 km northwest of Manali, offers sweeping views of snow-capped Himalayan glaciers and peaks. A prime adventure hub offering zorbing, quad biking, and skiing.",
      visitDuration: "3-4 hours",
      entryFee: "Free entry (Activities priced individually)",
      categoryId: catNature.id,
      featuredImageId: solangImg.id,
    },
    {
      name: "Hidimba Devi Temple",
      slug: "hidimba-temple",
      shortDescription: "A 16th-century pagoda-style cedar temple dedicated to Hidimba Devi.",
      description: "Built in 1553 CE by Maharaja Bahadur Singh, this four-tiered wooden pagoda temple stands inside a tranquil deodar cedar sanctuary called Dhungiri Van Vihar.",
      visitDuration: "1-2 hours",
      entryFee: "Free",
      categoryId: catCulture.id,
      featuredImageId: manaliImg.id,
    },
    {
      name: "Old Manali",
      slug: "old-manali",
      shortDescription: "A bohemian hillside village with apple orchards, wooden houses, and artisan cafés.",
      description: "Separated from New Manali by the Manalsu River, Old Manali retains an authentic Himachali village vibe with rustic stone houses, live acoustic music, and world bakeries.",
      visitDuration: "Half day",
      entryFee: "Free",
      categoryId: catCulture.id,
      featuredImageId: manaliImg.id,
    },
    {
      name: "Vashisht Hot Springs & Village",
      slug: "vashisht",
      shortDescription: "Historic sulphur thermal baths and intricate stone temples overlooking the Beas river.",
      description: "Located across the Beas River, Vashisht is famed for its natural geothermal springs believed to have medicinal properties, as well as the 4,000-year-old temple of Sage Vashisht.",
      visitDuration: "2 hours",
      entryFee: "Free",
      categoryId: catNature.id,
      featuredImageId: manaliImg.id,
    },
  ];

  for (const p of placesData) {
    await prisma.place.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        destinationId: manali.id,
        isPublished: true,
      },
    });
  }

  // 9. Articles & Guides
  const guideTag = await prisma.tag.upsert({
    where: { slug: "himalayas" },
    update: {},
    create: { name: "Himalayas", slug: "himalayas" },
  });

  const article = await prisma.article.upsert({
    where: { slug: "manali-first-timers-guide" },
    update: {},
    create: {
      title: "The Definitive First-Timer's Guide to Manali & Kullu Valley",
      slug: "manali-first-timers-guide",
      excerpt: "Everything you need to know before visiting Manali: best seasons, top scenic viewpoints, local Himachali cuisine, and essential packing tips.",
      content: `## Welcome to the Valley of the Gods\n\nManali has long captured the imagination of travelers seeking alpine air, mountain vistas, and riverside tranquility.\n\n### Top Experiences\n1. Morning walks through cedar forests in Dhungiri.\n2. River crossing and cafe hopping in Old Manali.\n3. Ascending to Rohtang Pass or Atal Tunnel for snow views.\n\n### Practical Advice\nAcclimatize gently on day one, hire certified guides for high mountain trails, and savor traditional Siddu with ghee.`,
      type: ArticleType.GUIDE,
      readingTimeMin: 7,
      authorId: author.id,
      destinationId: manali.id,
      categoryId: catNature.id,
      featuredImageId: manaliImg.id,
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: "The Definitive Manali Travel Guide | Wanderlust",
      metaDescription: "Expert first-timer guide to Manali: top spots, seasons, and local insider advice.",
    },
  });

  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: {
        articleId: article.id,
        tagId: guideTag.id,
      },
    },
    update: {},
    create: {
      articleId: article.id,
      tagId: guideTag.id,
    },
  });

  // 10. Sample Itinerary
  await prisma.itinerary.upsert({
    where: { slug: "4-days-manali-adventure" },
    update: {},
    create: {
      title: "4 Days in Manali: From Alpine Meadows to Cedar Temples",
      slug: "4-days-manali-adventure",
      summary: "A curated 4-day itinerary balancing alpine excitement in Solang Valley with culture in Old Manali.",
      durationDays: 4,
      difficulty: "Moderate",
      budgetRange: "Mid-Range",
      destinationId: manali.id,
      featuredImageId: manaliImg.id,
      isPublished: true,
      publishedAt: new Date(),
      days: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival & Old Manali Exploration",
            description: "Check into your mountain stay, walk through apple orchards, and visit the historic Hidimba Devi Temple.",
            highlights: ["Hidimba Temple", "Old Manali Cafés", "Manalsu River bank"],
          },
          {
            dayNumber: 2,
            title: "Alpine Adventure in Solang Valley",
            description: "Head north to Solang Valley for paragliding or winter skiing with dramatic mountain peaks all around.",
            highlights: ["Solang Valley sports", "Anjani Mahadev trek", "Local tea stalls"],
          },
          {
            dayNumber: 3,
            title: "Vashisht Springs & Jogini Waterfall Hike",
            description: "Begin with geothermal baths at Vashisht village, followed by a scenic 2-hour forest trek to Jogini Waterfall.",
            highlights: ["Vashisht Hot Springs", "Jogini Waterfall", "Pine forest trail"],
          },
          {
            dayNumber: 4,
            title: "Naggar Castle & Culinary Farewell",
            description: "Take a scenic drive to the 500-year-old Naggar Castle and conclude with traditional Himachali Dham dinner.",
            highlights: ["Naggar Castle", "Nicholas Roerich Art Gallery", "Himachali Dham"],
          },
        ],
      },
    },
  });

  // 11. FAQ for Manali
  await prisma.fAQ.createMany({
    data: [
      {
        question: "When is the best time to see snow in Manali?",
        answer: "Mid-December through February offers the highest probability of heavy snowfall in Manali town and Solang Valley.",
        destinationId: manali.id,
        sortOrder: 1,
      },
      {
        question: "How do I reach Manali?",
        answer: "The nearest airport is Bhuntar (KUU), 50 km away. Alternatively, Volvo overnight buses connect from New Delhi and Chandigarh.",
        destinationId: manali.id,
        sortOrder: 2,
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
