// Single source of truth for the service landing pages.
//
// Each entry drives one URL at /services/<slug>, its metadata, its JSON-LD and
// its row on the /services index — so adding a service means adding an object
// here and nothing else. Price bands must stay in sync with the Pricing block
// (components/blocks/Pricing.tsx) and the FAQ, or the site contradicts itself.

export type ServiceFaq = { question: string; answer: string }

export type ServicePhoto = { src: string; alt: string }

export type Service = {
  slug: string
  /** Short label — nav, footer, breadcrumbs, index cards. */
  name: string
  /** <title>. Keyword first, brand last. */
  metaTitle: string
  /** Meta description. Keep under ~155 characters. */
  metaDescription: string
  /** On-page <h1>. */
  h1: string
  /** Lead paragraph under the h1. */
  intro: string
  /** Price band shown on the page, matching the Pricing block. */
  priceRange: string
  /** Typical duration on site. */
  timeline: string
  /** What the price covers. */
  includes: string[]
  /** How the job runs, start to finish. */
  steps: { title: string; body: string }[]
  faqs: ServiceFaq[]
  hero: ServicePhoto
  gallery: ServicePhoto[]
}

export const services: Service[] = [
  {
    slug: "full-bathroom-remodel",
    name: "Full Bathroom Remodel",
    metaTitle:
      "Full Bathroom Remodel Calgary | Cost & Process | Inside The House",
    metaDescription:
      "Down-to-studs bathroom remodels in Calgary, $15,000–$28,000. Waterproofed showers, custom tile, new vanity. Family-owned, fixed quote, free estimate.",
    h1: "Full Bathroom Remodels in Calgary",
    intro:
      "A full remodel strips the room back to the studs and rebuilds it properly — new waterproofing, new plumbing where it needs to move, new tile, vanity, lighting and glass. It is the right choice when the layout no longer works, when there is water damage behind the tile, or when patching one more thing stops making sense.",
    priceRange: "$15,000 – $28,000",
    timeline: "3 to 5 weeks on site",
    includes: [
      "Demolition and disposal, down to the studs",
      "Plumbing and electrical rough-in, including moving fixtures",
      "Full shower waterproofing — the part nobody sees and everything depends on",
      "Floor and wall tile, including large-format and niches",
      "Vanity, countertop, sink and faucet",
      "Lighting, exhaust fan and finishing electrical",
      "Frameless or semi-frameless glass",
      "Paint, trim and a cleaned-up room at handover",
    ],
    steps: [
      {
        title: "Walkthrough and fixed quote",
        body: "We measure, talk through what you want, and give you one written number. No hourly surprises, no 'we'll see once we open the wall' unless we genuinely find something — and then you hear about it before we spend your money.",
      },
      {
        title: "Selections",
        body: "Nataliia sources tile, vanity and fixtures with you and keeps the list inside the budget you agreed to. If you have already chosen everything, we work with your list.",
      },
      {
        title: "Demolition and rough-in",
        body: "The room comes out, plumbing and electrical go where they need to be, and the inspection happens before anything gets covered up.",
      },
      {
        title: "Waterproofing and tile",
        body: "Membrane, slope and sealing done to spec, then tile. This is the stage that decides whether the bathroom lasts fifteen years or leaks in three.",
      },
      {
        title: "Fit-out and handover",
        body: "Vanity, glass, lighting, trim and paint. We clean the site, walk you through it, and deal with anything on your list before we call it finished.",
      },
    ],
    faqs: [
      {
        question: "How much does a full bathroom remodel cost in Calgary?",
        answer:
          "Most full remodels land between $15,000 and $28,000. The spread comes from size, tile choice, and whether plumbing has to move. A standard 5x8 bathroom with mid-range finishes and the existing layout sits near the bottom of that band; a larger room with large-format tile, a custom shower and relocated plumbing sits near the top.",
      },
      {
        question: "How long will my bathroom be out of use?",
        answer:
          "Three to five weeks for a full remodel. We give you a start and finish date in writing before we begin, and we work evenings and weekends when that helps you keep one bathroom running.",
      },
      {
        question: "Do you handle permits?",
        answer:
          "Yes. If the work needs a City of Calgary permit — usually when plumbing or electrical moves — we pull it and schedule the inspections.",
      },
      {
        question: "What happens if you find water damage behind the tile?",
        answer:
          "We stop, photograph it, and tell you what it costs to fix before we carry on. It is the most common reason a job changes price, and you will never find out about it on the final invoice.",
      },
    ],
    hero: {
      src: "/work/showcase-1.jpg",
      alt: "Completed full bathroom remodel with warm oak vanity by Inside The House in Calgary",
    },
    gallery: [
      {
        src: "/uploads/2025/09/IMG_3481.jpg",
        alt: "Arched mirror double vanity in a remodelled Calgary bathroom",
      },
      {
        src: "/uploads/2025/09/IMG_3494.jpg",
        alt: "Fireside tub suite in a full bathroom remodel, Calgary",
      },
      {
        src: "/uploads/2025/09/IMG_3491.jpg",
        alt: "Marble-tiled water closet in a Calgary bathroom remodel",
      },
    ],
  },
  {
    slug: "ensuite-renovation",
    name: "Ensuite Renovation",
    metaTitle:
      "Ensuite Renovation Calgary | Master & Spa Bathrooms | Inside The House",
    metaDescription:
      "Master ensuite renovations in Calgary from $28,000 — steam showers, freestanding tubs, heated floors, double vanities. Family-owned. Free quote.",
    h1: "Ensuite Renovations in Calgary",
    intro:
      "An ensuite is the one bathroom you use every single day, and the one guests never see — so it should be built around you rather than around resale. These are our most custom projects: double vanities, freestanding tubs, steam showers, heated floors, and tile work that takes the time it takes.",
    priceRange: "from $28,000",
    timeline: "4 to 7 weeks on site",
    includes: [
      "Layout redesign, including moving walls where the room allows",
      "Double vanities and custom cabinetry",
      "Freestanding or drop-in soaker tubs",
      "Curbless and walk-in showers, steam-ready builds",
      "In-floor heating",
      "Full-height and large-format tile",
      "Frameless glass, custom cut",
      "Feature lighting, dimmers and heated mirrors",
    ],
    steps: [
      {
        title: "Design conversation",
        body: "Ensuites are where layout matters most. We look at what the room can actually give you — where the drain is, where the joists run, whether a wall can move — before anyone falls in love with a picture.",
      },
      {
        title: "Fixed quote and selections",
        body: "One written number. Nataliia sources the tile, stone and fixtures with you, and tells you early when something on the list will push the budget.",
      },
      {
        title: "Strip-out and structure",
        body: "Demolition, any framing changes, then plumbing and electrical rough-in and inspection.",
      },
      {
        title: "Waterproofing, heating and tile",
        body: "Membrane and slope first, in-floor heat if you are having it, then tile. Curbless showers live or die on this stage.",
      },
      {
        title: "Finishing and handover",
        body: "Vanities, stone, glass, lighting and paint. We clean up properly and go through the room with you before we invoice.",
      },
    ],
    faqs: [
      {
        question: "How much does an ensuite renovation cost in Calgary?",
        answer:
          "Ensuites start around $28,000 and go up from there. They cost more than a standard bathroom because the rooms are bigger, the tile runs further, and they usually include at least one of: a freestanding tub, a curbless or steam shower, in-floor heating or a double vanity.",
      },
      {
        question: "Can you build a curbless walk-in shower?",
        answer:
          "Usually yes, but it depends on your floor structure — a curbless shower needs the drain recessed between the joists. We check that on the first visit and tell you straight away whether it is possible in your house.",
      },
      {
        question: "Is in-floor heating worth it in Calgary?",
        answer:
          "In an ensuite, most clients say it is the thing they would never give up. It adds roughly $1,500–$3,000 depending on the floor area, and it is only sensible to install it while the floor is already open.",
      },
      {
        question: "Can we keep using the ensuite during the work?",
        answer:
          "No — once demolition starts the room is a construction site. We plan around your main bathroom and work evenings and weekends where it shortens the disruption.",
      },
    ],
    hero: {
      src: "/work/showcase-2.jpg",
      alt: "Bright ensuite with freestanding soaker tub, renovated by Inside The House in Calgary",
    },
    gallery: [
      {
        src: "/work/ensuite-after.jpg",
        alt: "Navy and marble master ensuite completed in Calgary",
      },
      {
        src: "/work/showcase-4.jpg",
        alt: "Freestanding soaker tub in a Calgary ensuite renovation",
      },
      {
        src: "/uploads/2025/09/IMG_3483.jpg",
        alt: "Fireside soaker tub in a renovated Calgary ensuite",
      },
    ],
  },
  {
    slug: "tile-and-shower",
    name: "Custom Tile & Showers",
    metaTitle:
      "Shower Replacement & Tile Calgary | Waterproofed Right | Inside The House",
    metaDescription:
      "Custom tile showers and shower replacement in Calgary, $8,000–$15,000. Proper waterproofing, large-format tile, frameless glass. Free quote.",
    h1: "Custom Tile & Showers in Calgary",
    intro:
      "Most of the bathrooms we are called to fix failed in the same place: the shower. Tile is the visible half of the job and waterproofing is the half that decides how long it lasts. We do both ourselves, which is why we are willing to put the waterproofing stage in writing.",
    priceRange: "$8,000 – $15,000",
    timeline: "1 to 3 weeks on site",
    includes: [
      "Removing the old shower, tub surround or failed tile",
      "Rebuilding the substrate where it has gone soft",
      "Full waterproofing membrane, sloped and sealed to spec",
      "Wall and floor tile, including large-format and mosaic",
      "Built-in niches and benches",
      "Curbless conversion where the floor structure allows",
      "Frameless and semi-frameless glass, custom measured",
      "New shower valve, head and drain",
    ],
    steps: [
      {
        title: "Look at what is actually behind it",
        body: "We find out why the old one failed before quoting. Cracked grout is a symptom; the cause is usually the membrane, the slope or the substrate.",
      },
      {
        title: "Fixed quote",
        body: "One written number covering demolition, any rot repair we can see, waterproofing, tile and glass.",
      },
      {
        title: "Strip-out and substrate",
        body: "The old shower comes out and anything soft gets replaced. We do not tile over a problem.",
      },
      {
        title: "Waterproofing",
        body: "Membrane, slope to drain, corners and penetrations sealed. We photograph this stage and send it to you, because once the tile is on, nobody can check it.",
      },
      {
        title: "Tile and glass",
        body: "Tile, grout, seal, then the glass goes in once everything has cured and the measurements are real rather than theoretical.",
      },
    ],
    faqs: [
      {
        question: "How much does it cost to replace a shower in Calgary?",
        answer:
          "Between $8,000 and $15,000 for a tiled shower done properly, including waterproofing and glass. A straight tub-to-shower conversion in the same footprint sits at the lower end; a large curbless shower with full-height large-format tile sits at the top.",
      },
      {
        question: "Why did my last shower leak?",
        answer:
          "Nearly always the waterproofing, not the tile. Tile and grout are not waterproof — the membrane behind them is. When that is missing, badly lapped, or the floor does not slope to the drain, water gets into the structure and the tile cracks later as a symptom.",
      },
      {
        question: "Can you convert a bathtub into a walk-in shower?",
        answer:
          "Yes, and it is one of the most common jobs we do. The drain usually has to move, so we check the floor structure first and tell you on the first visit what is realistic.",
      },
      {
        question: "Do you fix just the grout, or only full replacements?",
        answer:
          "We will tell you honestly which one your shower needs. If regrouting buys you real years, we will say so. If the membrane has gone, regrouting is money spent to delay the same conversation.",
      },
    ],
    hero: {
      src: "/uploads/2025/09/IMG_5674.jpg",
      alt: "Emerald and gold custom tile shower built by Inside The House in Calgary",
    },
    gallery: [
      {
        src: "/uploads/2025/09/IMG_4359.jpg",
        alt: "Large format tile shower with black hardware in a Calgary bathroom",
      },
      {
        src: "/work/showcase-5.jpg",
        alt: "White-tile shower with frameless glass, Calgary",
      },
      {
        src: "/uploads/2025/09/IMG_3484.jpg",
        alt: "Marble shower niche tiled by Inside The House in Calgary",
      },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
