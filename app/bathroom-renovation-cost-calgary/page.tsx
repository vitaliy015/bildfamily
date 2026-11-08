import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { services } from "@/lib/services"
import { siteUrl, business } from "@/lib/site"

const title = "Bathroom Renovation Cost in Calgary (2026) | Inside The House"
const description =
  "What a bathroom renovation actually costs in Calgary: $8,000–$15,000 for a refresh, $15,000–$28,000 for a full remodel, $28,000+ for an ensuite."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/bathroom-renovation-cost-calgary" },
  openGraph: { title, description, url: "/bathroom-renovation-cost-calgary" },
  twitter: { title, description },
}

// Must stay in sync with components/blocks/Pricing.tsx and the service pages.
const BANDS = [
  {
    name: "Bathroom Refresh",
    range: "$8,000 – $15,000",
    timeline: "1–3 weeks",
    who: "Your layout works and the bones are sound. You want it to stop looking like 2004.",
    scope: "New tile, vanity, lighting and fixtures in the existing layout. Nothing moves.",
    href: "/services/tile-and-shower",
  },
  {
    name: "Full Bathroom Remodel",
    range: "$15,000 – $28,000",
    timeline: "3–5 weeks",
    who: "The layout fights you, or something behind the tile has failed.",
    scope: "Down to the studs: new waterproofing, plumbing moved where needed, custom shower, vanity, lighting and glass.",
    href: "/services/full-bathroom-remodel",
    featured: true,
  },
  {
    name: "Custom Ensuite & Spa",
    range: "from $28,000",
    timeline: "4–7 weeks",
    who: "The one room you use every day, built around you rather than resale.",
    scope: "Freestanding tubs, curbless or steam showers, in-floor heating, double vanities, full custom tile.",
    href: "/services/ensuite-renovation",
  },
]

const DRIVERS = [
  {
    factor: "Room size",
    effect: "Biggest single lever",
    detail:
      "A 5×8 main bathroom and a 12×14 ensuite are different jobs, not the same job at different scales. Tile area, waterproofing and labour all scale with the floor plan.",
  },
  {
    factor: "Does plumbing move?",
    effect: "+$1,500 – $4,000",
    detail:
      "Keeping the toilet, sink and drain where they are keeps the price down. Moving a drain means opening the floor and, in most Calgary homes, working around the joists.",
  },
  {
    factor: "Tile choice and layout",
    effect: "+$1,000 – $6,000",
    detail:
      "Large-format tile, herringbone, full-height walls and mosaic niches all take longer to set. The tile itself is rarely the expensive part — the hours are.",
  },
  {
    factor: "Shower type",
    effect: "+$2,000 – $7,000",
    detail:
      "A tub-shower in the existing alcove is the cheapest. A curbless walk-in with a linear drain and frameless glass is the most expensive, because the floor structure has to be reworked.",
  },
  {
    factor: "Fixtures and vanity",
    effect: "+$800 – $5,000",
    detail:
      "A stock vanity and a builder faucet versus custom cabinetry, stone top and brushed-gold fittings. This is the line you control most directly.",
  },
  {
    factor: "In-floor heating",
    effect: "+$1,500 – $3,000",
    detail:
      "Only worth doing while the floor is already open. In Calgary winters most clients who install it say they would not go back.",
  },
  {
    factor: "What we find behind the wall",
    effect: "Varies",
    detail:
      "Rot, mould or failed framing is the usual reason a price changes mid-job. We stop, photograph it, and get your approval before spending anything.",
  },
]

const FAQS = [
  {
    question: "How much does a bathroom renovation cost in Calgary?",
    answer:
      "Between $8,000 and $28,000 for most homes. A refresh that keeps the layout runs $8,000–$15,000. A full down-to-studs remodel runs $15,000–$28,000. A custom ensuite with a freestanding tub, curbless shower or heated floors starts at $28,000.",
  },
  {
    question: "Why are other Calgary renovation companies quoting $50,000 or more?",
    answer:
      "Most established Calgary renovators are general contractors who take whole-home projects and treat a single bathroom as a small job with a large overhead attached. We only do bathrooms, Anatolii is on site himself, and there is no layer of project managers to pay for.",
  },
  {
    question: "Is the quote fixed or does it change?",
    answer:
      "Fixed. You get one written number covering everything we can see at the walkthrough. It only changes if we open a wall and find damage nobody could have known about — and then you see photos and approve the cost before we continue.",
  },
  {
    question: "What is not included in the price?",
    answer:
      "Permits are quoted separately when the work needs them. Anything you ask us to add after the quote is signed is priced before we do it. Everything else — demolition, disposal, materials, labour, cleanup — is in the number.",
  },
  {
    question: "Do you ask for money up front?",
    answer:
      "A deposit covers materials, and the rest is tied to stages of the work. You never pay for work that has not happened yet.",
  },
  {
    question: "How long does a bathroom renovation take in Calgary?",
    answer:
      "One to three weeks for a refresh, three to five for a full remodel, four to seven for a custom ensuite. You get a start date and a finish date in writing, and we work evenings and weekends when that shortens the disruption.",
  },
  {
    question: "Do you work outside Calgary?",
    answer: `Yes — ${business.areaServed.join(", ")}. Travel outside Calgary is included in the quote, not added afterwards.`,
  },
]

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 h-px bg-[#8a8a5c]" />
      <span
        className="text-[#6a6460] text-[11px] font-bold uppercase tracking-[0.25em]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {children}
      </span>
    </div>
  )
}

export default function CostPage() {
  const pageUrl = `${siteUrl}/bathroom-renovation-cost-calgary`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Bathroom Renovation Cost", item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="bg-[#eae6df]">

        {/* Hero — the direct answer sits in the first paragraph on purpose */}
        <section className="pt-32 pb-14 md:pt-40 md:pb-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
            <nav aria-label="Breadcrumb">
              <ol
                className="flex flex-wrap items-center gap-2 text-xs text-[#6a6460]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <li><Link href="/" className="hover:text-[#1c1a18] transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[#1c1a18]" aria-current="page">Bathroom Renovation Cost</li>
              </ol>
            </nav>

            <Eyebrow>Honest numbers &middot; {business.city}, {business.region}</Eyebrow>

            <h1
              className="text-[10vw] min-[430px]:text-[48px] md:text-[62px] font-black uppercase leading-[0.96] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What a Bathroom Renovation Costs in Calgary
            </h1>

            <p
              className="text-lg md:text-xl text-[#1c1a18] leading-relaxed max-w-3xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Most Calgary bathrooms land between <strong>$8,000 and $28,000</strong>. A
              refresh that keeps your layout runs $8,000–$15,000. A full down-to-studs
              remodel runs $15,000–$28,000. A custom ensuite starts at $28,000.
            </p>

            <p
              className="text-base text-[#4a4840] leading-relaxed max-w-3xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Nobody else in Calgary publishes this, which is exactly why we do. You should
              be able to work out roughly what your room costs before you spend an evening
              on the phone. Below is what sits inside each band, and the seven things that
              move a quote up or down.
            </p>
          </div>
        </section>

        {/* Price bands */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The three price bands
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              {BANDS.map((b) => (
                <div
                  key={b.name}
                  className={`flex flex-col gap-4 rounded-xl p-6 border ${
                    b.featured
                      ? "bg-[#1c1a17] border-[#1c1a17]"
                      : "bg-[#faf9f5] border-[#c4c0b8]"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold uppercase tracking-wide leading-tight ${
                      b.featured ? "text-[#f0ede8]" : "text-[#1c1a18]"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {b.name}
                  </h3>
                  <p
                    className={`text-2xl font-black ${b.featured ? "text-[#c4a962]" : "text-[#8a8a5c]"}`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {b.range}
                  </p>
                  <p
                    className={`text-[11px] uppercase tracking-[0.2em] ${
                      b.featured ? "text-[#9a9a8a]" : "text-[#6a6460]"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {b.timeline} on site
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${b.featured ? "text-[#9a9a8a]" : "text-[#4a4840]"}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <strong className={b.featured ? "text-[#f0ede8]" : "text-[#1c1a18]"}>
                      Right for you if:
                    </strong>{" "}
                    {b.who}
                  </p>
                  <p
                    className={`text-sm leading-relaxed flex-1 ${b.featured ? "text-[#9a9a8a]" : "text-[#4a4840]"}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {b.scope}
                  </p>
                  <Link
                    href={b.href}
                    className={`group inline-flex items-center gap-2 text-sm font-medium pt-2 transition-colors ${
                      b.featured
                        ? "text-[#c4a962] hover:text-[#d4ba74]"
                        : "text-[#4a4840] hover:text-[#1c1a18]"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    See what&rsquo;s included <Arrow />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost drivers */}
        <section className="bg-[#faf9f5] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Where the money goes</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Seven things that move the price
            </h2>

            <div className="flex flex-col divide-y divide-[#c4c0b8] max-w-3xl">
              {DRIVERS.map((d) => (
                <div key={d.factor} className="py-6 flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3
                      className="text-lg font-bold text-[#1c1a18]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {d.factor}
                    </h3>
                    <span
                      className="text-sm font-bold text-[#8a8a5c] whitespace-nowrap"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {d.effect}
                    </span>
                  </div>
                  <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {d.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why we cost less */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-5 [&>p]:max-w-3xl">
            <Eyebrow>The honest part</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why our numbers are lower than the big firms
            </h2>
            <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Most well-known Calgary renovators start at $50,000 and up. They are general
              contractors built for whole-home projects, so a single bathroom carries the
              same overhead as a kitchen-and-basement job: estimators, project managers,
              showrooms, subcontractor margins.
            </p>
            <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              We are two people. Anatolii does the work on site, Nataliia runs scheduling
              and materials. There is nobody in between to pay for, and because we only do
              bathrooms, we are not learning your room on your budget.
            </p>
            <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              That is also the trade-off, stated plainly: we take a limited number of
              projects, so our start dates are real dates rather than a slot in a queue.
            </p>
          </div>
        </section>

        {/* Service links */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
            <Eyebrow>By type of job</Eyebrow>
            <div className="grid sm:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-[#c4c0b8] bg-[#faf9f5] p-6 transition duration-300 hover:border-[#8a8a5c] motion-safe:hover:-translate-y-0.5"
                >
                  <h3
                    className="text-lg font-bold uppercase tracking-wide text-[#1c1a18] leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-sm text-[#8a8a5c] font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                    {s.priceRange}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#faf9f5] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Straight answers</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bathroom renovation cost FAQ
            </h2>
            <div className="flex flex-col divide-y divide-[#c4c0b8] max-w-3xl">
              {FAQS.map((f) => (
                <div key={f.question} className="py-6 flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-[#1c1a18]" style={{ fontFamily: "var(--font-heading)" }}>
                    {f.question}
                  </h3>
                  <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1c1a17] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-start gap-6 [&>p]:max-w-2xl">
            <h2
              className="text-3xl md:text-5xl font-black uppercase leading-tight text-[#f0ede8]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Want the number for your bathroom?
            </h2>
            <p className="text-[#9a9a8a] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The bands above get you close. A twenty-minute walkthrough gets you exact —
              one written price, a start date and a finish date, with no obligation to
              go ahead.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#c4a962] text-[#1c1a17] px-6 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap transition duration-300 ease-out hover:bg-[#d4ba74] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[15px] sm:text-[18px] font-bold tracking-[0.01em]">Get a free quote</span>
              <Arrow />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
