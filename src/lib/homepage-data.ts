import {
  getFeaturedDestinations,
  getPopularPlaces,
  getEditorialGuides,
  getCuratedItineraries,
} from "@/lib/data";

/**
 * Homepage Data Access
 * Delegates to centralized server data layer (src/lib/data/*).
 * Zero mock fallback arrays — returns real database data or empty collections.
 */

export interface TravelInterest {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  tag: string;
}

export {
  getFeaturedDestinations,
  getPopularPlaces,
  getEditorialGuides,
  getCuratedItineraries,
};

/**
 * Travel Interests
 * Curated editorial taxonomy preserved for milestone navigation.
 */
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
