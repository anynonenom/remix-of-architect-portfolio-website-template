import merzouga from "@/assets/tour-merzouga.jpg";
import imperial from "@/assets/feature-medina.jpg";
import atlas from "@/assets/tour-atlas.jpg";
import coast from "@/assets/tour-coast.jpg";
import chefchaouen from "@/assets/tour-chefchaouen.jpg";
import saffron from "@/assets/tour-saffron.jpg";
import balloon from "@/assets/exc-balloon.jpg";
import riad from "@/assets/feature-riad.jpg";
import featureAtlas from "@/assets/feature-atlas.jpg";
import featureCoast from "@/assets/feature-coast.jpg";
import medina from "@/assets/feature-medina.jpg";
import pool from "@/assets/feature-pool.jpg";
import stars from "@/assets/feature-stars.jpg";
import kasbah from "@/assets/exc-kasbah.jpg";

export interface TourDay {
  day: number;
  title: string;
  body: string;
}

export interface Tour {
  slug: string;
  region: string;
  title: string;
  tagline: string;
  hero: string;
  gallery: string[];
  days: number;
  price: number;
  level: "Easy" | "Moderate" | "Active";
  groupSize: string;
  bestSeason: string;
  highlights: string[];
  itinerary: TourDay[];
  includes: string[];
  excludes: string[];
}

export const tours: Tour[] = [
  {
    slug: "merzouga-dunes-nomad-nights",
    region: "Sahara",
    title: "Merzouga dunes & nomad nights",
    tagline: "Four days of golden silence, camel caravans and starlit camps in Erg Chebbi.",
    hero: merzouga,
    gallery: [merzouga, stars, kasbah, saffron],
    days: 4,
    price: 890,
    level: "Easy",
    groupSize: "2–8 travellers",
    bestSeason: "October – April",
    highlights: [
      "Sunset camel ride along the highest dunes",
      "Private luxury desert camp with traditional gnawa music",
      "Berber family lunch in a remote oasis",
      "Stargazing with a local astronomer",
    ],
    itinerary: [
      { day: 1, title: "Marrakech → Aït Ben Haddou → Ouarzazate", body: "Cross the Tizi n'Tichka pass, lunch in a Berber kasbah, sunset over the UNESCO ksar of Aït Ben Haddou." },
      { day: 2, title: "Ouarzazate → Dades → Merzouga", body: "Drive through the rose valley and Dades gorges, arrive at the dunes for a sunset camel ride and dinner under the stars." },
      { day: 3, title: "Merzouga oasis day", body: "Sunrise on the dunes, Berber family lunch, optional sandboarding or 4x4 expedition into the deeper desert." },
      { day: 4, title: "Merzouga → Marrakech", body: "Scenic drive back via the Tizi n'Tichka, arriving in Marrakech in the early evening." },
    ],
    includes: ["Private 4x4 with English-speaking driver", "Three nights accommodation (riad + desert camp)", "Daily breakfast, two dinners, one Berber lunch", "Camel trek and camp activities", "All park and site entries"],
    excludes: ["International flights", "Personal expenses and tipping", "Travel insurance"],
  },
  {
    slug: "imperial-cities-marrakech-fes-chefchaouen",
    region: "Imperial cities",
    title: "Marrakech, Fes & Chefchaouen",
    tagline: "Eight slow days through Morocco's three most cinematic cities — and the blue village in between.",
    hero: imperial,
    gallery: [imperial, riad, chefchaouen, medina, pool],
    days: 8,
    price: 1690,
    level: "Easy",
    groupSize: "2–10 travellers",
    bestSeason: "March – May, September – November",
    highlights: [
      "Sunset rooftop dinner above Jemaa el-Fnaa",
      "Private medina walk with a Fes historian",
      "Blue alley wandering in Chefchaouen",
      "Two nights in a hand-picked riad in each city",
    ],
    itinerary: [
      { day: 1, title: "Arrive Marrakech", body: "Riad welcome, mint tea on the rooftop, gentle stroll through your neighbourhood." },
      { day: 2, title: "Marrakech medina deep dive", body: "Bahia palace, secret souks, lunch in a hidden courtyard, evening at Jemaa el-Fnaa." },
      { day: 3, title: "Marrakech → Fes", body: "Travel by private vehicle via Beni Mellal and the Middle Atlas." },
      { day: 4, title: "Fes medina", body: "Tanneries, madrasas, Andalusian quarter — guided by a local historian." },
      { day: 5, title: "Fes → Chefchaouen", body: "Drive through the Rif mountains to the famous blue village." },
      { day: 6, title: "Chefchaouen", body: "Free morning to wander the painted alleys, optional hike to the Spanish mosque at sunset." },
      { day: 7, title: "Chefchaouen → Marrakech", body: "Internal flight from Tangier, evening rooftop dinner." },
      { day: 8, title: "Departure", body: "Private transfer to Marrakech airport." },
    ],
    includes: ["Private vehicle and driver between cities", "Seven nights in boutique riads", "Daily breakfast, three dinners", "Two private city walking tours", "All transfers and one internal flight"],
    excludes: ["International flights", "Lunches and remaining dinners", "Personal expenses"],
  },
  {
    slug: "high-atlas-berber-trek",
    region: "Atlas",
    title: "High Atlas Berber trek",
    tagline: "Five days walking village to village in the shadow of Mount Toubkal.",
    hero: atlas,
    gallery: [atlas, featureAtlas, kasbah, stars],
    days: 5,
    price: 1120,
    level: "Moderate",
    groupSize: "2–8 travellers",
    bestSeason: "April – June, September – October",
    highlights: [
      "Stay in Berber family guesthouses",
      "Walk between five mountain villages",
      "Optional summit attempt of Mount Toubkal (4167m)",
      "Mule-supported, light backpack only",
    ],
    itinerary: [
      { day: 1, title: "Marrakech → Imlil", body: "Transfer to the trailhead village, gentle acclimatisation walk in the afternoon." },
      { day: 2, title: "Imlil → Tacheddirt", body: "Five hours of trekking over the Tizi n'Tamatert pass." },
      { day: 3, title: "Tacheddirt → Azib Likemt", body: "Six hours through high pastures and Berber summer camps." },
      { day: 4, title: "Azib Likemt → Amsouzart", body: "Long descent to the lake of Ifni, overnight at a family gite." },
      { day: 5, title: "Amsouzart → Marrakech", body: "Morning walk to the trailhead, transfer back to the city." },
    ],
    includes: ["English- and Berber-speaking mountain guide", "Mules and muleteers", "Four nights in family guesthouses", "All meals on trek", "Marrakech transfers"],
    excludes: ["Sleeping bag (rentable)", "Toubkal summit refuge fee (optional)", "Personal trekking gear"],
  },
  {
    slug: "essaouira-atlantic-shores",
    region: "Coast",
    title: "Essaouira & Atlantic shores",
    tagline: "Three windswept days on Morocco's bohemian coast — fishing harbours, oyster lunches and wild beaches.",
    hero: coast,
    gallery: [coast, featureCoast, riad],
    days: 3,
    price: 640,
    level: "Easy",
    groupSize: "2–10 travellers",
    bestSeason: "April – October",
    highlights: [
      "Stay in a 17th-century riad inside the medina",
      "Private boat trip with a local fisherman",
      "Oualidia oyster lunch on the coast",
      "Sunset gnawa music session",
    ],
    itinerary: [
      { day: 1, title: "Marrakech → Essaouira", body: "Drive west through argan country, arrive in time for a harbour walk and seafood dinner." },
      { day: 2, title: "Essaouira immersion", body: "Medina exploration, optional surf or kite lesson, sunset on the ramparts." },
      { day: 3, title: "Essaouira → Marrakech", body: "Lazy morning at the beach, return in the late afternoon." },
    ],
    includes: ["Private vehicle and driver", "Two nights in a heritage riad", "Daily breakfast, one dinner", "Boat trip with fisherman"],
    excludes: ["Surf or kite lessons", "Lunches and remaining dinners"],
  },
  {
    slug: "souks-hammams-saffron",
    region: "Culture",
    title: "Souks, hammams & saffron",
    tagline: "Six days of slow craft — cooking, weaving, distilling and bathing your way through Morocco.",
    hero: saffron,
    gallery: [saffron, medina, pool, riad],
    days: 6,
    price: 1340,
    level: "Easy",
    groupSize: "2–8 travellers",
    bestSeason: "Year-round",
    highlights: [
      "Cooking class with a Marrakech grandmother",
      "Saffron harvest in Taliouine (October only)",
      "Private hammam ritual",
      "Berber rug-weaving cooperative visit",
    ],
    itinerary: [
      { day: 1, title: "Arrive Marrakech", body: "Riad welcome, evening hammam ritual." },
      { day: 2, title: "Marrakech cooking class", body: "Souk shopping with the chef, then cook a tagine and pastilla together." },
      { day: 3, title: "Ourika valley", body: "Berber village, women's argan cooperative, riverside lunch." },
      { day: 4, title: "Ouirgane retreat", body: "Move to a mountain eco-lodge for two nights of rest and craft." },
      { day: 5, title: "Weaving day", body: "Spend the day with a Berber weaving cooperative learning the basics of a Beni Ourain rug." },
      { day: 6, title: "Return to Marrakech", body: "Final souk wander, departure transfer." },
    ],
    includes: ["Private vehicle and driver", "Five nights accommodation", "Cooking class and hammam ritual", "All cooperative visits", "Daily breakfast, three dinners"],
    excludes: ["International flights", "Lunches and personal expenses"],
  },
  {
    slug: "marrakech-balloon-palmeraie",
    region: "Marrakech",
    title: "Hot air balloon over palmeraie",
    tagline: "A single, unforgettable morning above Marrakech.",
    hero: balloon,
    gallery: [balloon, medina, pool],
    days: 1,
    price: 220,
    level: "Easy",
    groupSize: "2–16 travellers",
    bestSeason: "Year-round",
    highlights: [
      "Pre-dawn pickup from your riad",
      "One-hour balloon flight over the palmeraie",
      "Berber breakfast in a desert tent",
      "Optional camel ride add-on",
    ],
    itinerary: [
      { day: 1, title: "The flight", body: "Pickup at 5am, balloon launch at sunrise, breakfast in a Berber tent, return to your riad by 10am." },
    ],
    includes: ["Riad transfers", "One-hour balloon flight", "Berber breakfast", "Flight certificate"],
    excludes: ["Tipping for crew", "Optional camel ride"],
  },
];

export const findTour = (slug: string) => tours.find((t) => t.slug === slug);
