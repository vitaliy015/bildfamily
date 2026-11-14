import { business } from "@/lib/site"

// The home page FAQ, kept out of the component on purpose. The block itself is
// a client component, but the page also has to emit this same set as FAQPage
// structured data from the server — so the data lives here, where both can
// import it without the schema dragging the accordion into the server render.

// ── Types ──────────────────────────────────────────────────────────────────

export type FAQEntry = {
  id: number
  category: string
  question: string
  answer: string
}

export type Category = {
  id: string
  label: string
}

// ── Data ───────────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: "all",        label: "All Questions"      },
  { id: "pricing",   label: "Pricing & Budget"   },
  { id: "process",   label: "Timeline & Process" },
  { id: "permits",   label: "Licenses & Permits" },
  { id: "living",    label: "During Renovation"  },
  { id: "guarantees",label: "Results & Warranty" },
]

export const FAQ_DATA: FAQEntry[] = [
  // ── Pricing & Budget ───────────────────────────────────────────────────
  {
    id: 1,
    category: "pricing",
    question: "How much does a bathroom renovation cost in Calgary?",
    answer:
      "A bathroom refresh — new tile, vanity, lighting and fixtures in the same layout — usually runs $8,000–$15,000. A full down-to-studs remodel with a custom shower and waterproofing is $15,000–$28,000. Custom ensuites and spa bathrooms — steam showers, freestanding tubs, heated floors — start around $28,000. Every project starts with a free, no-obligation estimate — you'll have the exact number before we lift a single tool.",
  },
  {
    id: 2,
    category: "pricing",
    question: "Do you offer a fixed price, or can the quote change after we sign?",
    answer:
      "We offer a fixed-price contract. The number we put in writing is the number you pay — no line items that appear after the fact, no surprise charges at handover. If you book within 7 days of your estimate, we lock that price regardless of material fluctuations.",
  },
  {
    id: 3,
    category: "pricing",
    question: "What happens if hidden problems are discovered during demolition?",
    answer:
      "Before any work starts, we do a thorough pre-renovation inspection to catch as much as possible. We always recommend setting aside a 10–15% contingency. If something unexpected surfaces — old plumbing, water damage, outdated wiring — we stop work immediately, show you exactly what we found, explain your options clearly, and get your sign-off before proceeding. You're never surprised by extra costs.",
  },
  {
    id: 4,
    category: "pricing",
    question: "How is payment structured?",
    answer:
      "We use milestone-based payments tied to project progress: a deposit to secure your start date, a mid-project payment when major structural work is complete, and a final payment only after you've walked through and approved the finished result. We never ask for the full amount upfront.",
  },

  // ── Timeline & Process ────────────────────────────────────────────────
  {
    id: 5,
    category: "process",
    question: "How long will my bathroom renovation take?",
    answer:
      "A bathroom refresh takes one to three weeks on site. A full remodel — down to the studs, with a custom shower and new waterproofing — runs three to five weeks. Custom ensuite and spa projects take four to seven weeks. You get a start date and a finish date in writing before we begin, and we work evenings and weekends when that shortens the disruption for you.",
  },
  {
    id: 6,
    category: "process",
    question: "What does the process look like from first call to finished project?",
    answer:
      "Step 1: Free on-site consultation — we come to you, measure everything, and discuss your vision. Step 2: Written quote with a fixed price and timeline, delivered within 48 hours. Step 3: Materials selection — we guide you through choices that match your style and budget. Step 4: Work begins on your agreed start date. Step 5: Daily end-of-day cleanup and direct progress updates from Anatolii. Step 6: Final walkthrough — we address anything that doesn't meet your expectations before the final payment.",
  },
  {
    id: 7,
    category: "process",
    question: "Do you work evenings and weekends?",
    answer:
      "Yes — and it is one of the things clients tell us they value most. We schedule around your life rather than the other way around, which often means starting after work or pushing the noisy stages into a weekend. Because we are two people rather than a crew with a dispatcher, we can offer that flexibility where larger companies cannot.",
  },

  // ── Licenses & Permits ────────────────────────────────────────────────
  {
    id: 8,
    category: "permits",
    question: "Are you licensed and insured?",
    // The licence is municipal, not provincial — the document itself is marked
    // "contractor (no provincial licence required)". Naming the issuer and the
    // number is what makes this checkable; a bare "we are licensed" is not.
    answer:
      `Yes. ${business.legalName} holds ${business.licence.issuer} Business Licence ${business.licence.number}, valid through January 2027 — we will send you a copy on request. We also carry general liability insurance and can provide our certificate of insurance at any time. Anatolii and Nataliia personally stand behind every project, so keeping that paperwork current is non-negotiable for us.`,
  },
  {
    id: 9,
    category: "permits",
    question: "Who handles building permits — us or you?",
    answer:
      "We handle the entire permit process on your behalf. In a bathroom renovation, permits come into play whenever we move plumbing, add or relocate electrical, or change the layout. We know Calgary's building code inside-out and manage all paperwork, inspections, and sign-offs so you don't have to think about it.",
  },

  // ── Living During Renovation ──────────────────────────────────────────
  {
    id: 10,
    category: "living",
    question: "Can we stay in our home during the renovation?",
    answer:
      "Yes — a bathroom renovation almost never means moving out. We isolate the work zone, contain the dust, and plan the schedule around your household. The room being renovated is a construction site from demolition onward, so if it is your only bathroom we will say so at the quote and plan the stages around that.",
  },
  {
    id: 11,
    category: "living",
    question: "How do you keep the job site clean?",
    answer:
      "Cleanliness is the thing clients mention to us most often. Every evening before we leave, we sweep, bag all debris, and fully contain dust to the work zone. We use protective coverings on floors and furniture in adjacent rooms. Anatolii was raised to believe a clean site is a sign of respect for the homeowner — we treat your home exactly the way we'd treat our own.",
  },
  {
    id: 12,
    category: "living",
    question: "Who exactly will be working in my home?",
    answer:
      "Anatolii personally leads or is on-site for every project. For larger jobs, we bring in a small, trusted crew we've worked alongside for years — not random subcontractors found online. You'll meet everyone before work begins. Because we're family-owned and intentionally limit our volume, we only take on projects we can personally oversee.",
  },

  // ── Results & Warranty ────────────────────────────────────────────────
  {
    id: 13,
    category: "guarantees",
    question: "Do you offer a warranty on your work?",
    answer:
      "All our workmanship is warranted for 1 year. If something we built or installed has a defect within that period, we come back and fix it at no charge. We also pass through all applicable manufacturer warranties on materials and fixtures. The goal is simple: if you're not genuinely happy with the result, we're not finished.",
  },
  {
    id: 14,
    category: "guarantees",
    question: "Will a bathroom renovation increase the value of my home?",
    answer:
      "Bathrooms and kitchens are consistently the two rooms that return the most of what you put into them — industry surveys in Canada usually put a bathroom renovation somewhere around 60–70% of its cost recovered at resale. Treat any figure as a guide rather than a promise: the return depends on your home, your street and the market on the day you sell. What we can say plainly is that a dated or leaking bathroom puts buyers off more than almost anything else, and that is the problem we fix.",
  },
]
