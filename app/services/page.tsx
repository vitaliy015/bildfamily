import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { services, priceBands, costDrivers, costFaqs } from "@/lib/services"
import { siteUrl, business } from "@/lib/site"

const title =
  "Bathroom Renovation Services & Costs in Calgary | Inside The House"
const description =
  "What we build and what it costs: bathroom refresh $8,000–$15,000, full remodel $15,000–$28,000, custom ensuite from $28,000. Calgary, family-owned."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { title, description },
}

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

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0">
    <path d="M3 8.5L6.5 12L13 4.5" stroke="#8a8a5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

export default function ServicesPage() {
  const pageUrl = `${siteUrl}/services`
  const allFaqs = [...costFaqs, ...services.flatMap((s) => s.faqs)]

  // One page now carries the services and their pricing, so the markup does
  // too: an ItemList of what we build plus every question answered on the page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#services`,
        name: "Bathroom renovation services in Calgary",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.metaDescription,
            url: `${pageUrl}#${s.slug}`,
            provider: { "@type": "GeneralContractor", name: business.name, "@id": `${siteUrl}#business` },
            areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services & Costs", item: pageUrl },
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
      <main className="bg-[#efece7]">

        {/* Hero — the price answer sits in the first paragraph on purpose */}
        <section className="pt-32 pb-14 md:pt-40 md:pb-16">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
            <Eyebrow>Bathrooms only &middot; {business.city}, {business.region}</Eyebrow>

            <h1
              className="text-[11vw] min-[430px]:text-[52px] md:text-[68px] font-black uppercase leading-[0.94] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What We Build,<br />And What It Costs
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
              Nobody else in Calgary publishes this, which is exactly why we do. We
              renovate bathrooms and nothing else, and Anatolii is on site himself on every
              job. Everything below is on this one page — the bands, what moves them, what
              each job includes, and the questions people actually ask.
            </p>

            {/* Jump links */}
            <nav aria-label="On this page" className="flex flex-wrap gap-2 pt-2">
              {[
                { label: "Prices", href: "#prices" },
                ...services.map((s) => ({ label: s.name, href: `#${s.slug}` })),
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-[#c4c0b8] bg-[#faf9f5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4a4840] transition-colors duration-200 hover:border-[#8a8a5c] hover:text-[#1c1a18]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Price bands */}
        <section id="prices" className="pb-16 md:pb-20 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The three price bands
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              {priceBands.map((b) => (
                <div
                  key={b.name}
                  className={`flex flex-col gap-4 rounded-xl p-6 border ${
                    b.featured ? "bg-[#1c1a17] border-[#1c1a17]" : "bg-[#faf9f5] border-[#c4c0b8]"
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
                  <a
                    href={`#${b.anchor}`}
                    className={`group inline-flex items-center gap-2 text-sm font-medium pt-2 transition-colors ${
                      b.featured ? "text-[#c4a962] hover:text-[#d4ba74]" : "text-[#4a4840] hover:text-[#1c1a18]"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    See what&rsquo;s included <Arrow />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost drivers */}
        <section className="bg-[#faf9f5] py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Where the money goes</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Seven things that move the price
            </h2>
            <div className="flex flex-col divide-y divide-[#c4c0b8] max-w-3xl">
              {costDrivers.map((d) => (
                <div key={d.factor} className="py-6 flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-lg font-bold text-[#1c1a18]" style={{ fontFamily: "var(--font-heading)" }}>
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

        {/* One block per service */}
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className={`py-16 md:py-20 scroll-mt-28 ${i % 2 === 1 ? "bg-[#faf9f5]" : ""}`}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Eyebrow>{s.priceRange} &middot; {s.timeline}</Eyebrow>
                <h2
                  className="text-3xl md:text-5xl font-black uppercase leading-[0.98] text-[#1c1a18]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.h1}
                </h2>
                <p
                  className="text-base md:text-lg text-[#4a4840] leading-relaxed max-w-3xl"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {s.intro}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={s.hero.src}
                    alt={s.hero.alt}
                    fill
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a6460]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Included as standard
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check />
                        <span className="text-sm text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {s.gallery.map((photo) => (
                  <div key={photo.src} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 300px, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Why we cost less */}
        <section className="py-16 md:py-20">
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

        {/* FAQ */}
        <section id="faq" className="bg-[#faf9f5] py-16 md:py-20 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Straight answers</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Questions we get asked
            </h2>
            <div className="flex flex-col divide-y divide-[#c4c0b8] max-w-3xl">
              {allFaqs.map((f) => (
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
              one written price, a start date and a finish date, with no obligation to go
              ahead.
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
