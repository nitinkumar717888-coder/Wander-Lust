import {
  type DestinationSummary,
  type PlaceSummary,
  type ArticleSummary,
  type ItinerarySummary,
} from "@/types";

/**
 * Homepage Data Layer
 *
 * Separates data access and domain entities from presentation.
 * Returns fully typed models that mirror the Prisma schema.
 * When a live database is connected, these methods can seamlessly query Prisma
 * without modifying any UI presentation components.
 */

export interface TravelInterest {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  tag: string;
}

export async function getFeaturedDestinations(): Promise<DestinationSummary[]> {
  return [
    {
      id: "dest-manali",
      name: "Manali",
      slug: "manali",
      tagline: "The Crown Jewel of Kullu Valley",
      description: "Himalayan pine forests, alpine river trails, and high mountain passes.",
      region: {
        id: "reg-hp",
        name: "Himachal Pradesh",
        slug: "himachal-pradesh",
        country: {
          id: "country-in",
          name: "India",
          slug: "india",
          code: "IN",
          continent: "Asia",
        },
      },
      featuredImage: {
        id: "img-manali",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        altText: "Snow-covered peaks and cedar pines in Manali",
      },
    },
    {
      id: "dest-spiti",
      name: "Spiti Valley",
      slug: "spiti-valley",
      tagline: "The Middle Land between India and Tibet",
      description: "High-altitude cold desert, ancient cliffside monasteries, and starlit skies.",
      region: {
        id: "reg-hp",
        name: "Himachal Pradesh",
        slug: "himachal-pradesh",
        country: {
          id: "country-in",
          name: "India",
          slug: "india",
          code: "IN",
          continent: "Asia",
        },
      },
      featuredImage: {
        id: "img-spiti",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        altText: "Dramatic high-altitude desert mountains in Spiti Valley",
      },
    },
    {
      id: "dest-ladakh",
      name: "Leh Ladakh",
      slug: "leh-ladakh",
      tagline: "Land of High Passes & Azure Lakes",
      description: "Pangong Tso salt lake, dramatic mountain passes, and Himalayan gompas.",
      region: {
        id: "reg-ladakh",
        name: "Ladakh",
        slug: "ladakh",
        country: {
          id: "country-in",
          name: "India",
          slug: "india",
          code: "IN",
          continent: "Asia",
        },
      },
      featuredImage: {
        id: "img-ladakh",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        altText: "Majestic alpine pass with Tibetan prayer flags in Ladakh",
      },
    },
  ];
}

export async function getPopularPlaces(): Promise<PlaceSummary[]> {
  const baseDestination: DestinationSummary = {
    id: "dest-manali",
    name: "Manali",
    slug: "manali",
    region: {
      id: "reg-hp",
      name: "Himachal Pradesh",
      slug: "himachal-pradesh",
      country: {
        id: "country-in",
        name: "India",
        slug: "india",
        code: "IN",
      },
    },
  };

  return [
    {
      id: "place-solang",
      name: "Solang Valley",
      slug: "solang-valley",
      shortDescription:
        "High-altitude meadow renowned for summer paragliding and winter skiing.",
      category: {
        id: "cat-adventure",
        name: "Adventure & Outdoors",
        slug: "adventure",
      },
      destination: baseDestination,
      featuredImage: {
        id: "img-solang",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "Paragliding over alpine meadows in Solang Valley",
      },
    },
    {
      id: "place-hidimba",
      name: "Hidimba Devi Temple",
      slug: "hidimba-temple",
      shortDescription:
        "16th-century four-tiered pagoda sanctuary inside a peaceful deodar cedar grove.",
      category: {
        id: "cat-heritage",
        name: "Heritage & Shrines",
        slug: "heritage",
      },
      destination: baseDestination,
      featuredImage: {
        id: "img-hidimba",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Four-tiered wooden pagoda temple surrounded by tall pines",
      },
    },
    {
      id: "place-old-manali",
      name: "Old Manali",
      slug: "old-manali",
      shortDescription:
        "Bohemian hillside settlement with apple orchards, artisan bakeries, and wood homes.",
      category: {
        id: "cat-culture",
        name: "Culture & Village Life",
        slug: "culture",
      },
      destination: baseDestination,
      featuredImage: {
        id: "img-old-manali",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "Traditional stone and cedar houses along mountain trail in Old Manali",
      },
    },
    {
      id: "place-vashisht",
      name: "Vashisht Hot Springs",
      slug: "vashisht",
      shortDescription:
        "Natural geothermal mineral baths and ancient stone shrines overlooking the Beas River.",
      category: {
        id: "cat-wellness",
        name: "Thermal Springs & Nature",
        slug: "nature",
      },
      destination: baseDestination,
      featuredImage: {
        id: "img-vashisht",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Geothermal springs and mountain village of Vashisht",
      },
    },
  ];
}

export async function getEditorialGuides(): Promise<{
  featured: ArticleSummary;
  supporting: ArticleSummary[];
}> {
  return {
    featured: {
      id: "guide-manali-main",
      title: "The Definitive First-Timer's Guide to Manali & Kullu Valley",
      slug: "manali-first-timers-guide",
      excerpt:
        "Everything you need to know before visiting Manali: acclimatization timings, seasonal snowfall patterns, secret river trails, and authentic Himachali culinary traditions.",
      type: "GUIDE",
      readingTimeMin: 7,
      author: {
        id: "author-aarav",
        displayName: "Aarav Sharma",
        slug: "aarav-sharma",
        bio: "Senior Himalayan travel journalist",
      },
      publishedAt: new Date("2025-01-15"),
      featuredImage: {
        id: "img-guide-manali",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        altText: "Panoramic Himalayan range overlooking Kullu Valley",
      },
      tags: [
        { id: "tag-himalayas", name: "Himalayas", slug: "himalayas" },
        { id: "tag-seasons", name: "Seasons", slug: "seasons" },
      ],
    },
    supporting: [
      {
        id: "guide-spiti-road",
        title: "Navigating High Passes: The Road to Spiti via Atal Tunnel",
        slug: "navigating-spiti-valley-passes",
        excerpt:
          "Essential vehicle preparation, fuel logistics, and high-altitude checkpoints for crossing from Kullu into the high trans-Himalayan desert.",
        type: "GUIDE",
        readingTimeMin: 5,
        author: {
          id: "author-aarav",
          displayName: "Aarav Sharma",
          slug: "aarav-sharma",
        },
        publishedAt: new Date("2025-02-01"),
        featuredImage: {
          id: "img-guide-spiti",
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          altText: "Curving mountain road cutting through rugged Himalayan scree",
        },
        tags: [{ id: "tag-roadtrip", name: "Road Trips", slug: "road-trips" }],
      },
      {
        id: "guide-old-manali-cafes",
        title: "Slow Travel in Old Manali: Apple Orchards & Timber Cottages",
        slug: "slow-travel-old-manali",
        excerpt:
          "How to spend a restorative week working remotely and walking tranquil mountain tracks above the Manalsu River.",
        type: "GUIDE",
        readingTimeMin: 4,
        author: {
          id: "author-aarav",
          displayName: "Aarav Sharma",
          slug: "aarav-sharma",
        },
        publishedAt: new Date("2025-02-14"),
        featuredImage: {
          id: "img-guide-slow",
          url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
          altText: "Peaceful morning mist rising over mountain village apple trees",
        },
        tags: [{ id: "tag-slow", name: "Slow Travel", slug: "slow-travel" }],
      },
    ],
  };
}

export function getTravelInterests(): TravelInterest[] {
  return [
    {
      id: "interest-mountains",
      title: "Mountains",
      slug: "mountains",
      description: "High passes, cedar valleys & panoramic alpine ridgelines.",
      iconName: "mountain",
      tag: "Alpine",
    },
    {
      id: "interest-roadtrips",
      title: "Road Trips",
      slug: "road-trips",
      description: "Scenic highway corridors, hairpin passes & remote pit stops.",
      iconName: "route",
      tag: "Overland",
    },
    {
      id: "interest-weekend",
      title: "Weekend Escapes",
      slug: "weekend-escapes",
      description: "Short 2 to 3-day escapes within easy reach of regional hubs.",
      iconName: "clock",
      tag: "Short Trips",
    },
    {
      id: "interest-nature",
      title: "Nature & Wilderness",
      slug: "nature",
      description: "National sanctuaries, pine forests & glacial river valleys.",
      iconName: "trees",
      tag: "Outdoors",
    },
    {
      id: "interest-adventure",
      title: "Adventure",
      slug: "adventure",
      description: "Paragliding, snow skiing, river crossings & rugged treks.",
      iconName: "compass",
      tag: "Thrill",
    },
    {
      id: "interest-beaches",
      title: "Beaches & Coast",
      slug: "beaches",
      description: "Quiet coastal coves, palm lagoons & golden shorelines.",
      iconName: "sun",
      tag: "Coastal",
    },
    {
      id: "interest-family",
      title: "Family Trips",
      slug: "family-trips",
      description: "Accessible trails, comfortable stays & engaging cultural sites.",
      iconName: "users",
      tag: "Comfort",
    },
    {
      id: "interest-budget",
      title: "Budget Travel",
      slug: "budget-travel",
      description: "Homestays, public mountain transit & affordable experiences.",
      iconName: "wallet",
      tag: "Smart Value",
    },
  ];
}

export async function getCuratedItineraries(): Promise<ItinerarySummary[]> {
  return [
    {
      id: "itin-manali-4day",
      title: "4 Days in Manali: From Alpine Meadows to Cedar Temples",
      slug: "4-days-manali-adventure",
      summary:
        "A balanced route through Solang adventure sports, Old Manali cafés, Vashisht thermal baths, and Naggar heritage castle.",
      durationDays: 4,
      difficulty: "Moderate",
      budgetRange: "Mid-Range",
      featuredImage: {
        id: "img-itin-manali",
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        altText: "Pine mountain road in Kullu Valley",
      },
    },
    {
      id: "itin-spiti-circuit",
      title: "7 Days Trans-Himalayan Circuit: Manali to Kaza & Chandra Taal",
      slug: "4-days-manali-adventure",
      summary:
        "Cross through Atal Tunnel and Kunzum Pass into the stark moonscapes of Spiti Valley and high-altitude glacial lakes.",
      durationDays: 7,
      difficulty: "Adventurous",
      budgetRange: "Moderate",
      featuredImage: {
        id: "img-itin-spiti",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        altText: "High altitude azure lake reflecting snow peaks",
      },
    },
  ];
}
